/** @type {import('next').NextConfig} */
const nextConfig = {
  // output; standalone, -> Configure for production deployment (removed 03.08.2025)
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? '' // Same domain in production
      : 'http://localhost:5000'
  },
  
  // Image optimization
  images: {
    unoptimized: true // Disable for static hosting
  },
  
  // Trailing slash configuration
  trailingSlash: true,
  
  // Enable strict mode
  reactStrictMode: true,
  
  // Experimental features (removed 03.08.2025)
};

export default nextConfig;