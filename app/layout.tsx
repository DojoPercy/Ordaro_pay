'use client';

import Image from 'next/image';
import { Barlow } from 'next/font/google';
import { motion } from 'framer-motion';
import { Shield, Mail, MessageCircle, Phone, Lock, CheckCircle2 } from 'lucide-react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';
import '@/styles/fonts.css';
import '@/styles/globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0066FF" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={`${barlow.variable} font-barlow bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900`}>
        <QueryClientProvider client={queryClient}>
          {/* Premium Header */}
          <motion.header 
            className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100/30 shadow-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className="relative w-10 h-10 rounded-lg  p-1.5 flex items-center justify-center shadow-md"
                    whileHover={{ rotate: 5 }}
                  >
                    <Image
                      src="/logo.png"
                      alt="Ordaro"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <div>
                    <h1 className="text-xl font-bold font-heading bg-gradient-to-r from-[#0066FF] to-indigo-700 bg-clip-text text-transparent">
                      Ordaro Pay
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">Secure Payments</p>
                  </div>
                </motion.div>
                
                {/* Trust Badge */}
                <motion.div 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </motion.div>
                  <span className="text-xs font-semibold text-emerald-700">SSL Secured</span>
                </motion.div>
              </div>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Premium Footer */}
          <motion.footer 
            className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Company Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src="/logo.png"
                      alt="Ordaro"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <span className="font-bold text-lg">Ordaro</span>
                  </div>
                  <p className="text-sm text-slate-300">Fast, secure, and reliable payment processing for your orders.</p>
                </motion.div>
                
                {/* Security Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    Security
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-indigo-400" />
                      SSL Encrypted
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      PCI Compliant
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-indigo-400" />
                      Fraud Protection
                    </li>
                  </ul>
                </motion.div>
                
                {/* Support */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-indigo-400" />
                    Support
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-indigo-400" />
                      support@ordaro.com
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageCircle className="w-3 h-3 text-indigo-400" />
                      24/7 Chat Support
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-indigo-400" />
                      +1 (555) 123-4567
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              <motion.div 
                className="border-t border-indigo-800/50 pt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-slate-400">© 2025 Ordaro. All rights reserved.</p>
                  <div className="flex gap-6 text-sm text-slate-400">
                    <motion.a 
                      href="#" 
                      className="hover:text-indigo-300 transition"
                      whileHover={{ x: 2 }}
                    >
                      Privacy Policy
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="hover:text-indigo-300 transition"
                      whileHover={{ x: 2 }}
                    >
                      Terms of Service
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="hover:text-indigo-300 transition"
                      whileHover={{ x: 2 }}
                    >
                      Contact
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.footer>
        </QueryClientProvider>
      </body>
    </html>
  );
}
