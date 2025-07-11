/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/api/data',
        destination: 'https://ailodi.xyz/cms/data/example.json',
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    unoptimized: true,
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "firebasestorage.googleapis.com" }
    ]
  }
};

module.exports = nextConfig;