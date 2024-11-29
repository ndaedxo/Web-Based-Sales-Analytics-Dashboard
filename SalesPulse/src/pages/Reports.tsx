import { useState } from 'react';
import { FileText, Download, Filter } from 'lucide-react';

const availableReports = [
  {
    id: 1,
    name: 'Sales Performance Report',
    description: 'Detailed analysis of sales performance across all channels',
    category: 'Sales',
    lastGenerated: '2024-02-15',
    format: 'PDF',
  },
  {
    id: 2,
    name: 'Customer Segmentation Analysis',
    description: 'Breakdown of customer segments and their buying patterns',
    category: 'Customer',
    lastGenerated: '2024-02-14',
    format: 'Excel',
  },
  {
    id: 3,
    name: 'Product Performance Report',
    description: 'Analysis of product sales and inventory metrics',
    category: 'Product',
    lastGenerated: '2024-02-13',
    format: 'PDF',
  },
  {
    id: 4,
    name: 'Regional Sales Breakdown',
    description: 'Geographic distribution of sales and performance',
    category: 'Sales',
    lastGenerated: '2024-02-12',
    format: 'Excel',
  },
  {
    id: 5,
    name: 'Sales Team Performance',
    description: 'Individual and team performance metrics',
    category: 'Team',
    lastGenerated: '2024-02-11',
    format: 'PDF',
  },
];

export function Reports() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Sales', 'Customer', 'Product', 'Team'];

  const filteredReports = selectedCategory === 'All'
    ? availableReports
    : availableReports.filter(report => report.category === selectedCategory);

  const handleDownload = (reportId: number) => {
    // Simulate download - in real app would trigger actual report generation
    console.log(`Downloading report ${reportId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {report.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        Last generated: {report.lastGenerated}
                      </span>
                      <span className="text-sm text-gray-500">
                        Format: {report.format}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(report.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}