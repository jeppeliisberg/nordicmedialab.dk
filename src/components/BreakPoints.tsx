import { useEffect } from 'react';

const BreakPoints = (callback: () => void) => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)'); // Tailwind md range
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        // Screen is entering the md range
        callback();
      } else {
        // Screen is leaving the md range
        callback();
      }
    };

    // Initial check in case the screen starts within the md breakpoint
    if (mediaQuery.matches) {
      callback();
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [callback]);
};

export default BreakPoints;