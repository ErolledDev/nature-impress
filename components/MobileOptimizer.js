"use client";

import { useEffect } from 'react';

export default function MobileOptimizer() {
  useEffect(() => {
    // Mobile-specific optimizations
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Reduce animation duration on mobile for better performance
      const style = document.createElement('style');
      style.textContent = `
        * {
          animation-duration: 0.1s !important;
          transition-duration: 0.1s !important;
        }
        
        /* Optimize touch interactions */
        button, a, [role="button"] {
          touch-action: manipulation;
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Improve scroll performance */
        * {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Reduce motion for better performance */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Optimize images for mobile */
        img {
          content-visibility: auto;
          contain-intrinsic-size: 300px 200px;
        }
        
        /* Improve font rendering */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeSpeed;
        }
      `;
      document.head.appendChild(style);
      
      // Optimize viewport for mobile
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no');
      }
    }
    
    // Preload critical resources with higher priority
    const preloadFont = (href, display = 'swap') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = 'font/otf';
      link.crossOrigin = 'anonymous';
      link.setAttribute('font-display', display);
      document.head.appendChild(link);
    };
    
    // Only preload fonts if not already preloaded
    if (!document.querySelector('link[href="/fonts/Inter-Regular.otf"]')) {
      preloadFont('/fonts/Inter-Regular.otf', 'swap');
    }
    if (!document.querySelector('link[href="/fonts/Inter-Bold.otf"]')) {
      preloadFont('/fonts/Inter-Bold.otf', 'swap');
    }
    
    // Optimize images loading with better intersection observer
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
            // Add loading complete class for better CLS
            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: isMobile ? '20px' : '50px',
        threshold: 0.01
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
    
    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
          script.setAttribute('defer', '');
        }
      });
    };
    
    // Run optimization after a short delay
    setTimeout(optimizeThirdPartyScripts, 100);
    
  }, []);

  return null; // This component doesn't render anything
}