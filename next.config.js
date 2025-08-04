/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  // Disable source maps in production to save memory
  productionBrowserSourceMaps: false,
  
  // Remove deprecated swcMinify - it's default in Next.js 15
  
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