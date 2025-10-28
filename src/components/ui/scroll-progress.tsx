"use client";

import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

const ScrollProgress = () => {
  const { scrollY, scrollProgress, velocity, scrollOpacity, scrollBlur, hueRotation } = useScrollAnimation();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear the timeout and set a new one
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Calculate width based on scroll progress and velocity for dynamic effect
  const progressWidth = scrollProgress * (1 + Math.min(0.2, velocity / 1000));

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
      {/* Main progress bar */}
      <div 
        className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 transition-all duration-300 ease-out"
        style={{ 
          width: `${Math.min(100, progressWidth * 100)}%`
        }}
      />
      
      {/* Glow effect when scrolling */}
      {isScrolling && (
        <div 
          className="absolute top-0 h-full w-24 bg-yellow-300/30 blur-xl transition-all duration-300"
          style={{ 
            left: `calc(${Math.min(100, progressWidth * 100)}% - 3rem)`,
            opacity: Math.min(0.7, velocity / 500)
          }}
        />
      )}
      
      {/* Progress indicator ball */}
      <div 
        className="absolute top-1/2 w-4 h-4 -mt-2 -ml-2 rounded-full bg-white shadow-lg transition-all duration-300 ease-out"
        style={{ 
          left: `${Math.min(100, progressWidth * 100)}%`,
          transform: `scale(${isScrolling ? 1.5 : 1}) translateY(${Math.sin(scrollY * 0.05) * 2}px)`,
          boxShadow: isScrolling ? '0 0 15px rgba(255,255,255,0.7)' : '0 0 5px rgba(255,255,255,0.5)'
        }}
      />
      
      {/* Secondary progress indicator */}
      <div 
        className="absolute top-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-yellow-300 transition-all duration-500 ease-out"
        style={{ 
          left: `${Math.min(100, progressWidth * 100)}%`,
          transform: `scale(${isScrolling ? 2 : 1}) translateY(${Math.cos(scrollY * 0.03) * 3}px)`,
          opacity: isScrolling ? 0.8 : 0.4
        }}
      />
    </div>
  );
};

export default ScrollProgress;