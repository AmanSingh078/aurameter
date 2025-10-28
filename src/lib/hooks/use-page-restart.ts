import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle page restart functionality
 * Restarts animations and resets state when navigating back to a page
 */
export const usePageRestart = (onRestart: () => void) => {
  const hasRestartedRef = useRef<boolean>(false);

  useEffect(() => {
    // Mark that we've initialized the page
    hasRestartedRef.current = false;

    // Function to handle page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden && !hasRestartedRef.current) {
        hasRestartedRef.current = true;
        setTimeout(onRestart, 100);
      }
    };

    // Function to handle window focus
    const handleFocus = () => {
      if (!hasRestartedRef.current) {
        hasRestartedRef.current = true;
        setTimeout(onRestart, 100);
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Set up a MutationObserver to detect when we come back to this page
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const body = document.body;
          // Check if we're on the team page
          if (body.classList.contains('team-page-active') && !hasRestartedRef.current) {
            hasRestartedRef.current = true;
            setTimeout(onRestart, 100);
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Clean up
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      observer.disconnect();
    };
  }, [onRestart]);
};