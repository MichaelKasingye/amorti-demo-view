
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '@/services/contactsApi';
import { ContactData } from '@/components/contacts/types';
import { useToast } from '@/hooks/use-toast';

export function useContacts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  company?: string;
  status?: string;
  leadSource?: string;
}) {
  return useQuery({
    queryKey: ['contacts', params],
    queryFn: () => contactsApi.getContacts(params),
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => contactsApi.getContactById(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactData: ContactData) => contactsApi.createContact(contactData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
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

export function useUpdateContact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, contactData }: { id: string; contactData: Partial<ContactData> }) => 
      contactsApi.updateContact(id, contactData),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', id] });
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

export function useDeleteContact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactsApi.deleteContact(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
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
