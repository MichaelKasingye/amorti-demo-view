
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { teamsApi } from '@/services/teamsApi';
import { InviteTeamMemberData } from '@/types/teams';
import { useToast } from '@/hooks/use-toast';

export function useTeamMembers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ['team-members', params],
    queryFn: () => teamsApi.getTeamMembers(params),
  });
}

export function useTeamMember(id: string) {
  return useQuery({
    queryKey: ['team-member', id],
    queryFn: () => teamsApi.getTeamMemberById(id),
    enabled: !!id,
  });
}

export function useInviteTeamMember() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberData: InviteTeamMemberData) => teamsApi.inviteTeamMember(memberData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
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

export function useUpdateTeamMemberRole() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => 
      teamsApi.updateTeamMemberRole(id, role),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
      queryClient.invalidateQueries({ queryKey: ['team-member', id] });
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

export function useRemoveTeamMember() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamsApi.removeTeamMember(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
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

export function useGenerateInviteLink() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (maxUsage?: number) => teamsApi.generateInviteLink(maxUsage),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['invite-links'] });
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

export function useInviteLinks() {
  return useQuery({
    queryKey: ['invite-links'],
    queryFn: () => teamsApi.getInviteLinks(),
  });
}

export function useDeleteInviteLink() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamsApi.deleteInviteLink(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['invite-links'] });
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
