"use client";

import { useEffect, useRef } from 'react';

export default function ValineComments({ postSlug }) {
  const valineRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once per component mount
    if (isInitialized.current) return;

    // Add minimum height to prevent layout shift
    if (valineRef.current) {
      valineRef.current.style.minHeight = '200px';
    }
    const initValine = async () => {
      try {
        // Dynamically import Valine
        const Valine = (await import('valine')).default;
        
        // Get environment variables
        const appId = process.env.NEXT_PUBLIC_VALINE_APP_ID;
        const appKey = process.env.NEXT_PUBLIC_VALINE_APP_KEY;
        const serverURLs = process.env.NEXT_PUBLIC_VALINE_SERVER_URLS;

        if (!appId || !appKey) {
          console.warn('Valine configuration missing. Please check your environment variables.');
          return;
        }

        // Clear any existing content
        if (valineRef.current) {
          valineRef.current.innerHTML = '';
        }

        // Initialize Valine with LeanCloud configuration
        new Valine({
          el: valineRef.current,
          appId: appId,
          appKey: appKey,
          serverURLs: serverURLs,
          path: `/post/${postSlug}/`, // Unique path for each post
          placeholder: 'Share your thoughts about this nature story...',
          avatar: 'retro',
          visitor: true, // Enable visitor count
          highlight: true,
          recordIP: false,
          enableQQ: false,
          requiredFields: ['nick', 'mail'],
          lang: 'en',
          meta: ['nick', 'mail'],
          pageSize: 10,
          adminEmailMd5: '', // Add your admin email MD5 if needed
        });

        isInitialized.current = true;
      } catch (error) {
        console.error('Failed to load Valine:', error);
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(initValine, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [postSlug]);

  // Reset initialization when postSlug changes
  useEffect(() => {
    isInitialized.current = false;
  }, [postSlug]);

  return (
    <div className="mt-12 sm:mt-16">
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 sm:pt-12">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 sm:mb-8">
          Comments & Discussion
        </h3>
        <div 
          ref={valineRef}
          id={`valine-comments-${postSlug}`}
          className="valine-container"
          style={{ minHeight: '200px' }}
        />
      </div>
      
      <style jsx global>{`
        .valine-container .vwrap {
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1rem;
          background: #ffffff;
          transition: border-color 0.2s ease;
        }
        
        .dark .valine-container .vwrap {
          border-color: #374151;
          background: #1f2937;
        }
        
        .valine-container .vwrap:focus-within {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }
        
        .valine-container .vwrap .vedit {
          background: transparent;
          border: none;
          color: #374151;
          font-size: 0.875rem;
          line-height: 1.5;
          resize: vertical;
          min-height: 120px;
        }
        
        .dark .valine-container .vwrap .vedit {
          color: #d1d5db;
        }
        
        .valine-container .vwrap .vedit:focus {
          outline: none;
        }
        
        .valine-container .vwrap .vctrl {
          padding-top: 0.75rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 0.75rem;
        }
        
        .dark .valine-container .vwrap .vctrl {
          border-top-color: #374151;
        }
        
        .valine-container .vwrap .vctrl .vsubmit {
          background: #059669;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .valine-container .vwrap .vctrl .vsubmit:hover {
          background: #047857;
        }
        
        .valine-container .vwrap .vctrl .vsubmit:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        
        .valine-container .vwrap .vinput {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          background: #ffffff;
          color: #374151;
          transition: border-color 0.2s ease;
        }
        
        .dark .valine-container .vwrap .vinput {
          border-color: #4b5563;
          background: #374151;
          color: #d1d5db;
        }
        
        .valine-container .vwrap .vinput:focus {
          outline: none;
          border-color: #059669;
          box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.1);
        }
        
        .valine-container .vlist .vcard {
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1rem;
          background: #ffffff;
        }
        
        .dark .valine-container .vlist .vcard {
          border-color: #374151;
          background: #1f2937;
        }
        
        .valine-container .vlist .vcard .vhead {
          margin-bottom: 0.75rem;
        }
        
        .valine-container .vlist .vcard .vhead .vnick {
          color: #059669;
          font-weight: 600;
          font-size: 0.875rem;
        }
        
        .dark .valine-container .vlist .vcard .vhead .vnick {
          color: #34d399;
        }
        
        .valine-container .vlist .vcard .vhead .vtime {
          color: #6b7280;
          font-size: 0.75rem;
        }
        
        .dark .valine-container .vlist .vcard .vhead .vtime {
          color: #9ca3af;
        }
        
        .valine-container .vlist .vcard .vcontent {
          color: #374151;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        
        .dark .valine-container .vlist .vcard .vcontent {
          color: #d1d5db;
        }
        
        .valine-container .vlist .vcard .vcontent p {
          margin: 0.5rem 0;
        }
        
        .valine-container .vpage {
          text-align: center;
          margin-top: 2rem;
        }
        
        .valine-container .vpage .vmore {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .dark .valine-container .vpage .vmore {
          background: #374151;
          color: #d1d5db;
          border-color: #4b5563;
        }
        
        .valine-container .vpage .vmore:hover {
          background: #e5e7eb;
          border-color: #9ca3af;
        }
        
        .dark .valine-container .vpage .vmore:hover {
          background: #4b5563;
          border-color: #6b7280;
        }
        
        .valine-container .vempty {
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
          padding: 2rem;
        }
        
        .dark .valine-container .vempty {
          color: #9ca3af;
        }
        
        .valine-container .vloading {
          text-align: center;
          padding: 2rem;
        }
        
        .valine-container .vloading::after {
          content: '';
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          border: 2px solid #e5e7eb;
          border-top-color: #059669;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}