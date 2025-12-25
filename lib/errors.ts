/**
 * Custom error handling utilities
 */

export class PaymentError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'PaymentError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public value?: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class EncryptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EncryptionError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public retryable: boolean = true
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Error messages for user display
 */
export const ERROR_MESSAGES = {
  // Encryption errors
  DECRYPTION_FAILED: 'Failed to decrypt order information. Please check your QR code and try again.',
  INVALID_ORDER_ID: 'Invalid order ID format.',
  MISSING_ENCRYPTION_KEY: 'Encryption configuration is missing.',

  // Order errors
  ORDER_NOT_FOUND: 'Order could not be found. Please check your QR code and try again.',
  ORDER_ALREADY_PAID: 'This order has already been paid.',
  INVALID_ORDER: 'Invalid order information.',

  // Payment errors
  PAYMENT_INITIALIZATION_FAILED: 'Failed to initialize payment. Please try again.',
  PAYMENT_VERIFICATION_FAILED: 'Failed to verify payment. Please try again.',
  PAYMENT_TIMEOUT: 'Payment processing took too long. Please check your order status.',
  PAYMENT_FAILED: 'Payment failed. Please try again or contact support.',

  // Network errors
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  API_ERROR: 'API error. Please try again later.',
  TIMEOUT: 'Request timed out. Please try again.',

  // Validation errors
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  REQUIRED_FIELD: 'This field is required.',

  // Generic errors
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  CONTACT_SUPPORT: 'If the problem persists, please contact support.',
};

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: any): string {
  if (error instanceof PaymentError) {
    return error.message;
  }

  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof EncryptionError) {
    return ERROR_MESSAGES.DECRYPTION_FAILED;
  }

  if (error instanceof NetworkError) {
    return error.message;
  }

  if (error?.response?.status === 404) {
    return ERROR_MESSAGES.ORDER_NOT_FOUND;
  }

  if (error?.response?.status === 400) {
    return error?.response?.data?.message || ERROR_MESSAGES.INVALID_ORDER;
  }

  if (error?.response?.status === 500) {
    return ERROR_MESSAGES.API_ERROR;
  }

  if (error?.message?.includes('timeout')) {
    return ERROR_MESSAGES.TIMEOUT;
  }

  if (error?.message?.includes('network')) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: any): boolean {
  if (error instanceof NetworkError) {
    return error.retryable;
  }

  const status = error?.response?.status;
  if (!status) return true;

  // Retry on 5xx errors and specific 4xx errors
  return status >= 500 || status === 408 || status === 429;
}

/**
 * Format error for logging
 */
export function formatErrorForLogging(error: any): object {
  return {
    name: error?.name || 'Unknown',
    message: error?.message || 'Unknown error',
    code: error?.code,
    status: error?.status || error?.response?.status,
    stack: error?.stack,
    details: error?.details || error?.response?.data,
  };
}

/**
 * Log error to console (development only)
 */
export function logError(error: any, context?: string): void {
  if (typeof window === 'undefined') return; // Skip on server

  const isDevelopment = process.env.NODE_ENV === 'development';
  if (!isDevelopment) return;

  console.error(
    `[${context || 'Error'}]`,
    formatErrorForLogging(error)
  );
}

/**
 * Create error with context
 */
export function createPaymentError(
  message: string,
  code?: string,
  status?: number,
  details?: any
): PaymentError {
  return new PaymentError(message, code, status, details);
}

/**
 * Handle API error response
 */
export function handleApiError(error: any): PaymentError {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const message = data?.message || getErrorMessage(error);

  return createPaymentError(
    message,
    data?.code,
    status,
    data
  );
}
