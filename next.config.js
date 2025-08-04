/** @type {import('next').NextConfig} */
const nextConfig = {
  // For serving from Express
  trailingSlash: false,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || ''
      : 'http://localhost:5000'
  },
  
  // Image optimization
  images: {
    unoptimized: true
  },
  
  // Enable strict mode
  reactStrictMode: true,
  
  // Memory optimization for build
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // SWC minification
  swcMinify: true,
  
  // Custom rewrites for your routes
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/signup', // Redirect root to signup
      },
    ];
  },
};

export default nextConfig;