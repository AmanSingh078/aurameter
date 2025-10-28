"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedBackgroundText = ({ scrollY, isMobile }: { scrollY: number, isMobile: boolean }) => {
    // Simplified background text for mobile
    if (isMobile) {
      return null;
    }
    
    const text = "AuraMeter • AuraMeter • AuraMeter • AuraMeter • ";
    const repeatedText = text.repeat(6);

    return (
        <div 
            className="absolute inset-x-0 -top-1/4 -bottom-1/4 z-0 flex items-center justify-center overflow-hidden pointer-events-none"
            aria-hidden="true"
        >
            <div 
                className="relative flex whitespace-nowrap text-[clamp(100px,20vw,250px)] font-bold text-white/5 uppercase"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
                <div className="animate-marquee will-change-transform">
                    {repeatedText}
                </div>
                <div className="absolute top-0 animate-marquee2 will-change-transform">
                    {repeatedText}
                </div>
            </div>
        </div>
    );
};

const HeroSection = () => {
  const { scrollY, velocity, scrollOpacity, scrollBlur, hueRotation } = useScrollAnimation();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger mount animation
    setIsMounted(true);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Calculate parallax effect for floating particles
  const parallaxParticles = scrollY * 0.2;
  
  // Calculate wave effect for decorative elements
  const waveEffect = Math.sin(scrollY * 0.02) * 10;

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0%); }
            to { transform: translateX(-100%); }
          }
          @keyframes marquee2 {
            from { transform: translateX(100%); }
            to { transform: translateX(0%); }
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
          @keyframes wave {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-marquee {
            animation: marquee 60s linear infinite;
          }
          .animate-marquee2 {
            animation: marquee2 60s linear infinite;
          }
          .animate-rotate {
            animation: rotate 20s linear infinite;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .animate-wave {
            animation: wave 4s ease-in-out infinite;
          }
        `}
      </style>
      <section className="relative flex items-center justify-center min-h-screen text-foreground overflow-hidden py-0">
        <AnimatedBackgroundText scrollY={scrollY} isMobile={isMobile} />
        
        {/* Floating particles with parallax effect - Reduced for mobile performance */}
        {!isMobile && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10 animate-float"
                style={{
                  width: `${Math.random() * 10 + 2}px`,
                  height: `${Math.random() * 10 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  transform: `translateY(${parallaxParticles * (i % 3 + 1) * 0.5}px)`,
                  opacity: scrollOpacity,
                  filter: `blur(${scrollBlur}px)`
                }}
              />
            ))}
          </div>
        )}
        
        <div className="relative z-10 w-full container py-0 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center min-h-[30vh] pt-0">
            
            {/* Main Artistic Typography - Left/Center */}
            <div className="lg:col-span-7 xl:col-span-8 pt-0 mt-0">
              <div className={`transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 
                  className="text-[clamp(60px,12vw,180px)] font-bold leading-[0.85] tracking-[-0.03em] mt-0 pt-0"
                  style={isMobile ? {} : { 
                    transform: `translateY(${scrollY * 0.05}px)`
                  }}
                >
                  <span className="block animate-pulse-slow mt-0 pt-0 font-serif italic font-bold text-[clamp(70px,15vw,180px)] md:text-[clamp(60px,12vw,180px)]">AuraMeter</span>
                  <span className="block mt-2 pt-2">Social Media</span>
                  <span className="block mt-2 pt-2 italic font-serif">that Heals</span>
                </h1>
              </div>
              
              {/* Bottom Text positioned in corner */}
              <div className={`absolute bottom-4 right-4 left-auto transform-none transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center gap-1 flex-wrap justify-end">
                  {!isMobile ? (
                    <>
                      <div className="relative animate-float" style={{ animationDelay: '1s', animationDuration: '5s' }}>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                          <span className="text-overline">WE</span>
                        </div>
                      </div>
                      <div className="relative animate-float" style={{ animationDelay: '2s', animationDuration: '5s' }}>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                          <span className="text-overline">ARE</span>
                        </div>
                      </div>
                      <div className="animate-float" style={{ animationDelay: '3s', animationDuration: '5s' }}>
                        <p className="text-[clamp(20px,2.5vw,32px)] font-bold leading-tight tracking-tight text-right">
                          YOUR<br />AURA
                        </p>
                      </div>
                    </>
                  ) : (
                    // Simplified version for mobile
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <span className="text-[8px] font-bold">WE</span>
                      </div>
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <span className="text-[8px] font-bold">ARE</span>
                      </div>
                      <p className="text-[16px] font-bold leading-tight text-right">
                        YOUR<br />AURA
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side Content - Centered vertically */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-1 pt-0 flex flex-col justify-center h-full">
              <div className={`text-center lg:text-right transition-all duration-1000 delay-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} mt-8 md:mt-0`}>
                <div className="relative inline-block">
                  <p className="text-[clamp(18px,2vw,24px)] leading-[1.3] text-white font-bold mb-3 relative z-10">
                    Stop chasing likes.<br />
                    <span style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>Start growing your aura.</span>
                  </p>
                  <div className="absolute -inset-1 bg-yellow-400 opacity-10 blur rounded-lg"></div>
                </div>
                <div className="relative inline-block mt-6">
                  <p className="text-[clamp(14px,1.5vw,18px)] leading-[1.6] text-white/80 max-w-md mx-auto lg:mx-0 lg:ml-auto italic relative z-10">
                    <span className="text-white">AI-powered emotional intelligence</span> meets social connection. 
                    Earn rewards for <span style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>authenticity</span>, not attention.
                  </p>
                  <div className="absolute -inset-1 bg-white opacity-5 blur rounded-lg"></div>
                </div>
              </div>

              {/* Decorative Circle with Download Button */}
              <div className={`relative flex items-center justify-center py-2 transition-all duration-1000 delay-700 ${isMounted ? 'opacity-100' : 'opacity-0'} mt-10 md:mt-0`}>
                <div className="relative w-32 h-32">
                  {/* Rotating circle background */}
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
                      sizes="(max-width: 640px) 192px, 224px"
                    />
                  </div>
                  
                  {/* Download text inside the circle */}
                  <div className="relative flex items-center justify-center text-center px-2 z-10">
                    <p className="text-[12px] font-bold leading-tight" style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      DOWNLOAD
                    </p>
                    <p className="text-[10px] font-bold italic mt-1" style={{
                      background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      START AURA FARMING
                    </p>
                  </div>
                  
                  {/* Simple golden border */}
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400/50"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div 
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer transition-all duration-300"
          onClick={scrollToNextSection}
          style={isMobile ? {} : { 
            transform: `translateX(-50%) translateY(${waveEffect}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.001)
          }}
        >
          <ChevronDownIcon className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;