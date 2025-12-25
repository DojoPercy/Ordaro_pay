'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, BarChart3, Lock, CheckCircle2, Smartphone, ShieldCheck, FileText, Lock as LockIcon } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'AES-256 encryption and PCI DSS compliance for maximum security',
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Real-time payment verification and instant confirmation',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Seamless experience on all devices with responsive design',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track payment metrics and transaction history',
    },
    {
      icon: Lock,
      title: 'GDPR Compliant',
      description: 'Full compliance with international data protection laws',
    },
    {
      icon: CheckCircle2,
      title: 'Reliable',
      description: '99.9% uptime with redundant infrastructure',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-slate-900 mb-6">
              Secure Payment Processing
              <span className="block bg-gradient-to-r from-[#0066FF] to-indigo-600 bg-clip-text text-transparent">
                for Restaurants
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ordaro Pay provides fast, secure, and reliable payment processing with QR code integration. Perfect for restaurants and food service businesses.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link
                href="/pay"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066FF] to-indigo-600 hover:shadow-lg text-white font-semibold py-4 px-8 rounded-lg transition-all"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-[#0066FF] text-slate-700 hover:text-[#0066FF] font-semibold py-4 px-8 rounded-lg transition-all"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"
            animate={{ y: [0, -50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-heading text-slate-900 mb-4">
              Why Choose Ordaro Pay?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Enterprise-grade payment processing designed specifically for the food service industry
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 border border-indigo-100 hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#0066FF]" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Trust Badges Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">
              Trusted by Industry Leaders
            </h2>
            <p className="text-slate-600">Powered by certified payment processors</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
            {/* Paystack Logo */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200">
                <img
                  src="/paystack_logo.png"
                  alt="Paystack"
                  className="w-32 "
                />
              </div>
              <p className="text-sm text-slate-600 text-center font-semibold">
                Certified Payment Processor
              </p>
            </motion.div>

            {/* PCI DSS Badge */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200 w-32 h-20 flex items-center justify-center">
                <div className="text-center">
                  <ShieldCheck className="w-6 h-6 text-[#0066FF] mx-auto mb-1" />
                  <div className="text-xs font-bold text-[#0066FF] mb-1">PCI DSS</div>
                  <div className="text-xs text-slate-600">Level 1</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center font-semibold">
                PCI Compliant
              </p>
            </motion.div>

            {/* GDPR Badge */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200 w-32 h-20 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-6 h-6 text-[#0066FF] mx-auto mb-1" />
                  <div className="text-xs font-bold text-[#0066FF] mb-1">GDPR</div>
                  <div className="text-xs text-slate-600">Compliant</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center font-semibold">
                Data Protection
              </p>
            </motion.div>

            {/* SSL Secure Badge */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200 w-32 h-20 flex items-center justify-center">
                <div className="text-center">
                  <LockIcon className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <div className="text-xs font-bold text-emerald-600 mb-1">SSL</div>
                  <div className="text-xs text-slate-600">256-bit</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center font-semibold">
                Encrypted
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Uptime', value: '99.9%' },
              { label: 'Transactions', value: '1M+' },
              { label: 'Countries', value: '50+' },
              { label: 'Restaurants', value: '10K+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold font-heading text-[#0066FF] mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0066FF] to-indigo-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold font-heading text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-lg text-indigo-100 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of restaurants using Ordaro Pay for secure, fast payment processing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              href="/pay"
              className="inline-flex items-center gap-2 bg-white text-[#0066FF] font-semibold py-4 px-8 rounded-lg hover:shadow-lg transition-all"
            >
              Start Processing Payments
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
