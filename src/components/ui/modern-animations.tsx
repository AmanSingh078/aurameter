"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

const ModernAnimations = () => {
  const { scrollY, scrollProgress } = useScrollAnimation();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if device is mobile
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setIsMobile(mobile);
    
    // Add class to body for page load animations
    if (typeof document !== 'undefined') {
      document.body.classList.add('page-loaded');
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('page-loaded');
      }
    };
  }, []);

  // Don't render on server to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Page load reveal animation - simplified */}
      <div className={`fixed inset-0 bg-black pointer-events-none z-50 transition-all duration-1000 ${
        isMounted ? 'opacity-0' : 'opacity-100'
      }`} 
      style={{
        clipPath: isMounted ? 'polygon(0 0, 100% 0, 100% 0, 0 0)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: 'clip-path 1.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.8s ease-out'
      }} />

      {/* Simplified scroll progress indicator with gold color */}
      <div 
        className="fixed top-0 left-0 h-1 bg-yellow-400 z-50 transition-all duration-300"
        style={{ 
          width: `${scrollProgress * 100}%`,
        }}
      />
    </>
  );
};

export default ModernAnimations;