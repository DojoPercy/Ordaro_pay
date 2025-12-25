import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  InitializePaymentRequest,
  InitializePaymentResponse,
  PaymentStatusPollingResponse,
  ApiError,
} from './types';

const PAYMENT_API_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || 'http://localhost:3001';

class PaymentClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: PAYMENT_API_BASE_URL,
      timeout: 15000,
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
      message: 'Payment API error',
      status: error.response?.status,
    };

    if (error.response) {
      const data = error.response.data as any;
      apiError.message = data?.message || error.message;
      apiError.code = data?.code;
      apiError.details = data;
    } else if (error.request) {
      apiError.message = 'No response from payment service';
    } else {
      apiError.message = error.message;
    }

    return apiError;
  }

  /**
   * Initialize payment and get checkout URL
   */
  async initializePayment(
    request: InitializePaymentRequest
  ): Promise<InitializePaymentResponse> {
    try {
      const response = await this.client.post<InitializePaymentResponse>(
        '/api/payments/initialize',
        request
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get payment status (for polling)
   */
  async getPaymentStatus(orderId: string): Promise<PaymentStatusPollingResponse> {
    try {
      const response = await this.client.get<PaymentStatusPollingResponse>(
        `/api/payments/${orderId}/status`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify order with payment service
   */
  async verifyOrder(orderId: string): Promise<any> {
    try {
      const response = await this.client.post('/api/orders/verify', {
        orderId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const paymentClient = new PaymentClient();
