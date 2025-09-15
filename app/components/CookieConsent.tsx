"use client";

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Shield, Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie consent in localStorage
    localStorage.setItem('cookieConsent', 'true');
    // Set the necessary cookies
    document.cookie = "cookieConsent=true; path=/; max-age=31536000"; // 1 year
    setShowConsent(false);
    // Reload the page to apply cookie settings
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-orange-100 p-2 rounded-full">
            <Cookie className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Ми використовуємо файли cookie 🍪
            </h3>
            <p className="text-gray-600 text-sm">
              Цей веб-сайт використовує файли cookie для забезпечення належної роботи, 
              персоналізації та безпеки вашого облікового запису. Будь ласка, прийміть 
              їх для коректної роботи SamoGuru.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Відхилити
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
          >
            <Shield className="h-4 w-4" />
            Прийняти всі cookie
          </Button>
        </div>
      </div>
    </div>
  );
}
