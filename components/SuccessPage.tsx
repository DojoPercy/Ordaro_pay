'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useGetOrder } from '@/hooks/useOrder';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface SuccessPageProps {
  orderId: string;
}

export default function SuccessPage({ orderId }: SuccessPageProps) {
  const { data: order, isLoading, error } = useGetOrder(orderId);

  useEffect(() => {
    // Confetti animation
    if (typeof window !== 'undefined' && order) {
      const confetti = document.createElement('div');
      confetti.className = 'fixed inset-0 pointer-events-none overflow-hidden';
      document.body.appendChild(confetti);

      // Simple confetti effect
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-blue-500 rounded-full animate-bounce';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-10px';
        particle.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;
        confetti.appendChild(particle);
      }

      return () => {
        document.body.removeChild(confetti);
      };
    }
    return undefined;
  }, [order]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !order) {
    return (
      <ErrorState
        title="Failed to Load Order"
        message="Unable to load order details."
        showContactSupport={true}
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-lg font-bold text-gray-900">{order.organization.name}</h1>
          <p className="text-sm text-gray-600">Payment Successful</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. Your order is now confirmed.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-lg font-semibold text-gray-900">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="text-lg font-semibold text-green-600">
                  {formatCurrency(order.total)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-semibold text-green-600">Confirmed</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.totalPrice)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>What&apos;s Next?</strong> Your order is being prepared. You&apos;ll receive a confirmation email shortly.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.print()}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H9a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2z"
                />
              </svg>
              Print Receipt
            </button>

            <Link
              href="/"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order or payment, please don&apos;t hesitate to contact us.
          </p>
          <a
            href="mailto:support@ordaro.com"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
          >
            Contact Support →
          </a>
        </div>
      </main>
    </div>
  );
}
