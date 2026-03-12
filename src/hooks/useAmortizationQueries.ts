
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { amortizationApi, AmortizationCalculationRequest } from '@/services/amortizationApi';
import { useToast } from '@/hooks/use-toast';

export function useCalculateAmortization() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (request: AmortizationCalculationRequest) => amortizationApi.calculateAmortization(request),
    onError: (error: Error) => {
      toast({
        title: "Calculation Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSaveCalculation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, result }: { request: AmortizationCalculationRequest; result: any }) => 
      amortizationApi.saveCalculation(request, result),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['amortization-calculations'] });
      queryClient.invalidateQueries({ queryKey: ['amortization-stats'] });
      toast({
        title: "Success",
        description: response.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useAmortizationCalculations(params?: {
  page?: number;
  limit?: number;
  clientName?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: ['amortization-calculations', params],
    queryFn: () => amortizationApi.getCalculations(params),
  });
}

export function useAmortizationCalculation(id: string) {
  return useQuery({
    queryKey: ['amortization-calculation', id],
    queryFn: () => amortizationApi.getCalculationById(id),
    enabled: !!id,
  });
}

export function useDeleteAmortizationCalculation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => amortizationApi.deleteCalculation(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['amortization-calculations'] });
      queryClient.invalidateQueries({ queryKey: ['amortization-stats'] });
      toast({
        title: "Success",
        description: response.message,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useAmortizationStats() {
  return useQuery({
    queryKey: ['amortization-stats'],
    queryFn: () => amortizationApi.getCalculationStats(),
  });
}
