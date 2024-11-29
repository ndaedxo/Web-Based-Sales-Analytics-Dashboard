import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserPlus, UserMinus, DollarSign } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';

const customerMetrics = [
  { label: 'Total Customers', value: '24,563', change: 12.3, icon: Users },
  { label: 'New Customers', value: '1,245', change: 8.7, icon: UserPlus },
  { label: 'Churn Rate', value: '2.4%', change: -1.2, icon: UserMinus },
  { label: 'Avg. Customer LTV', value: '$856', change: 15.8, icon: DollarSign },
];

const segmentData = [
  { name: 'Enterprise', customers: 450, revenue: 2500000, satisfaction: 4.5 },
  { name: 'Mid-Market', customers: 1200, revenue: 1800000, satisfaction: 4.3 },
  { name: 'Small Business', customers: 8500, revenue: 2100000, satisfaction: 4.1 },
  { name: 'Startup', customers: 14413, revenue: 1200000, satisfaction: 3.9 },
];

export function CustomerAnalysis() {
  const [timeRange, setTimeRange] = useState('monthly');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customer Analysis</h1>
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
        {customerMetrics.map((metric, index) => (
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
          <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Segments</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="customers" fill="#4F46E5" name="Customers" />
                <Bar yAxisId="right" dataKey="satisfaction" fill="#059669" name="Satisfaction" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue by Segment</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#EA580C" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Customer Segments Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Segment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {segmentData.map((segment) => (
                <tr key={segment.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{segment.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{segment.customers.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${segment.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{segment.satisfaction}/5.0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}