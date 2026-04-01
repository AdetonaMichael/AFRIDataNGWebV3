'use client';

import { useCallback } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { authService } from '@/services/auth.service';
import { LoginSchema, RegisterSchema, VerifyEmailSchema } from '@/utils/validation.utils';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, error, setUser, setAuthToken, setIsLoading, setError, logout: logoutStore } = useAuthStore();
  const { addToast } = useUIStore();

  const login = useCallback(
    async (data: LoginSchema) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.login(data);

        if (response.success && response.data) {
          setUser(response.data.user);
          setAuthToken(response.data.token);
          addToast({ type: 'success', message: 'Login successful!' });

          // Redirect based on role
          const userRole = response.data.user.roles?.[0];
          if (userRole === 'admin') {
            router.push('/admin');
          } else if (userRole === 'agent') {
            router.push('/agent');
          } else {
            router.push('/dashboard');
          }
        } else {
          setError(response.message || 'Login failed');
          addToast({ type: 'error', message: response.message || 'Login failed' });
        }
      } catch (err: any) {
        const message = err.message || 'An error occurred during login';
        setError(message);
        addToast({ type: 'error', message });
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setAuthToken, setIsLoading, setError, addToast, router]
  );

  const register = useCallback(
    async (data: RegisterSchema) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.register(data);

        if (response.success) {
          addToast({
            type: 'success',
            message: 'Registration successful! Please verify your email.',
          });
          router.push('/auth/verify-email?email=' + encodeURIComponent(data.email));
        } else {
          setError(response.message || 'Registration failed');
          addToast({ type: 'error', message: response.message || 'Registration failed' });
        }
      } catch (err: any) {
        const message = err.message || 'An error occurred during registration';
        setError(message);
        addToast({ type: 'error', message });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, addToast, router]
  );

  const verifyEmail = useCallback(
    async (data: VerifyEmailSchema) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.verifyEmail(data);

        if (response.success) {
          addToast({ type: 'success', message: 'Email verified successfully!' });
          router.push('/auth/login');
        } else {
          setError(response.message || 'Verification failed');
          addToast({ type: 'error', message: response.message || 'Verification failed' });
        }
      } catch (err: any) {
        const message = err.message || 'An error occurred during verification';
        setError(message);
        addToast({ type: 'error', message });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, addToast, router]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      logoutStore();
      addToast({ type: 'success', message: 'Logged out successfully' });
      router.push('/');
    } catch (err: any) {
      addToast({ type: 'error', message: 'Logout failed' });
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, logoutStore, addToast, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    verifyEmail,
    logout,
  };
};
