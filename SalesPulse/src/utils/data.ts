import { subDays, format } from 'date-fns';
import type { SalesData, KeyMetric } from '../types/sales';

export function generateSalesData(days: number): SalesData[] {
  return Array.from({ length: days }).map((_, index) => {
    const date = subDays(new Date(), days - 1 - index);
    return {
      date: format(date, 'yyyy-MM-dd'),
      revenue: Math.floor(Math.random() * 10000) + 5000,
      unitsSold: Math.floor(Math.random() * 1000) + 100,
    };
  });
}

export function filterDataByTimeRange(data: SalesData[], range: string): SalesData[] {
  const daysMap = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };
  const days = daysMap[range as keyof typeof daysMap] || 30;
  return data.slice(-days);
}

export function calculateGrowthRate(current: number, previous: number): number {
  return previous !== 0 ? ((current - previous) / previous) * 100 : 0;
}

export function aggregateData(data: SalesData[]): { totalRevenue: number; totalUnitsSold: number } {
  return data.reduce((acc, curr) => ({
    totalRevenue: acc.totalRevenue + curr.revenue,
    totalUnitsSold: acc.totalUnitsSold + curr.unitsSold,
  }), { totalRevenue: 0, totalUnitsSold: 0 });
}