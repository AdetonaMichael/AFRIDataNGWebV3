import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthResponse } from '@/types/api.types';

interface PINStatus {
  has_pin: boolean;
  is_locked: boolean;
  failed_attempts?: number;
  remaining_seconds?: number;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  pinStatus: PINStatus | null;
  activeRole: string | null;
  
  setUser: (user: User | null) => void;
  setAuthToken: (token: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPinStatus: (status: PINStatus | null) => void;
  setActiveRole: (role: string) => void;
  logout: () => void;
  reset: () => void;
}

const storage = typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      pinStatus: null,
      activeRole: null,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          error: null,
          // Set activeRole to first role when user logs in
          activeRole: user?.roles?.[0] || null,
        });
      },

      setAuthToken: (token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
      },

      setIsLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setPinStatus: (status) => set({ pinStatus: status }),

      setActiveRole: (role) => set({ activeRole: role }),

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          // Clear all auth-related localStorage keys
          localStorage.removeItem('auth-store');
        }
        set({
          user: null,
          isAuthenticated: false,
          error: null,
          pinStatus: null,
          activeRole: null,
        });
      },

      reset: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          pinStatus: null,
          activeRole: null,
        });
      },
    }),
    {
      name: 'auth-store',
      storage: storage,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pinStatus: state.pinStatus,
        activeRole: state.activeRole,
      }),
    }
  )
);
