/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Enhanced performance optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react', '@headlessui/react', 'date-fns'],
    optimizeCss: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
    scrollRestoration: true,
    // Enable modern bundling
    esmExternals: true,
    // Optimize server components
    serverComponentsExternalPackages: ['marked']
  },
  
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "firebasestorage.googleapis.com" },
      { hostname: "images.unsplash.com" }
    ]
  },
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable SWC optimizations
    styledComponents: false,
    emotion: false
  },
  
  // Headers for better performance
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;