import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  Order,
  PaymentStatusResponse,
  VerifyOrderRequest,
  VerifyOrderResponse,
  ApiError,
} from './types';

const API_BASE_URL = "http://localhost:5050/api/v1";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      message: 'An error occurred',
      status: error.response?.status,
    };

    if (error.response) {
      const data = error.response.data as any;
      apiError.message = data?.message || error.message;
      apiError.code = data?.code;
      apiError.details = data;
    } else if (error.request) {
      apiError.message = 'No response from server';
    } else {
      apiError.message = error.message;
    }

    return apiError;
  }

  /**
   * Fetch order details
   */
  async getOrder(orderId: string): Promise<Order> {
    try {
      const response = await this.client.get<Order>(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch public order details
   */
  async getPublicOrder(encryptedOrderId: string): Promise<Order> {
    try {
      const response = await this.client.get<Order>(`/payments/public/orders/${encryptedOrderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify order ownership and get details
   */
  async verifyOrder(request: VerifyOrderRequest): Promise<VerifyOrderResponse> {
    try {
      const response = await this.client.post<VerifyOrderResponse>(
        '/api/orders/verify',
        request
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get payment status for order
   */
  async getPaymentStatus(orderId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await this.client.get<PaymentStatusResponse>(
        `/orders/${orderId}/payment-status`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get payment link with QR code
   */
  async getPaymentLink(orderId: string): Promise<any> {
    try {
      const response = await this.client.get(
        `/orders/${orderId}/payment-link`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
