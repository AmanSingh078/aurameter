"use client";

import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { useIsMobile } from '@/hooks/use-mobile';

const ContactSection = () => {
  const { scrollY, velocity, scrollOpacity, scrollBlur, hueRotation } = useScrollAnimation();
  const isMobile = useIsMobile();
  const [isInView, setIsInView] = useState(false);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const element = document.getElementById('contact-us');
      if (element) {
        setElementTop(element.offsetTop);
      }
    };

    // Check if element is in view
    const checkInView = () => {
      const element = document.getElementById('contact-us');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', checkInView);
    checkInView();
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', checkInView);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate parallax effect for background elements
  const parallaxValue = (scrollY - elementTop) * 0.1;

  return (
    <section id="contact-us" className="py-0 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Center all content in a single column */}
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Centered Content */}
          <div>
            <h2 
              className="text-[clamp(36px,8vw,80px)] font-bold leading-[1.1] tracking-[-0.01em] mb-6"
              style={isMobile ? {} : { 
                transform: `translateY(${parallaxValue * 0.1}px)`
              }}
            >
              <span className="block">Join the</span>
              <span className="block text-yellow-400 font-serif italic font-bold">
                <span className="text-yellow-300 font-bold">Revolution </span>
              </span>
            </h2>
            
            <div 
              className="text-[16px] leading-[1.7] max-w-xl text-foreground/80 mx-auto mb-8"
              style={isMobile ? {} : { 
                transform: `translateY(${parallaxValue * 0.05}px)`
              }}
            >
              <p>
                The Auraverse is opening and only the early ones will get in, be the first to experience the future of social interaction.
              </p>
              <p className="mt-4"> Your aura deserves a VIP pass Limited availability. This isn’t for everyone just the real vibes.
 </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full font-bold text-[14px] md:text-[16px] transition-all duration-300 hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105"
                style={isMobile ? {} : { 
                  transform: `translateY(${isInView ? 0 : 20}px)`
                }}
              >
                <span className="relative z-10">Claim My VIP Pass</span>
              </a>
              
              <a 
                href="mailto:hello@aurameter.app" 
                className="px-6 py-3 md:px-8 md:py-4 border-2 border-white/30 rounded-full font-bold text-[14px] md:text-[16px] transition-all duration-300 hover:border-white/60 hover:bg-white/10 transform hover:scale-105"
                style={isMobile ? {} : { 
                  transform: `translateY(${isInView ? 0 : 20}px)`
                }}
              >
                Join Us
              </a>
            </div>
            <div className="mt-12 text-sm text-foreground/60 italic">
            <p> Don’t be the guy who discovers it later on someone else’s story.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;