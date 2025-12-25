import * as Sentry from '@sentry/nextjs';
import { logger } from './logger';

interface SentryConfig {
  dsn: string;
  environment: string;
  tracesSampleRate: number;
  enabled: boolean;
}

class SentryService {
  private config: SentryConfig;
  private initialized: boolean = false;

  constructor() {
    this.config = {
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      enabled: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true',
    };
  }

  /**
   * Initialize Sentry
   */
  initialize(): void {
    if (this.initialized || !this.config.enabled || !this.config.dsn) {
      return;
    }

    try {
      Sentry.init({
        dsn: this.config.dsn,
        environment: this.config.environment,
        tracesSampleRate: this.config.tracesSampleRate,
        integrations: [
          new Sentry.Replay({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });

      this.initialized = true;
      logger.info('Sentry initialized', { environment: this.config.environment });
    } catch (error) {
      logger.error('Failed to initialize Sentry', error as Error);
    }
  }

  /**
   * Capture exception
   */
  captureException(error: Error, context?: Record<string, any>): void {
    if (!this.config.enabled) {
      return;
    }

    try {
      Sentry.captureException(error, {
        contexts: context ? { custom: context } : undefined,
      });
      logger.error('Exception captured in Sentry', error, context);
    } catch (err) {
      logger.error('Failed to capture exception in Sentry', err as Error);
    }
  }

  /**
   * Capture message
   */
  captureMessage(message: string, level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info'): void {
    if (!this.config.enabled) {
      return;
    }

    try {
      Sentry.captureMessage(message, level);
      logger.debug('Message captured in Sentry', { message, level });
    } catch (error) {
      logger.error('Failed to capture message in Sentry', error as Error);
    }
  }

  /**
   * Set user context
   */
  setUserContext(userId: string, email?: string, username?: string): void {
    if (!this.config.enabled) {
      return;
    }

    try {
      Sentry.setUser({
        id: userId,
        email,
        username,
      });
    } catch (error) {
      logger.error('Failed to set user context in Sentry', error as Error);
    }
  }

  /**
   * Clear user context
   */
  clearUserContext(): void {
    if (!this.config.enabled) {
      return;
    }

    try {
      Sentry.setUser(null);
    } catch (error) {
      logger.error('Failed to clear user context in Sentry', error as Error);
    }
  }

  /**
   * Add breadcrumb
   */
  addBreadcrumb(message: string, category: string, level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info', data?: Record<string, any>): void {
    if (!this.config.enabled) {
      return;
    }

    try {
      Sentry.addBreadcrumb({
        message,
        category,
        level,
        data,
      });
    } catch (error) {
      logger.error('Failed to add breadcrumb to Sentry', error as Error);
    }
  }

  /**
   * Check if Sentry is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled && this.initialized;
  }
}

export const sentryService = new SentryService();
