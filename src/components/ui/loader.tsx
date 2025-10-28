"use client";

import React, { useState, useEffect, useRef } from 'react';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState(5);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const duration = 3000; // Total animation duration in milliseconds
    const startValue = 0;
    const endValue = 100;
    const startPosition = 5; // Starting position in percentage
    const endPosition = 80; // Ending position in percentage

    const easeInQuad = (t: number) => {
      // Acceleration easing function (quadratic)
      return t * t;
    };

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing for acceleration effect
      const easedProgress = easeInQuad(progress);
      
      // Calculate current number
      const currentNumber = Math.floor(startValue + (endValue - startValue) * easedProgress);
      
      // Calculate current position with acceleration
      const currentPosition = startPosition + (endPosition - startPosition) * easedProgress;
      
      // Update counter display and position
      setCount(currentNumber);
      setPosition(currentPosition);
      
      // Continue animation until complete
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete, trigger callback
        if (onComplete) {
          setTimeout(onComplete, 100); // Small delay before removing loader
        }
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="loader-container"
    >
      <img 
        src="https://i.pinimg.com/originals/fe/c0/12/fec012aaf16bdc1b5e9436995d652fda.gif" 
        alt="Loading animation"
        className="loader-gif-background"
        style={{ 
          animationDuration: isMobile ? '15s' : '10s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          // Disable animation on low-end mobile devices
          animationPlayState: isMobile ? 'running' : 'running'
        }}
      />
      <div 
        className="loader-counter"
        style={{ left: `${position}%` }}
      >
        {count}%
      </div>
    </div>
  );
};

export default Loader;