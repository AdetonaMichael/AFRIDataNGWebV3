import { useAuth } from './useAuth';
import { useAuthStore } from '@/store/auth.store';

/**
 * Hook for checking user roles and permissions
 * Provides utilities for role-based access control
 */
export const useAuthRole = () => {
  const { user } = useAuth();
  const { activeRole } = useAuthStore();

  return {
    /**
     * Check if user has a specific role
     */
    hasRole: (role: string): boolean => {
      return user?.roles?.includes(role) ?? false;
    },

    /**
     * Check if user has any of the provided roles
     */
    hasAnyRole: (roles: string[]): boolean => {
      return user?.roles?.some((r) => roles.includes(r)) ?? false;
    },

    /**
     * Check if user has all of the provided roles
     */
    hasAllRoles: (roles: string[]): boolean => {
      return roles.every((r) => user?.roles?.includes(r)) ?? false;
    },

    /**
     * Check if user has a specific permission
     */
    hasPermission: (permission: string): boolean => {
      return user?.permissions?.includes(permission) ?? false;
    },

    /**
     * Check if user has any of the provided permissions
     */
    hasAnyPermission: (permissions: string[]): boolean => {
      return user?.permissions?.some((p) => permissions.includes(p)) ?? false;
    },

    /**
     * Get the current active role
     */
    getCurrentRole: (): string | null => {
      return activeRole || user?.roles?.[0] || null;
    },

    /**
     * Check if the active role matches a specific role
     */
    isCurrentRole: (role: string): boolean => {
      return (activeRole || user?.roles?.[0]) === role;
    },

    /**
     * Get all user roles
     */
    getRoles: (): string[] => {
      return user?.roles ?? [];
    },

    /**
     * Get all user permissions
     */
    getPermissions: (): string[] => {
      return user?.permissions ?? [];
    },

    /**
     * Check if user is admin
     */
    isAdmin: (): boolean => {
      return user?.roles?.includes('admin') ?? false;
    },

    /**
     * Check if user is agent
     */
    isAgent: (): boolean => {
      return user?.roles?.includes('agent') ?? false;
    },

    /**
     * Check if user is customer
     */
    isCustomer: (): boolean => {
      return !user?.roles || user.roles.length === 0 || user.roles.includes('user');
    },

    /**
     * Check if user can switch roles (has multiple roles)
     */
    canSwitchRoles: (): boolean => {
      return (user?.roles?.length ?? 0) > 1;
    },
  };
};
