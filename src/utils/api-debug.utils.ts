/**
 * API Response Debugging Utilities
 * Use these in the browser console to diagnose API issues
 */

import { apiClient } from '@/services/api-client';
import { LoginRequest } from '@/types/api.types';

/**
 * Log the complete response from a login attempt (without storing anything)
 * Usage in browser console: await debugLoginResponse({ email: 'test@example.com', password: 'password' })
 */
export async function debugLoginResponse(credentials: LoginRequest) {
  try {
    console.group('[API Debug] Testing login endpoint');
    console.log('Credentials:', credentials);
    
    const response = await (apiClient as any).axiosInstance.post('/auth/login', credentials);
    
    console.group('Raw Axios Response');
    console.log('Full response:', response);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response data:', response.data);
    console.groupEnd();
    
    console.group('Response Data Structure');
    console.log('response.data:', response.data);
    console.log('response.data.data:', response.data?.data);
    console.log('response.data.token:', response.data?.token);
    console.log('response.data.accessToken:', response.data?.accessToken);
    console.log('response.data.user:', response.data?.user);
    console.groupEnd();
    
    console.group('Token Analysis');
    const token = response.data?.token;
    const accessToken = response.data?.accessToken;
    console.log('Token value:', token);
    console.log('Token type:', typeof token);
    console.log('Token length:', token?.length);
    console.log('Token parts (if JWT):', token?.split('.')?.length || 'N/A');
    console.log('Access Token value:', accessToken);
    console.log('Access Token type:', typeof accessToken);
    console.log('Access Token length:', accessToken?.length);
    console.log('Access Token parts (if JWT):', accessToken?.split('.')?.length || 'N/A');
    console.groupEnd();
    
    console.group('Nested Data Check');
    // Check if token is nested deeper
    console.log('response.data.data?.token:', response.data?.data?.token);
    console.log('response.token:', response.token);
    // Log all top-level keys in response.data
    console.log('All keys in response.data:', Object.keys(response.data || {}));
    if (response.data?.data) {
      console.log('All keys in response.data.data:', Object.keys(response.data.data || {}));
    }
    console.groupEnd();
    
    console.groupEnd();
    
    return response.data;
  } catch (error: any) {
    console.error('[API Debug] Login error:', error);
    console.error('[API Debug] Error response:', error.response?.data);
    throw error;
  }
}

/**
 * Compare stored token in localStorage vs what should be valid
 */
export function debugTokenStorage() {
  console.group('[Token Debug] Token Storage Analysis');
  
  const token = localStorage.getItem('token');
  const authStore = localStorage.getItem('auth-store');
  
  console.log('Stored token (localStorage):', {
    value: token,
    length: token?.length || 0,
    type: typeof token,
    parts: token?.split('.')?.length || 0,
  });
  
  console.log('Auth store (localStorage):', authStore);
  
  try {
    const parsedAuth = authStore ? JSON.parse(authStore) : null;
    console.log('Parsed auth store:', parsedAuth);
  } catch (e) {
    console.error('Error parsing auth store:', e);
  }
  
  console.groupEnd();
}

/**
 * Validate if a token looks like a valid JWT
 */
export function validateToken(tokenValue: string): boolean {
  console.group('[Token Validation]');
  
  const parts = tokenValue.split('.');
  console.log('Token value:', tokenValue);
  console.log('Token length:', tokenValue.length);
  console.log('Token parts:', parts.length);
  
  if (parts.length !== 3) {
    console.error('❌ Invalid JWT format - expected 3 parts, got', parts.length);
    console.groupEnd();
    return false;
  }
  
  try {
    // Try to decode payload (middle part)
    const payload = JSON.parse(atob(parts[1]));
    console.log('Decoded payload:', payload);
    console.log('Token exp:', new Date(payload.exp * 1000));
    console.log('Current time:', new Date());
    
    const isExpired = payload.exp * 1000 < Date.now();
    console.log('Is expired?:', isExpired);
    
    if (!isExpired) {
      console.log('✓ Token appears valid');
    } else {
      console.error('❌ Token is expired');
    }
    
    console.groupEnd();
    return !isExpired;
  } catch (e) {
    console.error('❌ Error decoding token:', e);
    console.groupEnd();
    return false;
  }
}

/**
 * Full debugging sequence - run this after login fails
 */
export async function fullAuthDebug() {
  console.log('=== FULL AUTHENTICATION DEBUG ===');
  console.log('This will help identify where the token issue is coming from');
  console.log('');
  console.log('Step 1: Check what token is currently stored');
  debugTokenStorage();
  console.log('');
  console.log('Step 2: Validate the stored token format');
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    validateToken(storedToken);
  }
  console.log('');
  console.log('Debug complete. Check the logs above to identify the issue.');
}

/**
 * Check if token field name might be different
 */
export function debugCommonTokenFieldNames(response: any) {
  console.group('[Field Names] Checking common token field variations');
  
  const fieldNames = [
    'token',
    'accessToken',
    'access_token',
    'jwt',
    'authorization',
    'bearer',
    'auth_token',
    'auth-token',
    'jwtToken',
    'jwt_token',
    'sessionToken',
    'session_token',
  ];
  
  const flatResponse = JSON.stringify(response);
  
  fieldNames.forEach((field) => {
    const regex = new RegExp(`"${field}"\\s*:\\s*"([^"]+)"`, 'i');
    const match = flatResponse.match(regex);
    if (match) {
      console.log(`✓ Found "${field}": ${match[1]}`);
    }
  });
  
  console.groupEnd();
}
