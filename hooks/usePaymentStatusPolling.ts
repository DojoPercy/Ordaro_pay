import { useEffect, useRef, useCallback } from 'react';
import { useGetPaymentStatus } from './usePayment';

interface UsePaymentStatusPollingOptions {
  orderId: string | null;
  enabled?: boolean;
  interval?: number; // milliseconds, default 3000
  timeout?: number; // milliseconds, default 300000 (5 minutes)
  onSuccess?: () => void;
  onTimeout?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for polling payment status with timeout and fallback
 * Polls every 3 seconds by default, times out after 5 minutes
 */
export function usePaymentStatusPolling({
  orderId,
  enabled = true,
  interval = 3000,
  timeout = 300000,
  onSuccess,
  onTimeout,
  onError,
}: UsePaymentStatusPollingOptions) {
  const startTimeRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Get payment status hook
  const {
    data: paymentStatus,
    isLoading,
    error,
    refetch,
  } = useGetPaymentStatus(orderId, {
    enabled: enabled && !!orderId,
    refetchInterval: interval,
  });

  // Handle success
  useEffect(() => {
    if (paymentStatus?.status === 'PAYMENT_COMPLETED') {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      onSuccess?.();
    }
  }, [paymentStatus?.status, onSuccess]);

  // Handle timeout
  useEffect(() => {
    if (!enabled || !orderId) return;

    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }

    timeoutIdRef.current = setTimeout(() => {
      const elapsed = Date.now() - (startTimeRef.current || 0);
      if (elapsed >= timeout) {
        onTimeout?.();
      }
    }, timeout);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [enabled, orderId, timeout, onTimeout]);

  // Handle errors
  useEffect(() => {
    if (error) {
      onError?.(error as Error);
    }
  }, [error, onError]);

  // Reset on orderId change
  useEffect(() => {
    startTimeRef.current = null;
  }, [orderId]);

  return {
    paymentStatus,
    isLoading,
    error,
    refetch,
    isPolling: enabled && !!orderId && !paymentStatus,
  };
}

/**
 * Hook for manual polling with exponential backoff
 */
export function useManualPaymentPolling(orderId: string | null) {
  const attemptRef = useRef(0);
  const maxAttemptsRef = useRef(100); // ~5 minutes with exponential backoff

  const { data: paymentStatus, refetch } = useGetPaymentStatus(orderId, {
    enabled: false, // Manual control
  });

  const poll = useCallback(async () => {
    if (!orderId || attemptRef.current >= maxAttemptsRef.current) {
      return;
    }

    attemptRef.current += 1;
    const result = await refetch();

    if (result.data?.status === 'PAYMENT_COMPLETED') {
      attemptRef.current = 0;
      return result.data;
    }

    // Exponential backoff: 1s, 2s, 4s, 8s, etc. (max 30s)
    const backoffDelay = Math.min(1000 * Math.pow(2, Math.floor(attemptRef.current / 5)), 30000);

    return new Promise((resolve) => {
      setTimeout(() => {
        poll().then(resolve);
      }, backoffDelay);
    });
  }, [orderId, refetch]);

  const reset = useCallback(() => {
    attemptRef.current = 0;
  }, []);

  return {
    paymentStatus,
    poll,
    reset,
    attempts: attemptRef.current,
    maxAttempts: maxAttemptsRef.current,
  };
}
