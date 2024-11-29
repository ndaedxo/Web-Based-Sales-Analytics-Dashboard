import { useState } from 'react';
import type { SalesData } from '../types/sales';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps {
  data: SalesData[];
}

export function DataTable({ data }: DataTableProps) {
  const [sortField, setSortField] = useState<keyof SalesData>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof SalesData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {(['date', 'revenue', 'unitsSold'] as const).map((field) => (
              <th
                key={field}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(field)}
              >
                <div className="flex items-center gap-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">${row.revenue.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.unitsSold.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}