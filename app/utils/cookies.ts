// Cookie management utility functions

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const setCookie = (name: string, value: string, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const hasCookieConsent = (): boolean => {
  return localStorage.getItem('cookieConsent') === 'true';
};

export const setSecurityCookie = () => {
  if (hasCookieConsent()) {
    // Set security-related cookies with appropriate attributes
    document.cookie = "cookieConsent=true; path=/; max-age=31536000; SameSite=Strict";
    // You can add other necessary security cookies here
  }
};
