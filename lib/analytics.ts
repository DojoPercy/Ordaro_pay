import { logger } from './logger';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

class Analytics {
  private enabled: boolean;
  private gaId: string | null;

  constructor() {
    this.enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
    this.gaId = process.env.NEXT_PUBLIC_GA_ID || null;
  }

  /**
   * Initialize Google Analytics
   */
  initializeGA(): void {
    if (!this.enabled || !this.gaId || typeof window === 'undefined') {
      return;
    }

    try {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
      document.head.appendChild(script);

      // Initialize gtag
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
      }
      (window as any).gtag = gtag;
      gtag('js', new Date());
      gtag('config', this.gaId);

      logger.info('Google Analytics initialized', { gaId: this.gaId });
    } catch (error) {
      logger.error('Failed to initialize Google Analytics', error as Error);
    }
  }

  /**
   * Track page view
   */
  trackPageView(path: string, title?: string): void {
    if (!this.enabled || typeof window === 'undefined') {
      return;
    }

    try {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_path: path,
          page_title: title || document.title,
        });
      }
      logger.debug('Page view tracked', { path, title });
    } catch (error) {
      logger.error('Failed to track page view', error as Error);
    }
  }

  /**
   * Track custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.enabled) {
      return;
    }

    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.name, event.properties || {});
      }
      logger.debug('Event tracked', { event: event.name, properties: event.properties });
    } catch (error) {
      logger.error('Failed to track event', error as Error, { event: event.name });
    }
  }

  /**
   * Track payment event
   */
  trackPayment(orderId: string, amount: number, status: 'success' | 'failed' | 'pending'): void {
    this.trackEvent({
      name: 'payment',
      properties: {
        order_id: orderId,
        amount,
        status,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Track error event
   */
  trackError(errorName: string, errorMessage: string, context?: Record<string, any>): void {
    this.trackEvent({
      name: 'error',
      properties: {
        error_name: errorName,
        error_message: errorMessage,
        ...context,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Track user action
   */
  trackUserAction(action: string, properties?: Record<string, any>): void {
    this.trackEvent({
      name: `user_${action}`,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

export const analytics = new Analytics();
