import { safeGetItem, safeRemoveItem } from './safe-storage.utils';

/**
 * Token validation utilities for detecting missing/expired tokens
 */

/**
 * Determine if a token string appears to be a valid JWT format
 */
export const isValidJWTFormat = (tokenValue: string): boolean => {
  if (!tokenValue || typeof tokenValue !== 'string') return false;
  
  try {
    const parts = tokenValue.split('.');
    if (parts.length !== 3) {
      console.warn('[TokenUtils] Token does not have 3 parts (invalid JWT format)');
      return false;
    }
    
    // Try to decode payload to verify it's valid base64
    const payload = JSON.parse(atob(parts[1]));
    return !!payload;
  } catch (error) {
    console.warn('[TokenUtils] Token is not a valid JWT:', error);
    return false;
  }
};

/**
 * Check if a token string looks like a reference token (short, non-JWT)
 */
export const isReferenceToken = (tokenValue: string): boolean => {
  if (!tokenValue || typeof tokenValue !== 'string') return false;
  
  // If it has 3 parts separated by dots, it's likely a JWT
  if (tokenValue.includes('.') && tokenValue.split('.').length === 3) {
    return false;
  }
  
  // Reference tokens are typically 32-64 characters (UUIDs, session IDs, etc.)
  if (tokenValue.length < 100) {
    console.warn('[TokenUtils] Token appears to be a reference token (not a JWT):', {
      length: tokenValue.length,
      value: tokenValue,
    });
    return true;
  }
  
  return false;
};

/**
 * Check if a valid token exists in storage
 */
export const hasValidToken = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const token = safeGetItem('token');
    return !!token && token.length > 0 && token !== 'undefined' && token !== 'null';
  } catch (error) {
    console.warn('[TokenUtils] Error checking token:', error);
    return false;
  }
};

/**
 * Get the stored token
 */
export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = safeGetItem('token');
    if (!token || token === 'undefined' || token === 'null') {
      return null;
    }
    return token;
  } catch (error) {
    console.warn('[TokenUtils] Error retrieving token:', error);
    return null;
  }
};

/**
 * Clear all auth-related tokens and data
 */
export const clearAuthTokens = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const tokensToRemove = ['token', 'refreshToken', 'auth-store', 'user'];
    tokensToRemove.forEach((key) => {
      try {
        safeRemoveItem(key);
      } catch (error) {
        console.warn(`[TokenUtils] Failed to remove ${key}:`, error);
      }
    });
    
    // Also clear sessionStorage
    try {
      sessionStorage.clear();
    } catch (error) {
      console.warn('[TokenUtils] Failed to clear sessionStorage:', error);
    }
    
    console.log('[TokenUtils] All auth tokens cleared');
  } catch (error) {
    console.error('[TokenUtils] Error clearing auth tokens:', error);
  }
};

/**
 * Detect if token is likely expired or invalid
 * This is a client-side check based on token format
 */
export const isTokenLikelyExpired = (): boolean => {
  const token = getStoredToken();
  if (!token) return true;
  
  try {
    // First check if it's a valid JWT format
    if (!isValidJWTFormat(token)) {
      // If it's a reference token (not a JWT), we can't validate expiration client-side
      // Return false to allow the API to validate it on first request
      if (isReferenceToken(token)) {
        console.log('[TokenUtils] Reference token stored - unable to validate expiration client-side, will validate on API request');
        return false;
      }
      return true;
    }
    
    // Valid JWT - now check expiration
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token has expiration time
    if (payload.exp) {
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      
      if (currentTime >= expirationTime) {
        console.warn('[TokenUtils] Token is expired based on exp claim');
        return true;
      }
      
      // Warn if token expires within 5 minutes
      const fiveMinutesFromNow = currentTime + 5 * 60 * 1000;
      if (expirationTime <= fiveMinutesFromNow) {
        console.warn('[TokenUtils] Token expires within 5 minutes');
      }
    }
    
    return false;
  } catch (error) {
    console.warn('[TokenUtils] Error validating token format:', error);
    // If we can't validate, assume token is still valid
    return false;
  }
};

/**
 * Get time until token expires (in milliseconds)
 * Returns negative number if already expired
 */
export const getTokenExpirationTime = (): number | null => {
  const token = getStoredToken();
  if (!token) return null;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return null;
    
    const expirationTime = payload.exp * 1000;
    const timeRemaining = expirationTime - Date.now();
    
    return timeRemaining;
  } catch (error) {
    console.warn('[TokenUtils] Error getting token expiration time:', error);
    return null;
  }
};

/**
 * Format token expiration time for display
 */
export const formatTokenExpiration = (): string => {
  const timeRemaining = getTokenExpirationTime();
  
  if (timeRemaining === null) {
    return 'Unknown';
  }
  
  if (timeRemaining < 0) {
    return 'Expired';
  }
  
  const minutes = Math.floor(timeRemaining / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else {
    return `${minutes}m`;
  }
};
