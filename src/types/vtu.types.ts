// VTU Service Types
export interface VTUService {
  identifier: string;
  name: string;
}

export interface VTUProvider {
  serviceID: string;
  name: string;
  minimium_amount: string | number;
  maximum_amount: string | number;
  convinience_fee: string;
  product_type: string;
  image?: string;
}

export interface VTUVariation {
  variation_code: string;
  name: string;
  variation_amount: string;
  fixedPrice: string;
}

export interface VTUVariationResponse {
  ServiceName: string;
  serviceID: string;
  convinience_fee: string;
  variations: VTUVariation[];
}

export interface VTUPaymentRequest {
  amount: string | number;
  billersCode?: string;
  country_code?: string;
  email: string;
  operator_id?: string;
  phone: string;
  product_type_id?: string;
  request_id: string;
  serviceID: string;
  variation_code?: string;
  user_id: number;
}

export interface VTUPaymentResponse {
  response_description: string;
  request_id: string;
  transaction_id?: string;
  status: string;
  message?: string;
}

export interface AirtimeTransaction {
  id: string;
  phone: string;
  provider: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  request_id: string;
}
