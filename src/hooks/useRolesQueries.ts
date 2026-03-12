
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { rolesApi } from '@/services/rolesApi';
import { RoleFormData } from '@/types/roles';
import { useToast } from '@/hooks/use-toast';

export function useRoles(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => rolesApi.getRoles(params),
  });
}

export function useRole(id: string) {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => rolesApi.getRoleById(id),
    enabled: !!id,
  });
}

export function useCreateRole() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleData: RoleFormData) => rolesApi.createRole(roleData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
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

export function useUpdateRole() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, roleData }: { id: string; roleData: Partial<RoleFormData> }) => 
      rolesApi.updateRole(id, roleData),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', id] });
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

export function useDeleteRole() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rolesApi.deleteRole(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
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

export function useAvailablePermissions() {
  return useQuery({
    queryKey: ['available-permissions'],
    queryFn: () => rolesApi.getAvailablePermissions(),
  });
}

export function useUserRolePermissions(userId: string) {
  return useQuery({
    queryKey: ['user-role-permissions', userId],
    queryFn: () => rolesApi.getUserRolePermissions(userId),
    enabled: !!userId,
  });
}
