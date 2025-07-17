import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  placeholder = '/images/placeholder.png',
  lazy = true,
  quality = 'auto',
  sizes,
  priority = false,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  // Generate optimized src based on quality and size
  const getOptimizedSrc = (originalSrc) => {
    // In a real app, you might use a service like Cloudinary or ImageKit
    // For now, we'll just return the original src
    return originalSrc;
  };

  const imageSrc = isInView ? getOptimizedSrc(src) : placeholder;

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading state */}
      {!isLoaded && isInView && (
        <motion.div
          className="absolute inset-0 bg-global-8 animate-pulse"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-global-8 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-8 h-8 text-global-1 opacity-50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-global-1 opacity-50">Failed to load</span>
          </div>
        </div>
      )}

      {/* Main image */}
      {isInView && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          sizes={sizes}
          {...props}
        />
      )}

      {/* Loading overlay */}
      {isInView && !isLoaded && !hasError && (
        <motion.div
          className="absolute inset-0 bg-global-8 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-6 h-6 border-2 border-button-2 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </div>
  );
};

// Preset components for common use cases
export const ProductImage = ({ src, alt, className = '', ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`aspect-square ${className}`}
    lazy={true}
    quality="high"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...props}
  />
);

export const HeroImage = ({ src, alt, className = '', ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={className}
    lazy={false}
    priority={true}
    quality="high"
    sizes="100vw"
    {...props}
  />
);

export const ThumbnailImage = ({ src, alt, className = '', ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`w-16 h-16 ${className}`}
    lazy={true}
    quality="medium"
    sizes="64px"
    {...props}
  />
);

export const CategoryImage = ({ src, alt, className = '', ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={className}
    lazy={true}
    quality="high"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...props}
  />
);

// Image preloader utility
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Batch image preloader
export const preloadImages = async (srcArray) => {
  try {
    const promises = srcArray.map(src => preloadImage(src));
    return await Promise.all(promises);
  } catch (error) {
    console.warn('Some images failed to preload:', error);
    return [];
  }
};

export default OptimizedImage;
