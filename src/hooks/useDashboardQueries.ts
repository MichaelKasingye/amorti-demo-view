
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/services/dashboardApi';

export function useDashboardStats(params?: {
  period?: 'week' | 'month' | 'quarter' | 'year';
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: ['dashboard-stats', params],
    queryFn: () => dashboardApi.getDashboardStats(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

export function useDashboardChartData(params?: {
  period?: 'week' | 'month' | 'quarter' | 'year';
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: ['dashboard-chart-data', params],
    queryFn: () => dashboardApi.getDashboardChartData(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

export function useRecentActivity(params?: {
  limit?: number;
  type?: 'contact' | 'deal' | 'meeting' | 'task';
}) {
  return useQuery({
    queryKey: ['recent-activity', params],
    queryFn: () => dashboardApi.getRecentActivity(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });
}

export function useDealsByStage() {
  return useQuery({
    queryKey: ['deals-by-stage'],
    queryFn: () => dashboardApi.getDealsByStage(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}
