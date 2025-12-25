'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl border border-indigo-100 p-8 md:p-12">
          {/* Error Icon */}
          <motion.div 
            className="flex justify-center mb-8"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="relative w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-amber-600" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-heading text-center text-slate-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            404
          </motion.h1>

          {/* Subheading */}
          <motion.h2 
            className="text-2xl font-bold font-heading text-center text-slate-700 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Page Not Found
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-center text-slate-600 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            The page you're looking for doesn't exist or has been moved. This could be due to an invalid payment link, expired order, or incorrect URL.
          </motion.p>

          {/* About Ordaro Pay */}
          <motion.div 
            className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h3 className="font-bold font-heading text-slate-900 mb-3">About Ordaro Pay</h3>
            <p className="text-sm text-slate-700 mb-3">
              Ordaro Pay is a secure, fast, and reliable payment processing service designed for restaurants and food service businesses. We provide seamless QR code-based payment solutions integrated with Paystack to ensure smooth transactions for your customers.
            </p>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#0066FF] font-bold">✓</span>
                <span><strong>Secure Payments:</strong> AES-256 encryption and PCI compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0066FF] font-bold">✓</span>
                <span><strong>Fast Processing:</strong> Real-time payment verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0066FF] font-bold">✓</span>
                <span><strong>Mobile Optimized:</strong> Works seamlessly on all devices</span>
              </li>
            </ul>
          </motion.div>

          {/* Legal & Compliance */}
          <motion.div 
            className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="font-bold font-heading text-slate-900 mb-3">Legal & Compliance</h3>
            <p className="text-xs text-slate-600 mb-3">
              Ordaro Pay operates under strict compliance with international payment regulations including PCI DSS, GDPR, and local data protection laws. All transactions are encrypted and processed securely through Paystack, a certified payment processor.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> PCI DSS Compliant
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> GDPR Compliant
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> SSL Encrypted
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> Data Protected
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> Fraud Prevention
              </div>
              <div className="flex items-center gap-1">
                <span className="text-emerald-600 font-bold">✓</span> Secure Webhooks
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066FF] to-indigo-600 hover:shadow-lg text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <a
              href="mailto:support@ordaro.com"
              className="flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-[#0066FF] text-slate-700 hover:text-[#0066FF] font-semibold py-3 px-6 rounded-lg transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </a>
          </motion.div>

          {/* Footer Info */}
          <motion.div 
            className="mt-8 pt-8 border-t border-slate-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-xs text-slate-500 mb-3">
              If you believe this is an error or need assistance with a payment, please reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs text-slate-500">
              <a href="#" className="hover:text-[#0066FF] transition">Privacy Policy</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-[#0066FF] transition">Terms of Service</a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-[#0066FF] transition">Security</a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}