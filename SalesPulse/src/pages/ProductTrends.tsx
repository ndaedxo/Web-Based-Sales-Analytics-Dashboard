import { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Package, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';

const productMetrics = [
  { label: 'Total Products', value: '1,234', change: 5.2 },
  { label: 'Top Performer', value: 'Product X', change: 25.8 },
  { label: 'Avg. Price', value: '$89.99', change: 3.4 },
  { label: 'Stock Level', value: '95%', change: 2.1 },
];

const categoryData = [
  { name: 'Electronics', value: 35, revenue: 850000 },
  { name: 'Clothing', value: 25, revenue: 620000 },
  { name: 'Home & Garden', value: 20, revenue: 450000 },
  { name: 'Sports', value: 15, revenue: 380000 },
  { name: 'Books', value: 5, revenue: 120000 },
];

const COLORS = ['#4F46E5', '#059669', '#EA580C', '#DC2626', '#7C3AED'];

export function ProductTrends() {
  const [timeRange, setTimeRange] = useState('monthly');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Trends</h1>
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
        {productMetrics.map((metric, index) => (
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
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue by Category</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Top Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'Premium Laptop', category: 'Electronics', sales: 1234, revenue: 1234567, growth: 23.4 },
                { name: 'Wireless Earbuds', category: 'Electronics', sales: 2345, revenue: 234567, growth: 15.7 },
                { name: 'Smart Watch', category: 'Electronics', sales: 3456, revenue: 345678, growth: 12.3 },
                { name: 'Running Shoes', category: 'Sports', sales: 4567, revenue: 456789, growth: 8.9 },
                { name: 'Yoga Mat', category: 'Sports', sales: 5678, revenue: 567890, growth: 5.6 },
              ].map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+{product.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}