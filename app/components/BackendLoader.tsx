import React, { useState, useEffect, ReactNode } from 'react';

interface BackendLoaderProps {
  children: ReactNode;
}

const BackendLoader: React.FC<BackendLoaderProps> = ({ children }) => {
  const [backendStatus, setBackendStatus] = useState('checking'); // checking, loading, ready, error
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Checking server status...');

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend.onrender.com';

  const checkBackend = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        setBackendStatus('ready');
        setProgress(100);
        setMessage('Server ready!');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const initializeBackend = async () => {
      // First check
      const isReady = await checkBackend();
      if (isReady) return;

      // If not ready, show loading and retry
      setBackendStatus('loading');
      setMessage('Starting server... This may take 30-60 seconds');
      
      let attempts = 0;
      const maxAttempts = 12; // 2 minutes total
      
      const retryInterval = setInterval(async () => {
        attempts++;
        const progressPercent = Math.min((attempts / maxAttempts) * 100, 90);
        setProgress(progressPercent);
        
        const isReady = await checkBackend();
        if (isReady) {
          clearInterval(retryInterval);
          return;
        }
        
        if (attempts >= maxAttempts) {
          clearInterval(retryInterval);
          setBackendStatus('error');
          setMessage('Server is taking longer than expected. Please refresh the page.');
        }
      }, 10000); // Check every 10 seconds
      
      return () => clearInterval(retryInterval);
    };

    initializeBackend();
  }, []);

  if (backendStatus === 'ready') {
    return children;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            {backendStatus === 'error' ? (
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {backendStatus === 'error' ? 'Connection Issue' : 'Initializing SamoGuru'}
          </h2>
          
          <p className="text-gray-600 mb-6">{message}</p>
          
          {backendStatus === 'loading' && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          
          {backendStatus === 'error' && (
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Retry
            </button>
          )}
          
          <div className="mt-4 text-xs text-gray-500">
            Free servers need a moment to start up
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendLoader;