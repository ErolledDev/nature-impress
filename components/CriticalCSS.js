"use client";

import { useEffect } from 'react';

export default function CriticalCSS() {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalCSS = `
      /* Critical styles for immediate rendering */
      .hero-section {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .nav-container {
        position: sticky;
        top: 0;
        z-index: 50;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
      }
      
      .post-card {
        transform: translateZ(0);
        will-change: transform;
      }
      
      .post-image {
        content-visibility: auto;
        contain-intrinsic-size: 300px 200px;
      }
      
      /* Reduce motion for better performance */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* Mobile optimizations */
      @media (max-width: 768px) {
        .post-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .hero-title {
          font-size: 2rem;
          line-height: 1.2;
        }
        
        .hero-description {
          font-size: 1rem;
          line-height: 1.5;
        }
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}