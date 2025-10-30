"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';

const ChatFeaturesSliderFixed = () => {
  const { scrollY, isScrollingDown } = useScrollAnimation();
  const [isInView, setIsInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideWidth, setSlideWidth] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  
  // Feature data
  
  // Check if component is in view for animation
  useEffect(() => {
    const checkIfInView = () => {
      const element = document.querySelector('.slider-container');
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

  // Calculate how many sets we need for infinite scroll based on cardsToShow
  const getDuplicatedFeatures = () => {
    const visibleFeatures = Math.ceil(features.length / cardsToShow) * cardsToShow;
    return [...features, ...features, ...features].slice(0, visibleFeatures * 3);
  };

  const duplicatedFeatures = getDuplicatedFeatures();

  // Handle next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => prev + cardsToShow);
  }, [cardsToShow]);

  // Handle previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => prev - cardsToShow);
  }, [cardsToShow]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    const adjustedIndex = index * cardsToShow + features.length;
    setCurrentSlide(adjustedIndex);
  }, [features.length, cardsToShow]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Handle responsive cards display
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardsToShow(3); // Desktop: 3 cards
      } else if (width >= 768) {
        setCardsToShow(2); // Tablet: 2 cards
      } else {
        setCardsToShow(1); // Mobile: 1 card
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle infinite scrolling logic
  useEffect(() => {
    const totalSlides = features.length;
    const maxSlide = totalSlides * 2;
    const minSlide = totalSlides;

    const handleInfiniteScroll = () => {
      if (currentSlide >= maxSlide) {
        setIsTransitioning(false);
        setTimeout(() => {
          setCurrentSlide(minSlide);
          setIsTransitioning(true);
        }, 50);
      } else if (currentSlide < minSlide) {
        setIsTransitioning(false);
        setTimeout(() => {
          setCurrentSlide(maxSlide - cardsToShow);
          setIsTransitioning(true);
        }, 50);
      }
    };

    handleInfiniteScroll();
  }, [currentSlide, features.length, cardsToShow]);

  // Handle resize to calculate slide width
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.clientWidth;
        setSlideWidth(containerWidth / cardsToShow);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cardsToShow]);

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
    const totalSlides = Math.ceil(features.length / cardsToShow);
    const adjustedIndex = ((currentSlide - features.length) / cardsToShow) % totalSlides;
    return adjustedIndex < 0 ? adjustedIndex + totalSlides : adjustedIndex;
  };

  // Calculate number of dots based on cards to show
  const getTotalDots = () => {
    return Math.ceil(features.length / cardsToShow);
  };

  return (
    <section 
      className={`relative py-16 sm:py-20 md:py-28 overflow-hidden bg-transparent transition-all duration-1000 motion-reduce:transition-none`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
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

        {/* Carousel Container Box */}
        <div className="carousel-box bg-black/40 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-yellow-500/10 max-w-7xl mx-auto">
          <div className="slider-container relative">
            <div 
              className="slider-wrapper overflow-hidden relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Slider */}
              <div className="slider overflow-hidden rounded-2xl">
                <div 
                  ref={sliderRef}
                  className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                  style={{ transform: getTransformValue() }}
                >
                  {duplicatedFeatures.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / cardsToShow}%` }}
                    >
                      <div className="card group bg-gradient-to-br from-black via-black/95 to-black/90 p-6 relative flex flex-col w-full transition-all duration-500 rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10 h-48">
                        <div className="card-content flex flex-col justify-center flex-1 relative z-10">
                          {/* Animated background elements */}
                          <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/5 rounded-full blur-xl transform translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 bg-yellow-500/5 rounded-full blur-lg transform -translate-x-2 translate-y-2 group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-700"></div>
                        
                          <h3 className="text-lg font-bold mb-2 leading-tight text-white title group-hover:text-yellow-300 transition-all duration-300 line-clamp-2">
                            {feature.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-gray-300/90 font-light subtitle line-clamp-3">
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
              {Array.from({ length: getTotalDots() }).map((_, index) => (
                <button
                  key={index}
                  className={`dot w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                    index === getActiveDotIndex()
                      ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/30' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatFeaturesSliderFixed;