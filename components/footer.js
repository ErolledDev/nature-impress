import Container from "@/components/container";
import ThemeSwitch from "@/components/themeSwitch";

export default function Footer(props) {
  return (
    <Container className="mt-16 sm:mt-20 border-t border-gray-100 dark:border-gray-800">
      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 py-6">
        <a
          href="#"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200"
          aria-label="Facebook">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200"
          aria-label="Twitter">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200"
          aria-label="Instagram">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.875-.875-1.365-2.026-1.365-3.323s.49-2.448 1.365-3.323c.875-.926 2.026-1.416 3.323-1.416s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323z"/>
          </svg>
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200"
          aria-label="YouTube">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a
          href="/rss.xml"
          className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200"
          aria-label="RSS Feed">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
          </svg>
        </a>
      </div>

      <div className="text-center text-sm sm:text-base py-8">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      
      {/* Legal Links */}
      <div className="flex justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400 pb-4">
        <a href="/privacy-policy" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
          Privacy Policy
        </a>
        <span>&middot;</span>
        <a href="/terms-of-service" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
          Terms of Service
        </a>
        <span>&middot;</span>
        <a href="/disclaimer" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors duration-200">
          Disclaimer
        </a>
      </div>
      
      <div className="flex justify-center gap-1 text-center text-sm text-gray-500 dark:text-gray-600 mb-4">
        <span>Crafted with love for nature</span>
        <span>&middot;</span>
        <span>Exploring the wild</span>
      </div>
      
      <div className="flex items-center justify-center pb-4">
        <ThemeSwitch />
      </div>
    </Container>
  );
}