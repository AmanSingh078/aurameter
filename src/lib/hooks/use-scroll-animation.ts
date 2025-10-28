"use client";

import { useState, useEffect, useCallback } from 'react';

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setIsMobile(mobile);
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // On mobile, update less frequently to improve performance
    if (isMobile && Math.abs(currentScrollY - prevScrollY) < 5) {
      return;
    }
    
    const currentTime = Date.now();
    
    // Calculate velocity (pixels per second)
    const distance = currentScrollY - prevScrollY;
    setVelocity(Math.abs(distance));
    
    setScrollY(currentScrollY);
    setIsScrollingDown(currentScrollY > prevScrollY);
    setPrevScrollY(currentScrollY);
  }, [prevScrollY, isMobile]);

  const handleResize = useCallback(() => {
    setScrollHeight(document.documentElement.scrollHeight);
    setWindowHeight(window.innerHeight);
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // Initialize with current values
    setScrollHeight(document.documentElement.scrollHeight);
    setWindowHeight(window.innerHeight);
    setPrevScrollY(window.scrollY);
    
    let timeoutId: NodeJS.Timeout;
    
    const throttledHandleScroll = () => {
      clearTimeout(timeoutId);
      // Throttle scroll events to improve performance
      timeoutId = setTimeout(handleScroll, isMobile ? 100 : 16); // 16ms for 60fps, 100ms on mobile
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [handleScroll, handleResize, isMobile]);

  // Calculate scroll progress (0 to 1)
  const scrollProgress = scrollHeight > windowHeight 
    ? Math.min(1, scrollY / (scrollHeight - windowHeight))
    : 0;
  
  // Calculate parallax effect
  const parallaxValue = scrollY * 0.5;
  
  // Calculate rotation based on scroll
  const rotationValue = scrollY * 0.05;
  
  // Calculate scale based on scroll
  const scaleValue = Math.max(0.95, 1 - scrollY * 0.0001);
  
  // Calculate scroll-based opacity (fades out as you scroll down)
  const scrollOpacity = Math.max(0.2, 1 - scrollY * 0.001);
  
  // Calculate scroll-based blur (increases as you scroll down)
  const scrollBlur = Math.min(10, scrollY * 0.01);
  
  // Calculate scroll-based hue rotation (changes color as you scroll)
  const hueRotation = scrollY * 0.1;

  return {
    scrollY,
    scrollProgress,
    isScrollingDown,
    parallaxValue,
    rotationValue,
    scaleValue,
    velocity,
    scrollOpacity,
    scrollBlur,
    hueRotation
  };
};