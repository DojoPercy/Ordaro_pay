'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInitializePayment, useGetPaymentStatus } from '@/hooks/usePayment';
import { useGetOrder } from '@/hooks/useOrder';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface CheckoutPageProps {
  orderId: string;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function CheckoutPage({ orderId }: CheckoutPageProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  // Fetch order details
  const { data: order, isLoading: orderLoading, error: orderError } = useGetOrder(orderId);

  // Initialize payment mutation
  const initializePayment = useInitializePayment();

  // Poll payment status
  const { data: paymentStatus } = useGetPaymentStatus(orderId, {
    enabled: isProcessing,
    refetchInterval: 3000,
  });

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle payment initialization
  const handleInitializePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !order) {
      alert('Please enter your email address');
      return;
    }

    try {
      setIsProcessing(true);

      // Initialize payment
      const response = await initializePayment.mutateAsync({
        orderId,
        email,
      });

      if (!response.checkoutUrl) {
        throw new Error('Failed to get checkout URL');
      }

      // Redirect to checkout URL
      window.location.href = response.checkoutUrl;
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Failed to initialize payment. Please try again.');
      setIsProcessing(false);
    }
  };

  // Check if payment completed
  useEffect(() => {
    if (paymentStatus?.status === 'PAYMENT_COMPLETED') {
      router.push(`/success/${orderId}`);
    }
  }, [paymentStatus, orderId, router]);

  if (orderLoading) {
    return <LoadingState />;
  }

  if (orderError) {
    return (
      <ErrorState
        title="Failed to Load Order"
        message={orderError?.message || 'Unable to load order details. Please try again.'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!order) {
    return (
      <ErrorState
        title="Order Not Found"
        message="The order could not be found. Please check your QR code and try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-lg font-bold text-gray-900">{order.organization.name}</h1>
          <p className="text-sm text-gray-600">Secure Checkout</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Order Details</span>
            </div>
            <div className="flex-1 h-1 bg-gray-300 mx-4" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: 'NGN',
                      }).format(item.totalPrice)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                {order.tax > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>

              <form onSubmit={handleInitializePayment} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isProcessing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send your receipt to this email
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing || !paystackLoaded}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${formatCurrency(order.total)}`
                  )}
                </button>
              </form>

              {/* Security Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 11-1.414 1.414l-4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-gray-600">
                    Your payment is secured by Paystack. We never store your card details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order #{order.orderNumber}</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Amount</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(order.total)}</p>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-600 mb-1">Payment Method</p>
                  <p className="font-medium text-gray-900">Card / Bank Transfer</p>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-600 mb-1">Status</p>
                  <p className="font-medium text-yellow-600">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
