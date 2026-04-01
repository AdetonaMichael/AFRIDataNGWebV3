import { apiClient } from './api-client';
import type {
  VTUService as VTUServiceType,
  VTUProvider,
  VTUVariationResponse,
  VTUPaymentRequest,
  VTUPaymentResponse,
} from '@/types/vtu.types';
import { ApiResponse, PaginatedResponse } from '@/types/api.types';

class VTUService {
  /**
   * Get all available VTU services (Airtime, Data, Bills, etc.)
   */
  async getServices(): Promise<VTUServiceType[] | null> {
    try {
      const response = await apiClient.get<any>('/vtu/services');
      return response.data || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all providers for a specific service
   * @param serviceId - The service identifier (e.g., 'airtime', 'data', 'electricity-bill')
   */
  async getServiceProviders(serviceId: string): Promise<VTUProvider[] | null> {
    try {
      console.log('[VTUService] Fetching providers for:', serviceId);
      const endpoint = `/vtu/service/${serviceId}`;
      const response = await apiClient.get<any>(endpoint);
      
      console.log('[VTUService] API Response received:', {
        success: response?.success,
        hasData: !!response?.data,
      });
      
      // apiClient.get() already extracts res.data
      // API returns: { success: true, data: [...] }
      const providers = response?.data || null;
      
      console.log('[VTUService] Providers extracted:', {
        isArray: Array.isArray(providers),
        count: Array.isArray(providers) ? providers.length : 0,
      });
      
      return providers;
    } catch (error) {
      console.error('[VTUService] Error fetching providers:', error);
      throw error;
    }
  }

  /**
   * Get variations for a specific provider
   * @param serviceId - The service ID (e.g., 'airtel-data', 'mtn-airtime')
   */
  async getVariations(serviceId: string): Promise<VTUVariationResponse | null> {
    try {
      console.log('[VTUService] Fetching variations for:', serviceId);
      const response = await apiClient.get<any>(
        `/vtu/variations/${serviceId}`
      );
      console.log('[VTUService] Variations response:', response);
      
      // API returns data in response.data property
      // apiClient.get() returns ApiResponse which contains data property
      const variations = response?.data || null;
      console.log('[VTUService] Variations extracted:', variations);
      return variations;
    } catch (error) {
      console.error('[VTUService] getVariations error:', error);
      throw error;
    }
  }

  /**
   * Process VTU payment
   * @param paymentData - Payment request payload
   */
  async processPayment(paymentData: VTUPaymentRequest): Promise<VTUPaymentResponse | null> {
    try {
      console.log('[VTUService] Processing payment with data:', paymentData);
      const response = await apiClient.post<any>(
        '/vtu/pay',
        paymentData
      );
      console.log('[VTUService] Payment response:', response);
      
      // API returns data in response.data property
      // apiClient.post() returns ApiResponse which contains data property
      const result = response?.data || null;
      console.log('[VTUService] Payment result extracted:', result);
      return result;
    } catch (error) {
      console.error('[VTUService] processPayment error:', error);
      throw error;
    }
  }

  /**
   * Get airtime services (filtered to 'airtime' service)
   * Convenience method for airtime flow
   */
  async getAirtimeProviders(): Promise<VTUProvider[] | null> {
    console.log('[VTUService] ╔════════════════════════════════════════════════════════╗');
    console.log('[VTUService] ║ getAirtimeProviders() ENTRY POINT                     ║');
    console.log('[VTUService] ╚════════════════════════════════════════════════════════╝');
    try {
      console.log('[VTUService] Calling getServiceProviders("airtime")...');
      const result = await this.getServiceProviders('airtime');
      
      console.log('[VTUService] ╔════════════════════════════════════════════════════════╗');
      console.log('[VTUService] ║ getAirtimeProviders() FINAL CHECK                     ║');
      console.log('[VTUService] ╚════════════════════════════════════════════════════════╝');
      console.log('[VTUService] Result value:', result);
      console.log('[VTUService] Result type:', typeof result);
      console.log('[VTUService] Is array?:', Array.isArray(result));
      console.log('[VTUService] Result length:', Array.isArray(result) ? result.length : 'NOT AN ARRAY');
      
      if (Array.isArray(result) && result.length > 0) {
        console.log('[VTUService] ✅ SUCCESS: Returning array with', result.length, 'providers');
        console.log('[VTUService] First provider:', result[0]);
      } else if (result === null) {
        console.warn('[VTUService] ⚠️  WARNING: Result is null');
      } else if (!Array.isArray(result)) {
        console.error('[VTUService] ❌ ERROR: Result is NOT an array!', {
          result,
          resultType: typeof result,
        });
      }
      
      return result;
    } catch (error) {
      console.error('[VTUService] ❌ getAirtimeProviders() EXCEPTION:', error);
      throw error;
    }
  }

  /**
   * Get variations for airtime provider
   * @param providerCode - Provider code (e.g., 'mtn', 'airtel', 'glo', '9mobile')
   */
  async getAirtimeVariations(providerCode: string): Promise<VTUVariationResponse | null> {
    return this.getVariations(`${providerCode}-airtime`);
  }
}

export const vtuService = new VTUService();
