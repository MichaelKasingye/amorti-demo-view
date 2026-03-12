
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dealsApi, CreateDealRequest } from '@/services/dealsApi';
import { Deal, DealNote } from '@/types/deals';
import { useToast } from '@/hooks/use-toast';

export function useDeals(params?: {
  page?: number;
  limit?: number;
  search?: string;
  stage?: string;
  contactId?: string;
  productId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: ['deals', params],
    queryFn: () => dealsApi.getDeals(params),
  });
}

export function useDeal(id: string) {
  return useQuery({
    queryKey: ['deal', id],
    queryFn: () => dealsApi.getDealById(id),
    enabled: !!id,
  });
}

export function useCreateDeal() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dealData: CreateDealRequest) => dealsApi.createDeal(dealData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
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

export function useUpdateDeal() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dealData }: { id: string; dealData: Partial<Deal> }) => 
      dealsApi.updateDeal(id, dealData),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      queryClient.invalidateQueries({ queryKey: ['deal', id] });
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

export function useUpdateDealStage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: Deal['stage'] }) => 
      dealsApi.updateDealStage(id, stage),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      queryClient.invalidateQueries({ queryKey: ['deal', id] });
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

export function useAddDealNote() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dealId, note }: { dealId: string; note: Omit<DealNote, 'id' | 'createdAt'> }) => 
      dealsApi.addNoteToDeal(dealId, note),
    onSuccess: (response, { dealId }) => {
      queryClient.invalidateQueries({ queryKey: ['deal', dealId] });
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

export function useDeleteDeal() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dealsApi.deleteDeal(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
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
