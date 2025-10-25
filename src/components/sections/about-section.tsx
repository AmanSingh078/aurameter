"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EB_Garamond } from 'next/font/google';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { useIsMobile } from '@/hooks/use-mobile';

const displaySerif = EB_Garamond({
  subsets: ['latin'],
  weight: ['400','500','600','700','800'],
  style: ['normal','italic'],
  variable: '--font-display-serif'
});

const AboutSection = () => {
  const { scrollY, velocity, scrollOpacity, scrollBlur, hueRotation } = useScrollAnimation();
  const isMobile = useIsMobile();
  const [isInView, setIsInView] = useState(false);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const element = document.getElementById('about-section');
      if (element) {
        setElementTop(element.offsetTop);
      }
    };

    // Check if element is in view
    const checkInView = () => {
      const element = document.getElementById('about-section');
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
  
  // Calculate wave effect for decorative elements
  const waveEffect = Math.sin(scrollY * 0.03) * 15;

  return (
    <section id="about-section" className={`relative overflow-hidden py-16 md:py-24 text-neutral-100 ${displaySerif.variable}`}>
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
              className="text-[64px] xl:text-[96px] leading-none tracking-tight font-semibold [writing-mode:vertical-rl] rotate-180" 
              style={{
                fontFamily:'var(--font-display-serif)',
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
              className="text-[32px] md:text-[42px] font-extrabold leading-[1.1] tracking-tight mb-6 font-serif italic text-yellow-400"
              style={{
                fontFamily:'var(--font-display-serif)',
              }}
            >
              ABOUT AURAMETER
            </h2>
            
            <div className="max-w-[920px] mx-auto animate-fade-in">
              <ul className="text-[clamp(16px,2vw,24px)] leading-[1.2] tracking-normal flex flex-col items-center gap-y-1" style={{fontFamily:'var(--font-display-serif)'}}>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center uppercase font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.1s'
                  } : { 
                    animationDelay: '0.1s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.1}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <span className="font-extrabold text-white">Authentic</span>
                  <em className="italic text-yellow-400 font-extrabold">Stories</em>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center uppercase font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.2s'
                  } : { 
                    animationDelay: '0.2s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.2}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <span className="font-extrabold text-yellow-400">AI</span>
                  <em className="italic text-white font-extrabold">Companion</em>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center uppercase font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.3s'
                  } : { 
                    animationDelay: '0.3s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.3}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <em className="italic text-white font-extrabold">Real</em>
                  <span className="font-extrabold text-yellow-400">Rewards</span>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center uppercase font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.4s'
                  } : { 
                    animationDelay: '0.4s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.4}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <em className="italic text-yellow-400 font-extrabold">Interactive</em>
                  <span className="font-extrabold text-white">Games</span>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center uppercase font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.5s'
                  } : { 
                    animationDelay: '0.5s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.5}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <span className="font-extrabold text-white">Just</span>
                  <span className="text-yellow-300 font-extrabold font-serif">Postivity</span>
                </li>
                <li 
                  className="flex flex-wrap items-baseline gap-x-2 md:gap-x-3 animate-slide-in-up justify-center uppercase font-extrabold italic font-serif" 
                  style={isMobile ? { 
                    animationDelay: '0.6s'
                  } : { 
                    animationDelay: '0.6s',
                    transform: `translateX(${isInView ? 0 : -20}px) translateY(${waveEffect * 0.6}px)`,
                    opacity: isInView ? 1 : 0
                  }}
                >
                  <em className="italic text-yellow-400 font-extrabold">Mindful</em>
                  <span className="font-extrabold text-white">Connection</span>
                </li>
              </ul>
            </div>
            
            {/* Know More button */}
            <div className="mt-6 flex justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <a href="/know-more">
                <button 
                  className="px-3 py-1 border border-white text-white font-extrabold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 text-[10px] font-serif italic"
                  style={{ fontFamily: 'var(--font-display-serif)' }}
                >
                  Know More
                </button>
              </a>
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
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/svgs/shape-2.svg?"
            alt="decorative shape"
            width={400}
            height={400}
            className="absolute -top-16 left-[12%] w-[150px] md:w-[280px] h-auto opacity-20 md:opacity-30 -z-10 pointer-events-none"
          />
        </div>
      )}
    </section>
  );
};

export default AboutSection;