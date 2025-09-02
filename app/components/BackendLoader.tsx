import React, { useState, useEffect, ReactNode } from 'react';

interface BackendLoaderProps {
  children: ReactNode;
}

const BackendLoader: React.FC<BackendLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://samoguru-back.onrender.com';
  const WAIT_TIME = 15000; 

  const wakeupBackend = async () => {
    try {
      fetch(`${BACKEND_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {}); // Silent call, ignore errors
    } catch (error) {
      // Silent fail
    }
  };

  useEffect(() => {
    const initializeBackend = async () => {
      wakeupBackend();
      
      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + (100 / (WAIT_TIME / 100)); // Update every 100ms
        });
      }, 100);
      
      // Wait 15 seconds then show app
      setTimeout(() => {
        setIsLoading(false);
      }, WAIT_TIME);

      return () => clearInterval(progressInterval);
    };

    initializeBackend();
  }, []);

  if (!isLoading) {
    return children;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Запускаємо СамоГуру
          </h2>
          
          <p className="text-gray-600 mb-6">Зачекайте на підняття сервера...</p>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            Це може зайняти до 10 секунд
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendLoader;