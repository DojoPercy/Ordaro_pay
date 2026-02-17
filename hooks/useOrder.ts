import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Order, VerifyOrderResponse, VerifyOrderRequest } from '@/lib/api/types';

/**
 * Custom error type for serialization
 */
export interface QueryError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Fetch order details by ID
 */
export function useGetOrder(
  orderId: string | null,
  options?: { enabled?: boolean }
): UseQueryResult<Order, QueryError> {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) {
        throw { message: 'Order ID is required' } as QueryError;
      }
      try {
        // orderId here is actually the encryptedOrderId from the URL
        return await apiClient.getPublicOrder(orderId);
      } catch (error: any) {
        throw {
          message: error?.message || 'Failed to fetch order',
          code: error?.code,
          status: error?.status,
        } as QueryError;
      }
    },
    enabled: !!orderId && (options?.enabled !== false),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Verify order ownership and get details
 */
export function useVerifyOrder(
  orderId: string | null,
  options?: { enabled?: boolean }
): UseQueryResult<VerifyOrderResponse, QueryError> {
  return useQuery({
    queryKey: ['verify-order', orderId],
    queryFn: async () => {
      if (!orderId) {
        throw { message: 'Order ID is required' } as QueryError;
      }
      try {
        const request: VerifyOrderRequest = { orderId };
        return await apiClient.verifyOrder(request);
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
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

/**
 * Get payment link with QR code
 */
export function useGetPaymentLink(
  orderId: string | null,
  options?: { enabled?: boolean }
): UseQueryResult<any, QueryError> {
  return useQuery({
    queryKey: ['payment-link', orderId],
    queryFn: async () => {
      if (!orderId) {
        throw { message: 'Order ID is required' } as QueryError;
      }
      try {
        return await apiClient.getPaymentLink(orderId);
      } catch (error: any) {
        throw {
          message: error?.message || 'Failed to fetch payment link',
          code: error?.code,
          status: error?.status,
        } as QueryError;
      }
    },
    enabled: !!orderId && (options?.enabled !== false),
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });
}
