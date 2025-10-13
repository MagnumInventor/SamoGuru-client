"use client"

import { useEffect } from 'react';

interface AutoRefreshProps {
  intervalMinutes?: number; 
  enabled?: boolean; 
}

export default function AutoRefresh({ 
  intervalMinutes = 10, 
  enabled = true 
}: AutoRefreshProps) {
  
  useEffect(() => {
    if (!enabled) return;

    const intervalMs = intervalMinutes * 60 * 1000;
    
    const timer = setTimeout(() => {
      console.log(`AutoRefresh: Перезавантаження сторінки через ${intervalMinutes} хвилин`);
      window.location.reload();
    }, intervalMs);

    return () => {
      clearTimeout(timer);
    };
  }, [intervalMinutes, enabled]);

  // Компонент нічого не рендерить
  return null;
}