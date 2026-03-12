
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiService, LoginRequest, SignUpRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useLogin() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => apiService.login(credentials),
    onSuccess: (response) => {
      login(response.data.user, response.data.token);
      toast({
        title: "Success",
        description: response.message,
      });
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSignUp() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: SignUpRequest) => apiService.signUp(userData),
    onSuccess: (response) => {
      login(response.data.user, response.data.token);
      toast({
        title: "Success!",
        description: response.message,
      });
      navigate('/organizations/create');
    },
    onError: (error: Error) => {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useForgotPassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => apiService.forgotPassword(data),
    onSuccess: (response) => {
      toast({
        title: "Email Sent",
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

export function useResetPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => apiService.resetPassword(data),
    onSuccess: (response) => {
      toast({
        title: "Success",
        description: response.message,
      });
      navigate('/login');
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

export function useLogout() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => apiService.logout(),
    onSuccess: (response) => {
      logout();
      toast({
        title: "Success",
        description: response.message,
      });
      navigate('/');
    },
    onError: (error: Error) => {
      // Even if logout fails on server, clear local session
      logout();
      navigate('/');
    },
  });
}

export function useCurrentUser() {
  const { state } = useAuth();
  
  return useQuery({
    queryKey: ['currentUser', state.token],
    queryFn: () => apiService.getCurrentUser(state.token!),
    enabled: !!state.token && state.isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}
