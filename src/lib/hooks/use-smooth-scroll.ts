"use client";

import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // This function handles smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Calculate offset for sticky header
            const header = document.querySelector('header');
            const headerHeight = header?.offsetHeight || 0;
            
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    // Add event listener to the document
    document.addEventListener('click', handleAnchorClick);

    // Cleanup event listener
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
};