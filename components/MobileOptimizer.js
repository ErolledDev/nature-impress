"use client";

import { useEffect } from 'react';

export default function MobileOptimizer() {
  useEffect(() => {
    // Mobile-specific optimizations
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Reduce animation duration on mobile
      const style = document.createElement('style');
      style.textContent = `
        * {
          animation-duration: 0.2s !important;
          transition-duration: 0.15s !important;
        }
        
        /* Optimize touch interactions */
        button, a, [role="button"] {
          touch-action: manipulation;
        }
        
        /* Improve scroll performance */
        * {
          -webkit-overflow-scrolling: touch;
        }
      `;
      document.head.appendChild(style);
      
      // Optimize viewport for mobile
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no');
      }
    }
    
    // Preload critical resources
    const preloadFont = (href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = 'font/otf';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };
    
    // Only preload fonts if not already preloaded
    if (!document.querySelector('link[href="/fonts/Inter-Regular.otf"]')) {
      preloadFont('/fonts/Inter-Regular.otf');
    }
    if (!document.querySelector('link[href="/fonts/Inter-Bold.otf"]')) {
      preloadFont('/fonts/Inter-Bold.otf');
    }
    
    // Optimize images loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: isMobile ? '50px' : '100px'
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
    
  }, []);

  return null; // This component doesn't render anything
}