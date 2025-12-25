'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Lock, CheckCircle2, AlertCircle, Eye, Zap, ShieldCheck, FileText } from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'AES-256 Encryption',
      description: 'Military-grade encryption for all sensitive data in transit and at rest',
    },
    {
      icon: Shield,
      title: 'PCI DSS Compliance',
      description: 'Level 1 PCI DSS certified for secure payment processing',
    },
    {
      icon: CheckCircle2,
      title: 'SSL/TLS Protocol',
      description: 'All connections secured with latest SSL/TLS encryption standards',
    },
    {
      icon: Eye,
      title: 'Regular Audits',
      description: 'Third-party security audits conducted quarterly',
    },
    {
      icon: AlertCircle,
      title: 'Fraud Detection',
      description: 'Advanced machine learning algorithms to detect and prevent fraud',
    },
    {
      icon: Zap,
      title: '99.9% Uptime',
      description: 'Redundant infrastructure with automatic failover',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="text-[#0066FF] hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold font-heading text-slate-900 mb-8">Security & Compliance</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            At Ordaro Pay, security is our top priority. We implement industry-leading security practices to protect your data and transactions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="border border-indigo-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#0066FF]" />
                    </div>
                    <div>
                      <h3 className="font-bold font-heading text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Data Protection</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We employ multiple layers of security to protect your data:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li>• <strong>Encryption at Rest:</strong> All data stored in our database is encrypted using AES-256</li>
              <li>• <strong>Encryption in Transit:</strong> All data transmitted is encrypted using TLS 1.3</li>
              <li>• <strong>Access Control:</strong> Role-based access control with principle of least privilege</li>
              <li>• <strong>Audit Logging:</strong> All access and modifications are logged and monitored</li>
              <li>• <strong>Data Isolation:</strong> Customer data is isolated and segregated</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Compliance Standards</h2>
            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-[#0066FF] pl-4">
                <h3 className="font-bold text-slate-900 mb-2">PCI DSS Level 1</h3>
                <p className="text-slate-600">
                  We are certified as a Level 1 PCI DSS compliant service provider, meeting the highest standards for payment card security.
                </p>
              </div>
              <div className="border-l-4 border-[#0066FF] pl-4">
                <h3 className="font-bold text-slate-900 mb-2">GDPR Compliant</h3>
                <p className="text-slate-600">
                  We comply with the General Data Protection Regulation (GDPR) and provide tools for data subject rights requests.
                </p>
              </div>
              <div className="border-l-4 border-[#0066FF] pl-4">
                <h3 className="font-bold text-slate-900 mb-2">ISO 27001</h3>
                <p className="text-slate-600">
                  Our information security management system is certified to ISO 27001 standards.
                </p>
              </div>
              <div className="border-l-4 border-[#0066FF] pl-4">
                <h3 className="font-bold text-slate-900 mb-2">SOC 2 Type II</h3>
                <p className="text-slate-600">
                  We maintain SOC 2 Type II compliance, demonstrating our commitment to security, availability, and confidentiality.
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-slate-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-slate-900 mb-4">Trusted Partners</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Paystack Badge */}
                <motion.div
                  className="bg-white rounded-lg p-4 shadow-md border border-slate-200 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="/paystack-logo.svg"
                    alt="Paystack"
                    width={80}
                    height={32}
                    className="mx-auto mb-2"
                  />
                  <p className="text-xs text-slate-600 font-semibold">Certified Processor</p>
                </motion.div>

                {/* PCI DSS Badge */}
                <motion.div
                  className="bg-white rounded-lg p-4 shadow-md border border-slate-200 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ShieldCheck className="w-6 h-6 text-[#0066FF] mx-auto mb-1" />
                  <p className="text-xs font-bold text-[#0066FF] mb-1">PCI DSS</p>
                  <p className="text-xs text-slate-600">Level 1</p>
                </motion.div>

                {/* GDPR Badge */}
                <motion.div
                  className="bg-white rounded-lg p-4 shadow-md border border-slate-200 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <FileText className="w-6 h-6 text-[#0066FF] mx-auto mb-1" />
                  <p className="text-xs font-bold text-[#0066FF] mb-1">GDPR</p>
                  <p className="text-xs text-slate-600">Compliant</p>
                </motion.div>

                {/* SSL Badge */}
                <motion.div
                  className="bg-white rounded-lg p-4 shadow-md border border-slate-200 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Lock className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-emerald-600 mb-1">SSL</p>
                  <p className="text-xs text-slate-600">256-bit</p>
                </motion.div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Fraud Prevention</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use advanced machine learning algorithms and behavioral analysis to detect and prevent fraudulent transactions:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li>• Real-time transaction monitoring and anomaly detection</li>
              <li>• Velocity checks to identify suspicious patterns</li>
              <li>• Device fingerprinting and geolocation verification</li>
              <li>• Integration with fraud prevention databases</li>
              <li>• 3D Secure authentication for high-risk transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Incident Response</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We maintain a comprehensive incident response plan:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li>• 24/7 security monitoring and threat detection</li>
              <li>• Rapid incident response team (response time &lt; 1 hour)</li>
              <li>• Regular security incident drills and simulations</li>
              <li>• Transparent communication with affected customers</li>
              <li>• Post-incident analysis and continuous improvement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Vulnerability Management</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We maintain a proactive approach to security:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li>• Regular penetration testing by third-party security firms</li>
              <li>• Continuous vulnerability scanning and assessment</li>
              <li>• Bug bounty program for responsible disclosure</li>
              <li>• Prompt patching of identified vulnerabilities</li>
              <li>• Security training for all staff members</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">Report a Security Issue</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you discover a security vulnerability, please report it responsibly to:
            </p>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-slate-700">
                <strong>Email:</strong> security@ordaro.com<br />
                <strong>PGP Key:</strong> Available upon request<br />
                <strong>Response Time:</strong> Within 24 hours
              </p>
            </div>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">Last Updated: December 25, 2025</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
