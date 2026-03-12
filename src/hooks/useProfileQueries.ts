import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileApi, ChangePasswordRequest } from '@/services/profileApi';
import { ProfileFormData } from '@/types/profile';
import { useToast } from '@/hooks/use-toast';

export function useCurrentProfile() {
  return useQuery({
    queryKey: ['current-profile'],
    queryFn: () => profileApi.getCurrentProfile(),
  });
}

export function useUpdateProfile() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: ProfileFormData) => profileApi.updateProfile(profileData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['current-profile'] });
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

export function useUploadAvatar() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => profileApi.uploadAvatar(file),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['current-profile'] });
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

export function useChangePassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (request: ChangePasswordRequest) => profileApi.changePassword(request),
    onSuccess: (response) => {
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

export function useSecuritySettings() {
  return useQuery({
    queryKey: ['security-settings'],
    queryFn: () => profileApi.getSecuritySettings(),
  });
}

export function useUpdateSecuritySettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: any) => profileApi.updateSecuritySettings(settings),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] });
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

export function useEnableTwoFactor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileApi.enableTwoFactor(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] });
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

export function useDisableTwoFactor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileApi.disableTwoFactor(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] });
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

export function useNotificationSettings() {
  return useQuery({
    queryKey: ['notification-settings'],
    queryFn: () => profileApi.getNotificationSettings(),
  });
}

export function useUpdateNotificationSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: any) => profileApi.updateNotificationSettings(settings),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['notification-settings'] });
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

export function useActivityLog(params?: {
  page?: number;
  limit?: number;
  action?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: ['activity-log', params],
    queryFn: () => profileApi.getActivityLog(params),
  });
}

export function useDeleteAccount() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => profileApi.deleteAccount(),
    onSuccess: (response) => {
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

export function useExportData() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => profileApi.exportData(),
    onSuccess: (response) => {
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
