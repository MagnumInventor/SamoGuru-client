// next.config.mjs - заміни вміст файлу
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for Render deployment
  // output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Базовий шлях для API (якщо потрібно)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? '' // Той самий домен в продакшені
      : 'http://localhost:5000'
  },
  
  // Enable image optimization for production
  images: {
    unoptimized: false
  },
  
  // Налаштування для trailing slash
  trailingSlash: true,
  
  // Enable strict mode for better development
  reactStrictMode: true,
};

export default nextConfig;