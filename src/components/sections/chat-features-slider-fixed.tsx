"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';

const ChatFeaturesSliderFixed = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);
  
  // Feature data
  const features = [
    {
      title: "Compliments & Interaction Personalization",
      description: "Your emotional AI that reads your vibe, compliments your aura, and interacts like a real companion."
    },
    {
      title: "Story-Only Social Media",
      description: "Your Space, Your Energy — a pure storytelling zone with no filters, no followers, just real vibes and authentic expression."
    },
    {
      title: "Mood Tracking on Chat",
      description: "Feel seen, every time — AI that senses your mood in conversations and reflects your emotional journey."
    },
    {
      title: "Personalized Aura Themes",
      description: "Your Mood, Your Design — app themes that evolve with your aura, turning your emotional growth into visual art."
    },
    {
      title: "College Leaderboard & Vibers",
      description: "Compete, connect, and shine. Track your aura score with peers and vibe with top creators across campuses."
    },
    {
      title: "Vibe Matching (No Follows)",
      description: "A new way to connect — match through emotions, authenticity, and real vibes instead of followers."
    },
    {
      title: "Aura Castle",
      description: "Play, engage, and grow in your personal aura world — do activities, play mini-games, and build meaningful bonds."
    },
    {
      title: "Rewards for Every Action",
      description: "Earn while you feel — every authentic action earns AuraPoints to unlock rewards, themes, and exclusive merch."
    },
    {
      title: "Secured Chatting",
      description: "Private yet personal — emotion-aware encrypted chats that keep your connections safe and soulful."
    }
  ];

  // Duplicate features for infinite scroll effect
  const duplicatedFeatures = [...features, ...features, ...features];

  // Handle next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => prev + 1);
  }, []);

  // Handle previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => prev - 1);
  }, []);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    // Adjust index to point to the middle set
    const adjustedIndex = index + features.length;
    setCurrentSlide(adjustedIndex);
  }, [features.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Handle infinite scrolling logic
  useEffect(() => {
    const handleInfiniteScroll = () => {
      if (currentSlide >= features.length * 2) {
        // Jump to the beginning without animation
        setIsTransitioning(false);
        setTimeout(() => {
          setCurrentSlide(features.length);
          setIsTransitioning(true);
        }, 50);
      } else if (currentSlide < features.length) {
        // Jump to the end without animation
        setIsTransitioning(false);
        setTimeout(() => {
          setCurrentSlide(features.length * 2 - 1);
          setIsTransitioning(true);
        }, 50);
      }
    };

    handleInfiniteScroll();
  }, [currentSlide, features.length]);

  // Handle resize to calculate slide width
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.clientWidth;
        setSlideWidth(containerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Calculate the transform value
  const getTransformValue = () => {
    if (slideWidth === 0) return 'translateX(0)';
    return `translateX(-${currentSlide * slideWidth}px)`;
  };

  // Helper function to get the active dot index
  const getActiveDotIndex = () => {
    // Ensure we always get a positive result
    const adjustedIndex = (currentSlide - features.length) % features.length;
    return adjustedIndex < 0 ? adjustedIndex + features.length : adjustedIndex;
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-transparent">
      {/* Enhanced background with subtle animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 [background-image:radial-gradient(60%_40%_at_50%_0%,#ffffff0d,transparent_60%)] opacity-20"></div>
        {/* Floating particles for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-500/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 sm:mb-6 text-white title">
            The Internet needed a reset.<br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic" style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>And that's why we built Aurameter</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light subtitle px-4">
            {/* Discover the cosmic powers that shape your destiny */}
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          </div>
        </div>

        <div className="slider-container max-w-7xl mx-auto px-4 relative">
          <div 
            className="slider-wrapper overflow-hidden relative p-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Navigation Arrows */}
            <button 
              className="nav-arrow left absolute top-1/2 -translate-y-1/2 bg-black/90 text-white/90 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 hover:text-yellow-300 text-xl sm:text-2xl font-light rounded-lg"
              onClick={prevSlide}
              style={{ left: '1rem' }}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button 
              className="nav-arrow right absolute top-1/2 -translate-y-1/2 bg-black/90 text-white/90 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 hover:text-yellow-300 text-xl sm:text-2xl font-light rounded-lg"
              onClick={nextSlide}
              style={{ right: '1rem' }}
              aria-label="Next slide"
            >
              ›
            </button>
            
            {/* Slider */}
            <div className="slider overflow-hidden">
              <div 
                ref={sliderRef}
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                style={{ transform: getTransformValue() }}
              >
                {duplicatedFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 px-4 flex items-center justify-center"
                  >
                    <div className="card group bg-gradient-to-b from-black via-black/95 to-black p-5 relative flex flex-col w-full max-w-2xl h-24 transition-all duration-500 rounded-3xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/40">
                      <div className="card-content flex flex-col justify-center flex-1 relative z-10">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-500/5 rounded-full blur-xl transform translate-x-4 -translate-y-4 group-hover:translate-x-2 transition-transform duration-700"></div>
                      
                        <h3 className="text-base font-bold mb-1 leading-tight text-white title group-hover:text-yellow-300 transition-all duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-gray-300/90 font-light subtitle line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="dots flex justify-center items-center gap-3 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                className={`dot w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === getActiveDotIndex()
                    ? 'bg-yellow-400' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatFeaturesSliderFixed;