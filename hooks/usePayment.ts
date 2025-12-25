import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { paymentClient } from '@/lib/api/payment-client';
import {
  InitializePaymentRequest,
  InitializePaymentResponse,
  PaymentStatusPollingResponse,
} from '@/lib/api/types';

/**
 * Custom error type for serialization
 */
export interface QueryError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Initialize payment and get checkout URL
 */
export function useInitializePayment(): UseMutationResult<
  InitializePaymentResponse,
  QueryError,
  InitializePaymentRequest
> {
  return useMutation({
    mutationFn: async (request: InitializePaymentRequest) => {
      try {
        return await paymentClient.initializePayment(request);
      } catch (error: any) {
        throw {
          message: error?.message || 'Failed to initialize payment',
          code: error?.code,
          status: error?.status,
        } as QueryError;
      }
    },
    onError: (error) => {
      console.error('Payment initialization failed:', error?.message);
    },
  });
}

/**
 * Get payment status with polling
 */
export function useGetPaymentStatus(
  orderId: string | null,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    refetchIntervalInBackground?: boolean;
  }
): UseQueryResult<PaymentStatusPollingResponse, QueryError> {
  return useQuery({
    queryKey: ['payment-status', orderId],
    queryFn: async () => {
      if (!orderId) {
        throw { message: 'Order ID is required' } as QueryError;
      }
      try {
        return await paymentClient.getPaymentStatus(orderId);
      } catch (error: any) {
        throw {
          message: error?.message || 'Failed to fetch payment status',
          code: error?.code,
          status: error?.status,
        } as QueryError;
      }
    },
    enabled: !!orderId && (options?.enabled !== false),
    refetchInterval: options?.refetchInterval || 3000,
    refetchIntervalInBackground: options?.refetchIntervalInBackground !== false,
    staleTime: 0,
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}

/**
 * Verify order with payment service
 */
export function useVerifyOrderPayment(
  orderId: string | null,
  options?: { enabled?: boolean }
): UseQueryResult<any, QueryError> {
  return useQuery({
    queryKey: ['verify-order-payment', orderId],
    queryFn: async () => {
      if (!orderId) {
        throw { message: 'Order ID is required' } as QueryError;
      }
      try {
        return await paymentClient.verifyOrder(orderId);
      } catch (error: any) {
        throw {
          message: error?.message || 'Failed to verify order',
          code: error?.code,
          status: error?.status,
        } as QueryError;
      }
    },
    enabled: !!orderId && (options?.enabled !== false),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
