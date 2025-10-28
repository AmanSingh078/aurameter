"use client";

import React, { useState, useEffect } from "react";
import { useScrollAnimation } from "@/lib/hooks/use-scroll-animation";
import { useIsMobile } from "@/hooks/use-mobile";

const ContactSection = () => {
  const { scrollY, velocity, scrollOpacity, scrollBlur, hueRotation } =
    useScrollAnimation();
  const isMobile = useIsMobile();
  const [isInView, setIsInView] = useState(false);
  const [elementTop, setElementTop] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const element = document.getElementById("contact-us");
      if (element) {
        setElementTop(element.offsetTop);
      }
    };

    // Check if element is in view
    const checkInView = () => {
      const element = document.getElementById("contact-us");
      if (element) {
        const rect = element.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(inView);
        
        // Set visible when element comes into view
        if (inView && !isVisible) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", checkInView);
    checkInView();
    handleResize();

    return () => {
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible]);

  // Calculate parallax effect for background elements
  const parallaxValue = (scrollY - elementTop) * 0.1;

  return (
    <section id="contact-us" className="relative overflow-hidden">
      <div className="container relative z-10">
        {/* Center all content in a single column */}
        <div 
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Centered Content */}
          <div>
            <h2
              className="text-[clamp(36px,8vw,80px)] font-bold leading-[1.1] tracking-[-0.01em] mb-6 title"
              style={
                isMobile
                  ? {}
                  : {
                      fontFamily: 'var(--font-title)',
                      transform: `translateY(${parallaxValue * 0.1}px)`,
                    }
              }
            >
              <span className="block">Join the</span>
              <span className="block font-serif italic font-bold" style={{
                fontFamily: 'var(--font-title)',
                background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                <span className="text-yellow-300 font-bold">Aura</span>Meter
              </span>
              <span className="block">Revolution</span>
              {/* Golden underline for "Join the AuraMeter Revolution" */}
              <div className="w-40 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-4 mx-auto"></div>
            </h2>

            <div
              className="text-[16px] leading-[1.7] max-w-xl text-foreground/80 mx-auto mb-8 subtitle"
              style={
                isMobile
                  ? {}
                  : {
                      transform: `translateY(${parallaxValue * 0.05}px)`,
                    }
              }
            >
              <p className="mb-4">
                Not another social app — a vibe movement. Step into the world
                where emotions matter, authenticity wins, and your aura earns
                rewards.
              </p>
              <p className="mb-2">
                Post what you feel. <br/>Connect how you vibe.<br/> Earn for being real.
              </p>
              <p className="mb-4">
                Be the early ones to shape the next era of mindful, Gen Z–powered social connection.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a
                href="/waitlist"
                className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full font-bold text-[14px] md:text-[16px] transition-all duration-300 hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105"
                style={
                  isMobile
                    ? {}
                    : {
                        transform: `translateY(${isInView ? 0 : 20}px)`,
                      }
                }
              >
                <span className="relative z-10">→ Join the Waitlist</span>
              </a>

              <a
                href="mailto:hello@aurameter.app"
                className="px-6 py-3 md:px-8 md:py-4 border-2 border-white/30 rounded-full font-bold text-[14px] md:text-[16px] transition-all duration-300 hover:border-white/60 hover:bg-white/10 transform hover:scale-105"
                style={
                  isMobile
                    ? {}
                    : {
                        transform: `translateY(${isInView ? 0 : 20}px)`,
                      }
                }
              >
                → Contact the Team
              </a>
            </div>
            
            <div className="text-[16px] leading-[1.7] max-w-xl text-foreground/80 mx-auto subtitle">
              <p>Let's build the internet with soul.</p>
              <p className="mt-1">We vibe. We listen. We grow — together</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;