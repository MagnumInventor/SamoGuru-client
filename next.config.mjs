// next.config.mjs - заміни вміст файлу
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Статичний експорт для production
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Базовий шлях для API (якщо потрібно)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? '' // Той самий домен в продакшені
      : 'http://localhost:5000'
  },
  
  // Вимкнути оптимізацію зображень для статичного експорту
  images: {
    unoptimized: true
  },
  
  // Налаштування для trailing slash
  trailingSlash: true,
  
  // Вимкнути strict mode якщо є конфлікти
  reactStrictMode: false,
};

export default nextConfig;