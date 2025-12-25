import { logger } from './logger';

export interface PaymentRecord {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  reference: string;
  customerEmail: string;
  customerName?: string;
  paymentMethod: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

class PaymentHistory {
  private storageKey = 'ordaro_payment_history';
  private maxRecords = 100;

  /**
   * Add payment record
   */
  addRecord(record: Omit<PaymentRecord, 'id' | 'timestamp'>): PaymentRecord {
    try {
      const paymentRecord: PaymentRecord = {
        ...record,
        id: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
      };

      const history = this.getHistory();
      history.unshift(paymentRecord);

      // Keep only last 100 records
      if (history.length > this.maxRecords) {
        history.pop();
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(history));
      }

      logger.info('Payment record added', {
        orderId: record.orderId,
        amount: record.amount,
        status: record.status,
      });

      return paymentRecord;
    } catch (error) {
      logger.error('Failed to add payment record', error as Error);
      throw error;
    }
  }

  /**
   * Get payment history
   */
  getHistory(): PaymentRecord[] {
    try {
      if (typeof window === 'undefined') {
        return [];
      }

      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      logger.error('Failed to retrieve payment history', error as Error);
      return [];
    }
  }

  /**
   * Get payment by order ID
   */
  getByOrderId(orderId: string): PaymentRecord | undefined {
    try {
      const history = this.getHistory();
      return history.find(record => record.orderId === orderId);
    } catch (error) {
      logger.error('Failed to get payment by order ID', error as Error);
      return undefined;
    }
  }

  /**
   * Get payment by reference
   */
  getByReference(reference: string): PaymentRecord | undefined {
    try {
      const history = this.getHistory();
      return history.find(record => record.reference === reference);
    } catch (error) {
      logger.error('Failed to get payment by reference', error as Error);
      return undefined;
    }
  }

  /**
   * Update payment status
   */
  updateStatus(paymentId: string, status: PaymentRecord['status']): PaymentRecord | undefined {
    try {
      const history = this.getHistory();
      const record = history.find(r => r.id === paymentId);

      if (record) {
        record.status = status;
        if (typeof window !== 'undefined') {
          localStorage.setItem(this.storageKey, JSON.stringify(history));
        }
        logger.info('Payment status updated', { paymentId, status });
        return record;
      }

      return undefined;
    } catch (error) {
      logger.error('Failed to update payment status', error as Error);
      return undefined;
    }
  }

  /**
   * Get statistics
   */
  getStatistics(): {
    totalTransactions: number;
    successfulTransactions: number;
    failedTransactions: number;
    totalAmount: number;
    averageAmount: number;
  } {
    try {
      const history = this.getHistory();

      const stats = {
        totalTransactions: history.length,
        successfulTransactions: history.filter(r => r.status === 'success').length,
        failedTransactions: history.filter(r => r.status === 'failed').length,
        totalAmount: history.reduce((sum, r) => sum + (r.status === 'success' ? r.amount : 0), 0),
        averageAmount: 0,
      };

      stats.averageAmount = stats.successfulTransactions > 0 
        ? stats.totalAmount / stats.successfulTransactions 
        : 0;

      return stats;
    } catch (error) {
      logger.error('Failed to calculate statistics', error as Error);
      return {
        totalTransactions: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        totalAmount: 0,
        averageAmount: 0,
      };
    }
  }

  /**
   * Clear history
   */
  clearHistory(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(this.storageKey);
      }
      logger.info('Payment history cleared');
    } catch (error) {
      logger.error('Failed to clear payment history', error as Error);
    }
  }

  /**
   * Export history as CSV
   */
  exportAsCSV(): string {
    try {
      const history = this.getHistory();
      const headers = ['ID', 'Order ID', 'Amount', 'Currency', 'Status', 'Reference', 'Email', 'Date'];
      const rows = history.map(r => [
        r.id,
        r.orderId,
        r.amount,
        r.currency,
        r.status,
        r.reference,
        r.customerEmail,
        r.timestamp,
      ]);

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ].join('\n');

      logger.info('Payment history exported as CSV');
      return csv;
    } catch (error) {
      logger.error('Failed to export payment history', error as Error);
      return '';
    }
  }
}

export const paymentHistory = new PaymentHistory();
