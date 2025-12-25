/**
 * Configuration loader for different environments
 */

export interface Config {
  ordaro_api_url: string;
  payment_service_url: string;
  paystack_public_key: string;
  encryption_key: string;
  encryption_iv: string;
  node_env: 'development' | 'staging' | 'production';
  is_production: boolean;
  is_development: boolean;
}

function getConfig(): Config {
  const ordaro_api_url = process.env.NEXT_PUBLIC_ORDARO_API_URL;
  const payment_service_url = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL;
  const paystack_public_key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const encryption_key = process.env.ENCRYPTION_KEY;
  const encryption_iv = process.env.ENCRYPTION_IV;
  const node_env = (process.env.NODE_ENV || 'development') as 'development' | 'staging' | 'production';

  // Validate required environment variables
  const missingVars: string[] = [];

  if (!ordaro_api_url) missingVars.push('NEXT_PUBLIC_ORDARO_API_URL');
  if (!payment_service_url) missingVars.push('NEXT_PUBLIC_PAYMENT_SERVICE_URL');
  if (!paystack_public_key) missingVars.push('NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY');
  if (!encryption_key) missingVars.push('ENCRYPTION_KEY');
  if (!encryption_iv) missingVars.push('ENCRYPTION_IV');

  if (missingVars.length > 0) {
    console.error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  return {
    ordaro_api_url: ordaro_api_url || '',
    payment_service_url: payment_service_url || '',
    paystack_public_key: paystack_public_key || '',
    encryption_key: encryption_key || '',
    encryption_iv: encryption_iv || '',
    node_env,
    is_production: node_env === 'production',
    is_development: node_env === 'development',
  };
}

export const config = getConfig();

/**
 * Validate configuration on startup
 */
export function validateConfig(): boolean {
  const requiredFields: (keyof Config)[] = [
    'ordaro_api_url',
    'payment_service_url',
    'paystack_public_key',
    'encryption_key',
    'encryption_iv',
  ];

  const missing = requiredFields.filter((field) => !config[field]);

  if (missing.length > 0) {
    console.error(
      `Configuration validation failed. Missing: ${missing.join(', ')}`
    );
    return false;
  }

  return true;
}

/**
 * Get API URL for a service
 */
export function getApiUrl(service: 'ordaro' | 'payment'): string {
  if (service === 'ordaro') {
    return config.ordaro_api_url;
  }
  return config.payment_service_url;
}

/**
 * Get encryption credentials
 */
export function getEncryptionCredentials(): {
  key: string;
  iv: string;
} {
  return {
    key: config.encryption_key,
    iv: config.encryption_iv,
  };
}
