"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// EB_Garamond import removed as we're using Titillium Web
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { useIsMobile } from '@/hooks/use-mobile';

// Using Titillium Web instead of EB Garamond
const displaySerif = {
  variable: '--font-display-serif'
};

const AboutSection = () => {
  const { scrollY, velocity, scrollOpacity, scrollBlur, hueRotation } = useScrollAnimation();
  const isMobile = useIsMobile();
  const [isInView, setIsInView] = useState(false);

  // Check if component is in view for animation
  useEffect(() => {
    const checkIfInView = () => {
      const element = document.getElementById('about-section');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight * 0.8);
      }
    };

    checkIfInView();
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    
    return () => {
      window.removeEventListener('scroll', checkIfInView);
      window.removeEventListener('resize', checkIfInView);
    };
  }, []);

  // Calculate parallax effect for background elements
  const parallaxValue = 0;
  
  // Calculate wave effect for decorative elements
  const waveEffect = Math.sin(scrollY * 0.03) * 15;

  return (
    <section 
      id="about-section" 
      className={`relative overflow-hidden text-neutral-100 transition-all duration-1000 motion-reduce:transition-none`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {/* Backdrop texture with parallax - simplified for mobile */}
      {!isMobile && (
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(60%_40%_at_50%_0%,#ffffff0d,transparent_60%)]"
          style={{ 
            transform: `translateY(${parallaxValue * 0.2}px)`
          }}
        />
      )}
      
      {/* Top centered vertical "Your Aura" section with line - NEW POSITION */}
      <div className="container relative z-10 mb-12">
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <div 
              className="animate-spin" 
              style={{ 
                animationDuration: '20s',
                transform: `rotate(${scrollY * 0.05}deg)`
              }}
            >
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/svgs/sun-5.svg?"
                alt="radiant aura"
                width={168}
                height={168}
                className="w-[104px] h-[104px] md:w-[168px] md:h-[168px]"
              />
            </div>
            <h2 
              className="text-[64px] xl:text-[96px] leading-none tracking-tight font-semibold [writing-mode:vertical-rl] rotate-180 title" 
              style={{
                fontFamily:'var(--font-title)',
                transform: `translateY(${parallaxValue * 0.1}px)`
              }}
            >
              Your<br />Aura
            </h2>
            <div className="h-24 w-px bg-neutral-300/70" />
          </div>
        </div>
      </div>
      
      {/* Rotating circle background around the main content - NEW ADDITION */}
      <div className="container relative z-10 flex justify-center mb-12">
        <div className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
          {/* First circle rotating clockwise */}
          <div 
            className="absolute inset-0"
            style={{ 
              animation: `spin 20s linear infinite`,
            }}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/svgs/circle-text-3.svg?"
              alt="Rotating aura symbol"
              fill
              sizes="(max-width: 768px) 500px, 700px"
            />
          </div>
          
          {/* Second circle rotating counter-clockwise */}
          <div 
            className="absolute inset-0"
            style={{ 
              animation: `spinReverse 20s linear infinite`,
            }}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/svgs/circle-text-3.svg?"
              alt="Rotating aura symbol"
              fill
              sizes="(max-width: 768px) 500px, 700px"
            />
          </div>
          
          {/* Centered content inside the rotating circles */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
            <h2 
              className="text-[32px] md:text-[42px] font-extrabold leading-[1.1] tracking-tight mb-6 italic title"
              style={{
                fontFamily:'var(--font-sans)',
                background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ABOUT AURAMETER
            </h2>
            
            <div className="max-w-[920px] mx-auto animate-fade-in">
              <ul className="text-[clamp(16px,2vw,24px)] leading-[1.2] tracking-normal flex flex-col items-center gap-y-1 subtitle" style={{fontFamily:'var(--font-sans)'}}>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.1s'
                  } : { 
                    animationDelay: '0.1s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.1}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <span className="font-extrabold text-white">Authentic</span>
                  <em className="italic font-extrabold" style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>Stories</em>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.2s'
                  } : { 
                    animationDelay: '0.2s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.2}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <span className="font-extrabold" style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>AI</span>
                  <em className="italic text-white font-extrabold">Companion</em>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.3s'
                  } : { 
                    animationDelay: '0.3s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.3}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <em className="italic text-white font-extrabold">Emotional</em>
                  <span className="font-extrabold" style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>Intelligence</span>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.4s'
                  } : { 
                    animationDelay: '0.4s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.4}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <em className="italic font-extrabold" style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>Real</em>
                  <span className="font-extrabold text-white">Rewards</span>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.5s'
                  } : { 
                    animationDelay: '0.5s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.5}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <span className="font-extrabold text-white">Positive</span>
                  <span className="text-yellow-300 font-extrabold font-serif">Energy</span>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.6s'
                  } : { 
                    animationDelay: '0.6s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.6}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <em className="italic font-extrabold" style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>Mindful</em>
                  <span className="font-extrabold text-white">Connection</span>
                </li>
              </ul>
            </div>
            
            {/* Know More button */}
            <div className="mt-6 flex justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Link 
                href="/know-more"
                className="px-3 py-1 border border-white text-white font-extrabold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 text-[10px] font-serif italic"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
      

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
      
      {/* Remove the previous content section since it's now inside the circle */}
      {/* Right content - REMOVED as it's now inside the rotating circle */}
      
      {/* Animated background elements with parallax - Reduced for mobile performance */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-500/10 animate-float"
              style={{
                width: `${Math.random() * 80 + 40}px`,
                height: `${Math.random() * 80 + 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: `blur(${30 + parallaxValue * 0.1}px)`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translateY(${parallaxValue * (i % 3 + 1) * 0.3}px) scale(${1 + (isInView ? 0.1 : 0)})`,
                opacity: scrollOpacity
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle corner ornament - simplified for mobile */}
      {!isMobile && (
        <div 
          className="animate-fade-in"
          style={{ 
            transform: `translateY(${parallaxValue * 0.5}px) rotate(${scrollY * 0.02}deg)`
          }}
        >
        </div>
      )}
    </section>
  );
};

export default AboutSection;