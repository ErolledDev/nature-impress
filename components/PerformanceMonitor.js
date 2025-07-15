"use client";

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Optimize for mobile performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Basic performance monitoring without external dependencies
    const reportWebVitals = (metric) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}: ${metric.value}`);
      }
      
      // Send to analytics in production
      if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
          custom_map: {
            device_type: isMobile ? 'mobile' : 'desktop'
          }
        });
      }
    };

    // Basic performance monitoring using native APIs
    if (typeof window !== 'undefined' && 'performance' in window && 'PerformanceObserver' in window) {
      try {
        // Monitor LCP
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          reportWebVitals({
            name: 'LCP',
            value: lastEntry.startTime,
            id: 'lcp-' + Date.now()
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP monitoring not supported
      }

      try {
        // Monitor FID
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            reportWebVitals({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              id: 'fid-' + Date.now()
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // FID monitoring not supported
      }

      try {
        // Monitor CLS
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          reportWebVitals({
            name: 'CLS',
            value: clsValue,
            id: 'cls-' + Date.now()
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS monitoring not supported
      }
    }
  }, []);

  return null; // This component doesn't render anything
}