"use client";

import React, { useEffect, useRef, useState } from 'react';

// Circle component for moving text elements
const MovingCircle = ({ text, index }: { text: string; index: number }) => {
  const circleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!circleRef.current) return;
    
    // Initialize random position and velocity
    const circle = circleRef.current;
    const container = circle.parentElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - circle.offsetWidth;
    const maxY = containerRect.height - circle.offsetHeight;
    
    // Random starting position
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;
    
    // Random velocity
    let vx = (Math.random() - 0.5) * 2;
    let vy = (Math.random() - 0.5) * 2;
    
    // Ensure minimum speed
    if (Math.abs(vx) < 0.2) vx = 0.2 * (vx > 0 ? 1 : -1);
    if (Math.abs(vy) < 0.2) vy = 0.2 * (vy > 0 ? 1 : -1);
    
    // Animation function
    const animate = () => {
      if (!circle || !container) return;
      
      // Update position
      x += vx;
      y += vy;
      
      // Boundary collision - bounce
      if (x <= 0 || x >= maxX) {
        vx = -vx;
        x = x <= 0 ? 0 : maxX;
      }
      if (y <= 0 || y >= maxY) {
        vy = -vy;
        y = y <= 0 ? 0 : maxY;
      }
      
      // Apply new position
      circle.style.transform = `translate(${x}px, ${y}px)`;
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Start animation
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [index]);
  
  return (
    <div
      ref={circleRef}
      className="absolute rounded-full border-2 border-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400"
      style={{
        width: '120px',
        height: '120px',
        left: '0',
        top: '0',
        willChange: 'transform',
      }}
    >
      <span className="text-center font-['Dancing_Script'] font-semibold text-white text-lg">
        {text}
      </span>
    </div>
  );
};

const MovingCircles = ({ sectionId }: { sectionId: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Texts for the moving circles
  const circleTexts = ["About", "Work", "Recognition", "Contact us"];
  
  // Show circles only in hero-section and about-section
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const aboutSection = document.getElementById('about-section');
      
      if (!heroSection || !aboutSection) return;
      
      const heroRect = heroSection.getBoundingClientRect();
      const aboutRect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if either section is in view
      const isHeroVisible = heroRect.top < windowHeight && heroRect.bottom > 0;
      const isAboutVisible = aboutRect.top < windowHeight && aboutRect.bottom > 0;
      
      // Show circles only when in hero or about section
      setIsVisible(isHeroVisible || isAboutVisible);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-10 ${sectionId}`}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <div className="relative w-full h-full">
        {circleTexts.map((text, index) => (
          <MovingCircle key={index} text={text} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MovingCircles;