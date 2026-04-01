import { apiClient } from './api-client';
import {
  AdminDashboard,
  AdminUser,
  Agent,
  UpdateUserStatusRequest,
  RefundTransactionRequest,
  GenerateReportRequest,
  ApiResponse,
  PaginatedResponse,
} from '@/types/api.types';

class AdminService {
  async getDashboard(): Promise<ApiResponse<{ dashboard: AdminDashboard }>> {
    return apiClient.get('/admin/dashboard');
  }

  async getUsers(page = 1, per_page = 20, filters?: any): Promise<ApiResponse<PaginatedResponse<AdminUser>>> {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('per_page', String(per_page));

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }

    return apiClient.get(`/admin/users?${params.toString()}`);
  }

  async getUser(userId: string): Promise<ApiResponse<{ user: AdminUser }>> {
    return apiClient.get(`/admin/users/${userId}`);
  }

  async updateUserStatus(
    userId: string,
    data: UpdateUserStatusRequest
  ): Promise<ApiResponse<{ user: AdminUser }>> {
    return apiClient.put(`/admin/users/${userId}/status`, data);
  }

  async getTransactions(page = 1, per_page = 20, filters?: any): Promise<any> {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('per_page', String(per_page));

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }

    return apiClient.get(`/admin/transactions?${params.toString()}`);
  }

  async refundTransaction(
    transactionId: string,
    data: RefundTransactionRequest
  ): Promise<any> {
    return apiClient.post(`/admin/transactions/${transactionId}/refund`, data);
  }

  async generateReport(data: GenerateReportRequest): Promise<any> {
    return apiClient.post('/admin/reports/generate', data);
  }

  async getAgents(page = 1, per_page = 20): Promise<ApiResponse<PaginatedResponse<Agent>>> {
    return apiClient.get(`/admin/agents?page=${page}&per_page=${per_page}`);
  }

  async getAnalytics(metric: string, period: string): Promise<any> {
    return apiClient.get(`/admin/analytics?metric=${metric}&period=${period}`);
  }
}

class AgentService {
  async getDashboard(): Promise<any> {
    return apiClient.get('/agents/dashboard');
  }

  async getCustomers(page = 1, per_page = 20, filters?: any): Promise<any> {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('per_page', String(per_page));

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }

    return apiClient.get(`/agents/customers?${params.toString()}`);
  }

  async addCustomer(data: any): Promise<any> {
    return apiClient.post('/agents/customers', data);
  }

  async getCommissions(page = 1, per_page = 20, filters?: any): Promise<any> {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('per_page', String(per_page));

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }

    return apiClient.get(`/agents/commissions?${params.toString()}`);
  }

  async getPerformance(period = 'month'): Promise<any> {
    return apiClient.get(`/agents/performance?period=${period}`);
  }
}

class ReferralService {
  async getInfo(): Promise<any> {
    return apiClient.get('/referral/info');
  }

  async getCommissions(page = 1, per_page = 20): Promise<any> {
    return apiClient.get(`/referral/commissions?page=${page}&per_page=${per_page}`);
  }
}

export const adminService = new AdminService();
export const agentService = new AgentService();
export const referralService = new ReferralService();
