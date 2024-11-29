import { TrendingUp, TrendingDown } from 'lucide-react';
import type { KeyMetric } from '../types/sales';

interface MetricCardProps {
  metric: KeyMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const isPositive = metric.change >= 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
        <span className={`ml-2 flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span className="ml-1">{Math.abs(metric.change).toFixed(1)}%</span>
        </span>
      </div>
    </div>
  );
}