
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight, RefreshCw, Lock } from 'lucide-react';
import { EncryptionService } from '@/lib/encryption';
import { useGetOrder } from '@/hooks/useOrder';
import OrderSummary from './OrderSummary';
import OrganizationHeader from './OrganizationHeader';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const encryptedOrderId = searchParams.get('orderId') || '';
  const [orderId, setOrderId] = useState<string | null>(null);
  const [decryptionError, setDecryptionError] = useState<string | null>(null);

  // Decrypt orderId from URL
  useEffect(() => {
    try {
      if (!encryptedOrderId) {
        setDecryptionError('Order ID not found in URL');
        return;
      }

      if (!EncryptionService.isValidEncrypted(encryptedOrderId)) {
        setDecryptionError('Invalid order ID format');
        return;
      }

      const decrypted = EncryptionService.decrypt(encryptedOrderId);
      setOrderId(decrypted);
      setDecryptionError(null);
    } catch (error) {
      console.error('Decryption error:', error);
      setDecryptionError('Failed to decrypt order ID. Please try again.');
    }
  }, [encryptedOrderId]);

  // Fetch order details
  const { data: order, isLoading, error, refetch } = useGetOrder(orderId);

  if (decryptionError) {
    return (
      <ErrorState
        title="Invalid Order"
        message={decryptionError}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!orderId) {
    return (
      <ErrorState
        title="Order Not Found"
        message="Unable to find order information. Please check your QR code and try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Order"
        message={error?.message || 'An error occurred while loading order details.'}
        onRetry={() => refetch()}
      />
    );
  }

  if (!order) {
    return (
      <ErrorState
        title="Order Not Found"
        message="The order could not be found. Please check your QR code and try again."
        onRetry={() => refetch()}
      />
    );
  }

  // Check if already paid
  if (order.paymentStatus === 'PAYMENT_COMPLETED') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-emerald-100"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.div 
            className="mb-6 flex justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="relative w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </motion.div>
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold font-heading text-slate-900 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Order Already Paid
          </motion.h1>
          <motion.p 
            className="text-slate-600 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            This order has already been paid. No further payment is needed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href={`/success/${order.id}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              View Order Details
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Organization Header */}
      <OrganizationHeader organization={order.organization} />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.nav 
          className="mb-8 text-sm text-slate-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ol className="flex items-center space-x-2">
            <li>Payment</li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-semibold">Order Details</li>
          </ol>
        </motion.nav>

        {/* Order Summary Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-indigo-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ boxShadow: '0 20px 25px -5px rgba(0, 102, 255, 0.1)' }}
        >
          <h2 className="text-xl font-bold font-heading text-slate-900 mb-6">Order Summary</h2>
          <OrderSummary order={order} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={`/checkout/${order.id}`}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#0066FF] to-indigo-600 hover:shadow-lg text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              Proceed to Payment
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.button
            onClick={() => refetch()}
            className="flex-1 border-2 border-slate-300 hover:border-[#0066FF] text-slate-700 hover:text-[#0066FF] font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02, borderColor: '#0066FF' }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </motion.button>
        </motion.div>

        {/* Info Section */}
        <motion.div 
          className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4 flex items-start gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ borderColor: '#0066FF' }}
        >
          <Lock className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700">
            <strong className="text-slate-900">Secure Payment:</strong> Your payment information is encrypted and processed securely through Paystack.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
