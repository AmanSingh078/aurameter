"use client";

import React, { useState, useEffect, useRef } from 'react';

interface ScrollFromGroundProps {
  children: React.ReactNode;
  delay?: number;
  animationType?: 'rise' | 'pop' | 'slide';
  threshold?: number;
}

const ScrollFromGround: React.FC<ScrollFromGroundProps> = ({ 
  children, 
  delay = 0,
  animationType = 'rise',
  threshold = 0.15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a slight delay before triggering the animation
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold]);

  // Determine which animation class to use
  const getAnimationClass = () => {
    if (!isVisible) return '';
    
    switch (animationType) {
      case 'pop':
        return 'animate-pop-up-from-ground';
      case 'slide':
        return 'animate-slide-up-from-ground';
      case 'rise':
      default:
        return 'animate-rise-from-ground';
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} transition-all duration-700 ease-out`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.7s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollFromGround;