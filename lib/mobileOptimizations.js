// Mobile-specific performance optimizations
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const optimizeForMobile = () => {
  if (typeof window === 'undefined') return;
  
  // Reduce animation duration on mobile
  if (isMobile()) {
    const style = document.createElement('style');
    style.textContent = `
      * {
        animation-duration: 0.2s !important;
        transition-duration: 0.15s !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Optimize scroll performance
  if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
  
  // Passive event listeners for better scroll performance
  const addPassiveEventListener = (element, event, handler) => {
    element.addEventListener(event, handler, { passive: true });
  };
  
  // Add passive scroll listeners
  addPassiveEventListener(window, 'scroll', () => {
    // Throttle scroll events on mobile
    if (isMobile()) {
      requestAnimationFrame(() => {
        // Handle scroll events here if needed
      });
    }
  });
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: isMobile() ? '50px' : '100px',
    threshold: 0.1
  };
  
  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  // Preload critical fonts
  const fontPreloads = [
    '/fonts/Inter-Regular.otf',
    '/fonts/Inter-Bold.otf'
  ];
  
  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/otf';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};