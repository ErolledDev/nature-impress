"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false, 
  className = "",
  fill = false,
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Determine if we should use fill or width/height
  const shouldUseFill = fill || (!width && !height);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: !shouldUseFill && width && height ? `${width}/${height}` : undefined,
        backgroundColor: '#f3f4f6' // Placeholder color
      }}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          {...(shouldUseFill ? {
            fill: true
          } : {
            width: width,
            height: height
          })}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={priority ? 90 : 75}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${shouldUseFill ? 'object-cover' : ''}`}
          {...props}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
    </div>
  );
}