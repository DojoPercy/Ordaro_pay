'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw, Mail } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
  showContactSupport?: boolean;
}

export default function ErrorState({
  title,
  message,
  onRetry,
  showContactSupport = true,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-red-100"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Error Icon */}
        <motion.div 
          className="mb-6 flex justify-center"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="relative w-20 h-20 bg-red-100 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle className="w-10 h-10 text-red-600" />
          </motion.div>
        </motion.div>

        {/* Error Title */}
        <motion.h1 
          className="text-2xl font-bold font-heading text-slate-900 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h1>

        {/* Error Message */}
        <motion.p 
          className="text-slate-600 mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {message}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {onRetry && (
            <motion.button
              onClick={onRetry}
              className="w-full bg-gradient-to-r from-[#0066FF] to-indigo-600 hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </motion.button>
          )}

          {showContactSupport && (
            <motion.a
              href="mailto:support@ordaro.com"
              className="block w-full border-2 border-slate-300 hover:border-[#0066FF] text-slate-700 hover:text-[#0066FF] font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02, borderColor: '#0066FF' }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </motion.a>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div 
          className="mt-6 pt-6 border-t border-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-xs text-slate-500">
            Error Code: {new Date().getTime().toString().slice(-6)}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
