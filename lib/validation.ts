/**
 * Validation utilities for payment forms
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic international format)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate name (at least 2 characters)
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * Validate required field
 */
export function validateRequired(value: string | null | undefined): boolean {
  return !!value && value.trim().length > 0;
}

/**
 * Validate amount (positive number)
 */
export function validateAmount(amount: number): boolean {
  return amount > 0 && !isNaN(amount);
}

/**
 * Validate order ID format (UUID)
 */
export function validateOrderId(orderId: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(orderId);
}

/**
 * Validate encrypted order ID (hex string)
 */
export function validateEncryptedOrderId(encrypted: string): boolean {
  return /^[a-f0-9]+$/i.test(encrypted) && encrypted.length > 0;
}

/**
 * Validate checkout form
 */
export function validateCheckoutForm(data: {
  email: string;
  phone?: string;
  name?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!validateRequired(data.email)) {
    errors.push({
      field: 'email',
      message: 'Email is required',
    });
  } else if (!validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
    });
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Please enter a valid phone number',
    });
  }

  if (data.name && !validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get error message for a field
 */
export function getFieldError(
  errors: ValidationError[],
  field: string
): string | null {
  const error = errors.find((e) => e.field === field);
  return error?.message || null;
}

/**
 * Check if field has error
 */
export function hasFieldError(errors: ValidationError[], field: string): boolean {
  return errors.some((e) => e.field === field);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^\d.-]/g, ''));
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate and sanitize email
 */
export function validateAndSanitizeEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  if (validateEmail(trimmed)) {
    return sanitizeInput(trimmed);
  }
  return null;
}
