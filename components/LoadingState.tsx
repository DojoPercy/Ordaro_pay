'use client';

import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export default function LoadingState() {
  const skeletonVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full border border-indigo-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Skeleton */}
        <motion.div 
          className="mb-6 pb-6 border-b border-slate-200"
          variants={containerVariants}
          animate="animate"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-100 rounded-full"
              variants={skeletonVariants}
            />
            <div className="flex-1 space-y-2">
              <motion.div 
                className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded"
                variants={skeletonVariants}
              />
              <motion.div 
                className="h-3 bg-slate-100 rounded w-2/3"
                variants={skeletonVariants}
              />
            </div>
          </div>
        </motion.div>

        {/* Order Items Skeleton */}
        <motion.div 
          className="space-y-4 mb-6"
          variants={containerVariants}
          animate="animate"
        >
          <motion.div 
            className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 rounded"
            variants={skeletonVariants}
          />
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i} 
              className="space-y-2"
              variants={containerVariants}
            >
              <motion.div 
                className="h-4 bg-slate-100 rounded"
                variants={skeletonVariants}
              />
              <motion.div 
                className="h-3 bg-slate-100 rounded w-2/3"
                variants={skeletonVariants}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Total Skeleton */}
        <motion.div 
          className="pt-4 border-t border-slate-200 space-y-2"
          variants={containerVariants}
          animate="animate"
        >
          <div className="flex justify-between">
            <motion.div 
              className="h-4 bg-slate-200 rounded w-1/3"
              variants={skeletonVariants}
            />
            <motion.div 
              className="h-4 bg-slate-200 rounded w-1/4"
              variants={skeletonVariants}
            />
          </div>
          <div className="flex justify-between">
            <motion.div 
              className="h-5 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-1/3"
              variants={skeletonVariants}
            />
            <motion.div 
              className="h-5 bg-gradient-to-r from-slate-200 to-slate-100 rounded w-1/4"
              variants={skeletonVariants}
            />
          </div>
        </motion.div>

        {/* Button Skeleton */}
        <motion.div 
          className="mt-6 h-12 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg"
          variants={skeletonVariants}
          animate="animate"
        />

        {/* Loading Message */}
        <motion.div 
          className="mt-6 text-center flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Loader className="w-5 h-5 text-[#0066FF]" />
          </motion.div>
          <p className="text-slate-600 text-sm font-medium">Loading order details...</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
