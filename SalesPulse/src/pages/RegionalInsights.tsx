import { useState } from 'react';
import { MetricCard } from '../components/MetricCard';
import type { KeyMetric } from '../types/sales';

const mockRegionalData: { [key: string]: KeyMetric[] } = {
  'North America': [
    { label: 'Revenue', value: '$1.2M', change: 12.5 },
    { label: 'Orders', value: '15,234', change: 8.3 },
    { label: 'Avg. Order Value', value: '$78.54', change: 3.8 },
  ],
  'Europe': [
    { label: 'Revenue', value: '$980K', change: 15.2 },
    { label: 'Orders', value: '12,456', change: 10.1 },
    { label: 'Avg. Order Value', value: '$82.31', change: 4.5 },
  ],
  'Asia Pacific': [
    { label: 'Revenue', value: '$750K', change: 18.7 },
    { label: 'Orders', value: '9,876', change: 14.2 },
    { label: 'Avg. Order Value', value: '$75.94', change: 3.9 },
  ],
};

export function RegionalInsights() {
  const [selectedRegion, setSelectedRegion] = useState('North America');

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Regional Insights</h1>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {Object.keys(mockRegionalData).map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {mockRegionalData[selectedRegion].map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Placeholder for future map visualization */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Regional Sales Map</h2>
        <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Interactive map visualization coming soon</p>
        </div>
      </div>
    </div>
  );
}