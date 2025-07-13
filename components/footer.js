import Container from "@/components/container";
import ThemeSwitch from "@/components/themeSwitch";

export default function Footer(props) {
  return (
    <Container className="mt-16 sm:mt-20 border-t border-gray-100 dark:border-gray-800">
      {/* Social Media Links */}
      <div className="flex justify-center space-x-3 sm:space-x-4 lg:space-x-6 py-4 sm:py-6 lg:py-8">
        <a
          href="#"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200 p-1.5 sm:p-2"
          aria-label="Facebook">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200 p-1.5 sm:p-2"
          aria-label="Twitter">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200 p-1.5 sm:p-2"
          aria-label="Instagram">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200 p-1.5 sm:p-2"
          aria-label="YouTube">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a
          href="/api/rss"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200 p-1.5 sm:p-2"
          aria-label="RSS Feed">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
          </svg>
        </a>
      </div>

      <div className="text-center text-xs sm:text-sm lg:text-base py-4 sm:py-6 lg:py-8 text-gray-600 dark:text-gray-400">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      
      {/* Legal Links */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 pb-3 sm:pb-4 px-4">
        <a href="/privacy-policy" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
          Privacy Policy
        </a>
        <span className="hidden sm:inline">&middot;</span>
        <a href="/terms-of-service" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
          Terms of Service
        </a>
        <span className="hidden sm:inline">&middot;</span>
        <a href="/disclaimer" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
          Disclaimer
        </a>
      </div>
      
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 text-center text-xs text-gray-500 dark:text-gray-600 mb-3 sm:mb-4 px-4">
        <span>Crafted with love for nature</span>
        <span className="hidden sm:inline">&middot;</span>
        <span>Exploring the wild</span>
      </div>
      
      <div className="flex items-center justify-center pb-3 sm:pb-4">
        <ThemeSwitch />
      </div>
    </Container>
  );
}