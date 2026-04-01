import { apiClient } from './api-client';
import {
  Transaction,
  TransactionFilters,
  PurchaseAirtimeRequest,
  PurchaseDataRequest,
  PayBillsRequest,
  ReportTransactionIssueRequest,
  PaginatedResponse,
  ApiResponse,
} from '@/types/api.types';

class TransactionService {
  async getTransactions(filters?: TransactionFilters): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiClient.get(`/transactions${query}`);
  }

  async getTransaction(transactionId: string): Promise<ApiResponse<{ transaction: Transaction }>> {
    return apiClient.get(`/transactions/${transactionId}`);
  }

  async purchaseAirtime(data: PurchaseAirtimeRequest): Promise<ApiResponse<{ transaction: Transaction }>> {
    return apiClient.post('/vtu/pay', data);
  }

  async purchaseData(data: PurchaseDataRequest): Promise<ApiResponse<{ transaction: Transaction }>> {
    return apiClient.post('/transactions/data/purchase', data);
  }

  async payBills(data: PayBillsRequest): Promise<ApiResponse<{ transaction: Transaction }>> {
    return apiClient.post('/transactions/bills/pay', data);
  }

  async getReceipt(
    transactionId: string,
    format: 'pdf' | 'json' | 'email' = 'json'
  ): Promise<any> {
    return apiClient.get(`/transactions/${transactionId}/receipt?format=${format}`);
  }

  async reportIssue(
    transactionId: string,
    data: ReportTransactionIssueRequest
  ): Promise<ApiResponse<{ report: any }>> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return apiClient.post(`/transactions/${transactionId}/report`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const transactionService = new TransactionService();
