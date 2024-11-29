import { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, Target, TrendingUp, Award } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';

const teamMetrics = [
  { label: 'Total Sales Reps', value: '48', change: 4.2 },
  { label: 'Quota Attainment', value: '94%', change: 2.8 },
  { label: 'Avg. Deal Size', value: '$15,234', change: 12.3 },
  { label: 'Win Rate', value: '68%', change: 5.6 },
];

const performanceData = [
  { name: 'John Smith', deals: 45, revenue: 890000, quota: 95 },
  { name: 'Sarah Johnson', deals: 42, revenue: 780000, quota: 92 },
  { name: 'Michael Brown', deals: 38, revenue: 720000, quota: 88 },
  { name: 'Emily Davis', deals: 36, revenue: 680000, quota: 85 },
  { name: 'David Wilson', deals: 35, revenue: 650000, quota: 84 },
];

export function SalesTeam() {
  const [timeRange, setTimeRange] = useState('monthly');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sales Team Performance</h1>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            metric={{
              label: metric.label,
              value: metric.value,
              change: metric.change,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue by Rep</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quota Attainment</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quota" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Sales Representative Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deals Closed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quota Attainment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg. Deal Size</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceData.map((rep) => (
                <tr key={rep.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rep.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rep.deals}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${rep.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rep.quota}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(rep.revenue / rep.deals).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}