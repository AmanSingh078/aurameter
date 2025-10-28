"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

const ScrollEffects = () => {
  const { scrollY, velocity, scrollOpacity } = useScrollAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setIsMobile(mobile);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Skip rendering on mobile to improve performance
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Simplified background particles in gold */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-yellow-400/20"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${Math.sin(scrollY * 0.01 + i * 0.5) * 20}px)`,
              opacity: scrollOpacity * 0.3,
              transition: 'transform 0.2s linear, opacity 0.2s linear'
            }}
          />
        ))}
      </div>

      {/* Scroll velocity indicator in gold */}
      {velocity > 300 && (
        <div 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          style={{
            opacity: Math.min(0.7, velocity / 1000),
            transform: `translate(-50%, -50%) scale(${1 + velocity / 2000})`
          }}
        >
          <div className="w-16 h-16 border-2 border-yellow-400/30 rounded-full animate-ping" />
        </div>
      )}
    </>
  );
};

export default ScrollEffects;