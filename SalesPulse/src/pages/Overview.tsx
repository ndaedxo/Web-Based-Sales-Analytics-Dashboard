import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { SalesChart } from '../components/SalesChart';
import { DataTable } from '../components/DataTable';
import { generateSalesData, filterDataByTimeRange, aggregateData, calculateGrowthRate } from '../utils/data';
import type { SalesData, KeyMetric } from '../types/sales';

export function Overview() {
  const [timeRange, setTimeRange] = useState<string>('monthly');
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const [metrics, setMetrics] = useState<KeyMetric[]>([]);

  useEffect(() => {
    const data = generateSalesData(365);
    setSalesData(data);
  }, []);

  useEffect(() => {
    if (salesData.length === 0) return;

    const filtered = filterDataByTimeRange(salesData, timeRange);
    setFilteredData(filtered);

    const { totalRevenue, totalUnitsSold } = aggregateData(filtered);
    const prevPeriod = filterDataByTimeRange(salesData, 'monthly');
    const { totalRevenue: prevRevenue, totalUnitsSold: prevUnitsSold } = aggregateData(prevPeriod);

    setMetrics([
      {
        label: 'Total Revenue',
        value: `$${totalRevenue.toLocaleString()}`,
        change: calculateGrowthRate(totalRevenue, prevRevenue),
      },
      {
        label: 'Units Sold',
        value: totalUnitsSold.toLocaleString(),
        change: calculateGrowthRate(totalUnitsSold, prevUnitsSold),
      },
      {
        label: 'Average Order Value',
        value: `$${(totalRevenue / totalUnitsSold).toFixed(2)}`,
        change: calculateGrowthRate(totalRevenue / totalUnitsSold, prevRevenue / prevUnitsSold),
      },
    ]);
  }, [timeRange, salesData]);

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Date,Revenue,Units Sold\n"
      + filteredData.map(row => `${row.date},${row.revenue},${row.unitsSold}`).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "sales_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Performance Overview</h1>
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={exportData}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SalesChart
          data={filteredData}
          dataKey="revenue"
          color="#4F46E5"
          title="Revenue Over Time"
        />
        <SalesChart
          data={filteredData}
          dataKey="unitsSold"
          color="#059669"
          title="Units Sold Over Time"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Detailed Sales Data</h2>
        </div>
        <DataTable data={filteredData} />
      </div>
    </div>
  );
}