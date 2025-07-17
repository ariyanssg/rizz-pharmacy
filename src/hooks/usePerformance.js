import { useEffect, useRef, useState, useCallback } from 'react';

// Performance monitoring hook
export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    connectionType: 'unknown'
  });

  const startTime = useRef(performance.now());

  useEffect(() => {
    // Measure initial load time
    const measureLoadTime = () => {
      const loadTime = performance.now() - startTime.current;
      setMetrics(prev => ({ ...prev, loadTime }));
    };

    // Get connection information
    const getConnectionInfo = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        setMetrics(prev => ({ 
          ...prev, 
          connectionType: connection.effectiveType || 'unknown'
        }));
      }
    };

    // Measure memory usage (if available)
    const measureMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = performance.memory;
        setMetrics(prev => ({ 
          ...prev, 
          memoryUsage: memory.usedJSHeapSize / 1024 / 1024 // Convert to MB
        }));
      }
    };

    measureLoadTime();
    getConnectionInfo();
    measureMemoryUsage();

    // Set up periodic memory monitoring
    const memoryInterval = setInterval(measureMemoryUsage, 5000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  const measureRenderTime = useCallback((componentName) => {
    const renderStart = performance.now();
    
    return () => {
      const renderTime = performance.now() - renderStart;
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      setMetrics(prev => ({ ...prev, renderTime }));
    };
  }, []);

  return { metrics, measureRenderTime };
};

// Web Vitals monitoring
export const useWebVitals = () => {
  const [vitals, setVitals] = useState({
    FCP: 0, // First Contentful Paint
    LCP: 0, // Largest Contentful Paint
    FID: 0, // First Input Delay
    CLS: 0, // Cumulative Layout Shift
    TTFB: 0 // Time to First Byte
  });

  useEffect(() => {
    // Measure FCP
    const measureFCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setVitals(prev => ({ ...prev, FCP: fcpEntry.startTime }));
          observer.disconnect();
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    };

    // Measure LCP
    const measureLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setVitals(prev => ({ ...prev, LCP: lastEntry.startTime }));
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // Measure FID
    const measureFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          setVitals(prev => ({ ...prev, FID: entry.processingStart - entry.startTime }));
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    };

    // Measure CLS
    const measureCLS = () => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setVitals(prev => ({ ...prev, CLS: clsValue }));
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // Measure TTFB
    const measureTTFB = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        setVitals(prev => ({ ...prev, TTFB: ttfb }));
      }
    };

    measureFCP();
    measureLCP();
    measureFID();
    measureCLS();
    measureTTFB();
  }, []);

  return vitals;
};

// Resource loading performance
export const useResourcePerformance = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const measureResources = () => {
      const resourceEntries = performance.getEntriesByType('resource');
      const processedResources = resourceEntries.map(entry => ({
        name: entry.name,
        type: entry.initiatorType,
        size: entry.transferSize,
        duration: entry.duration,
        startTime: entry.startTime
      }));
      setResources(processedResources);
    };

    // Initial measurement
    measureResources();

    // Set up observer for new resources
    const observer = new PerformanceObserver((list) => {
      measureResources();
    });
    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  const getResourcesByType = useCallback((type) => {
    return resources.filter(resource => resource.type === type);
  }, [resources]);

  const getTotalSize = useCallback(() => {
    return resources.reduce((total, resource) => total + (resource.size || 0), 0);
  }, [resources]);

  const getSlowResources = useCallback((threshold = 1000) => {
    return resources.filter(resource => resource.duration > threshold);
  }, [resources]);

  return {
    resources,
    getResourcesByType,
    getTotalSize,
    getSlowResources
  };
};

// Bundle size analyzer
export const useBundleAnalysis = () => {
  const [bundleInfo, setBundleInfo] = useState({
    totalSize: 0,
    gzippedSize: 0,
    chunks: []
  });

  useEffect(() => {
    // This would typically integrate with webpack-bundle-analyzer or similar
    // For now, we'll estimate based on loaded resources
    const estimateBundleSize = () => {
      const jsResources = performance.getEntriesByType('resource')
        .filter(entry => entry.name.endsWith('.js'));
      
      const totalSize = jsResources.reduce((total, resource) => 
        total + (resource.transferSize || 0), 0);

      setBundleInfo(prev => ({
        ...prev,
        totalSize,
        chunks: jsResources.map(resource => ({
          name: resource.name.split('/').pop(),
          size: resource.transferSize || 0,
          loadTime: resource.duration
        }))
      }));
    };

    estimateBundleSize();
  }, []);

  return bundleInfo;
};

// Performance recommendations
export const usePerformanceRecommendations = () => {
  const vitals = useWebVitals();
  const { metrics } = usePerformance();
  const { getTotalSize, getSlowResources } = useResourcePerformance();

  const getRecommendations = useCallback(() => {
    const recommendations = [];

    // FCP recommendations
    if (vitals.FCP > 2500) {
      recommendations.push({
        type: 'FCP',
        severity: 'high',
        message: 'First Contentful Paint is slow. Consider optimizing critical resources.',
        suggestions: [
          'Minimize render-blocking resources',
          'Optimize images and fonts',
          'Use resource hints (preload, prefetch)'
        ]
      });
    }

    // LCP recommendations
    if (vitals.LCP > 4000) {
      recommendations.push({
        type: 'LCP',
        severity: 'high',
        message: 'Largest Contentful Paint is slow. Optimize your largest element.',
        suggestions: [
          'Optimize images and videos',
          'Preload important resources',
          'Minimize server response times'
        ]
      });
    }

    // FID recommendations
    if (vitals.FID > 300) {
      recommendations.push({
        type: 'FID',
        severity: 'medium',
        message: 'First Input Delay is high. Reduce JavaScript execution time.',
        suggestions: [
          'Break up long tasks',
          'Use code splitting',
          'Defer non-critical JavaScript'
        ]
      });
    }

    // CLS recommendations
    if (vitals.CLS > 0.25) {
      recommendations.push({
        type: 'CLS',
        severity: 'high',
        message: 'Cumulative Layout Shift is high. Stabilize your layout.',
        suggestions: [
          'Set dimensions for images and videos',
          'Reserve space for dynamic content',
          'Avoid inserting content above existing content'
        ]
      });
    }

    // Bundle size recommendations
    const totalSize = getTotalSize();
    if (totalSize > 1024 * 1024) { // 1MB
      recommendations.push({
        type: 'BUNDLE_SIZE',
        severity: 'medium',
        message: 'Bundle size is large. Consider code splitting.',
        suggestions: [
          'Implement lazy loading',
          'Remove unused dependencies',
          'Use dynamic imports'
        ]
      });
    }

    // Slow resources
    const slowResources = getSlowResources();
    if (slowResources.length > 0) {
      recommendations.push({
        type: 'SLOW_RESOURCES',
        severity: 'medium',
        message: `${slowResources.length} resources are loading slowly.`,
        suggestions: [
          'Optimize image sizes',
          'Use a CDN',
          'Enable compression'
        ]
      });
    }

    return recommendations;
  }, [vitals, metrics, getTotalSize, getSlowResources]);

  return { recommendations: getRecommendations() };
};

export default usePerformance;
