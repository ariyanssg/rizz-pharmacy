import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ className = '', variant = 'default', ...props }) => {
  const baseClasses = "bg-global-8 rounded animate-pulse";
  
  const variants = {
    default: "h-4 w-full",
    text: "h-4 w-3/4",
    title: "h-6 w-1/2",
    circle: "w-12 h-12 rounded-full",
    avatar: "w-10 h-10 rounded-full",
    button: "h-10 w-24 rounded-lg",
    card: "h-48 w-full rounded-xl",
    image: "aspect-square w-full rounded-lg"
  };

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    />
  );
};

// Product Card Skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-global-5 rounded-2xl p-6 h-80">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <SkeletonLoader variant="button" className="mb-2" />
          <SkeletonLoader variant="title" className="mb-2" />
          <SkeletonLoader variant="text" />
        </div>
        <SkeletonLoader className="w-20 h-20 ml-4" />
      </div>
      <div className="mt-auto">
        <SkeletonLoader className="h-12 w-full" />
      </div>
    </div>
  );
};

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

// Search Results Skeleton
export const SearchResultsSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center gap-4 p-3 bg-global-5 rounded-lg">
          <SkeletonLoader className="w-12 h-12 rounded-lg" />
          <div className="flex-1">
            <SkeletonLoader variant="text" className="mb-2" />
            <SkeletonLoader variant="text" className="w-1/2" />
          </div>
          <SkeletonLoader variant="button" />
        </div>
      ))}
    </div>
  );
};

// Category Card Skeleton
export const CategoryCardSkeleton = () => {
  return (
    <div className="bg-global-5 rounded-3xl p-8 h-80 lg:h-96">
      <div className="flex justify-between items-start h-full">
        <div className="flex-1">
          <SkeletonLoader variant="title" className="mb-4" />
          <SkeletonLoader variant="text" />
        </div>
        <SkeletonLoader className="w-52 h-52 ml-4" />
      </div>
    </div>
  );
};

// Header Skeleton
export const HeaderSkeleton = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <SkeletonLoader className="w-20 h-24" />
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 items-center">
              {[...Array(5)].map((_, i) => (
                <SkeletonLoader key={i} variant="text" className="w-16" />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <SkeletonLoader variant="button" />
              <SkeletonLoader variant="button" />
              <SkeletonLoader variant="circle" className="w-7 h-7" />
            </div>
          </div>
          <SkeletonLoader className="lg:hidden w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

// Page Loading Skeleton
export const PageLoadingSkeleton = () => {
  return (
    <div className="w-full bg-global-2 min-h-screen">
      <HeaderSkeleton />
      <div className="pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SkeletonLoader variant="title" className="h-12 w-1/2 mx-auto mb-6" />
            <SkeletonLoader variant="text" className="h-6 w-3/4 mx-auto" />
          </div>
          <ProductGridSkeleton />
        </div>
      </div>
    </div>
  );
};

// Product Detail Skeleton
export const ProductDetailSkeleton = () => {
  return (
    <div className="w-full bg-global-2 min-h-screen">
      <HeaderSkeleton />
      <div className="pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SkeletonLoader className="aspect-square w-full rounded-2xl" />
            <div className="space-y-6">
              <SkeletonLoader variant="button" className="w-32" />
              <SkeletonLoader variant="title" className="h-8 w-3/4" />
              <SkeletonLoader variant="text" className="w-1/2" />
              <SkeletonLoader variant="title" className="h-8 w-1/4" />
              <div className="space-y-2">
                <SkeletonLoader variant="text" />
                <SkeletonLoader variant="text" />
                <SkeletonLoader variant="text" className="w-3/4" />
              </div>
              <div className="flex space-x-4">
                <SkeletonLoader variant="button" className="flex-1 h-12" />
                <SkeletonLoader variant="button" className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
