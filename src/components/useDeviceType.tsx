import { useState, useEffect } from 'react';

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  const updateDeviceType = () => {
    // Define your breakpoint for mobile (e.g., 768px for tablets and below)
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return isMobile;
};