/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "firebasestorage.googleapis.com" }
    ]
  }
};

module.exports = nextConfig;
