/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'standalone' - it's for Docker deployments
  // output: 'standalone', // Remove this line
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || '' // Use env var or same domain
      : 'http://localhost:5000'
  },
  
  // Image optimization
  images: {
    unoptimized: true
  },
  
  // Remove trailing slash for better compatibility
  // trailingSlash: true, // Remove this
  
  // Enable strict mode
  reactStrictMode: true,
  
  // Add memory optimization
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  
  // Disable source maps in production to save memory
  productionBrowserSourceMaps: false,
  
  // Optimize for deployment
  swcMinify: true,
};

export default nextConfig;