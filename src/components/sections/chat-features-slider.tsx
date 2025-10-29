"use client";

import React, { useState, useEffect, useRef } from 'react';

const ChatFeaturesSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const totalCards = 15;

  // Feature data extracted from zzz.html
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

  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3; // Show 3 cards on desktop
    if (window.innerWidth >= 768) return 2;  // Show 2 cards on tablet
    return 1; // Show 1 card on mobile
  };

  const updateSlider = () => {
    if (!sliderRef.current) return;
    
    const cardsPerView = getCardsPerView();
    const cardElements = sliderRef.current.children;
    if (cardElements.length === 0) return;
    
    const cardWidth = cardElements[0].clientWidth;
    const gap = 24; // Fixed gap
    const offset = -currentSlide * (cardWidth + gap);
    sliderRef.current.style.transform = `translateX(${offset}px)`;
    
    // Add a subtle scaling effect to the active card
    for (let i = 0; i < cardElements.length; i++) {
      const card = cardElements[i] as HTMLElement;
      if (i >= currentSlide && i < currentSlide + cardsPerView) {
        card.style.transform = 'scale(1.02)';
        card.style.transition = 'transform 0.3s ease';
      } else {
        card.style.transform = 'scale(1)';
        card.style.transition = 'transform 0.3s ease';
      }
    }
  };

  const nextSlide = () => {
    const cardsPerView = getCardsPerView();
    const maxSlide = totalCards - cardsPerView;
    if (currentSlide < maxSlide) {
      setCurrentSlide(prev => prev + 1);
    } else {
      // For infinite scroll, jump to the beginning of the duplicated set
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    const cardsPerView = getCardsPerView();
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    } else {
      // For infinite scroll, jump to the end of the duplicated set
      setCurrentSlide(totalCards - cardsPerView);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide(0);
      updateSlider();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update slider position when currentSlide changes
  useEffect(() => {
    updateSlider();
    
    // Handle seamless loop transition
    const cardsPerView = getCardsPerView();
    if (currentSlide >= totalCards) {
      // Jump to the beginning without animation
      setTimeout(() => {
        setCurrentSlide(0);
      }, 700); // Match the transition duration
    } else if (currentSlide < 0) {
      // Jump to the end without animation
      setTimeout(() => {
        setCurrentSlide(totalCards - cardsPerView);
      }, 700); // Match the transition duration
    }
  }, [currentSlide]);

  // Auto-slide functionality
  useEffect(() => {
    setIsMounted(true);
    const autoSlideInterval = setInterval(() => {
      const cardsPerView = getCardsPerView();
      const maxSlide = totalCards - cardsPerView;
      setCurrentSlide(prev => {
        if (prev >= maxSlide) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000); // Increased interval for better viewing experience

    return () => clearInterval(autoSlideInterval);
  }, []);

  // Update slider when mounted
  useEffect(() => {
    if (isMounted) {
      updateSlider();
    }
  }, [isMounted]);

  // Handle card hover effects and scrolling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    // Handle mouse wheel scrolling
    const handleWheel = (e: Event) => {
      if (e instanceof WheelEvent) {
        e.preventDefault();
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    // Handle touch scrolling
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: Event) => {
      if (e instanceof TouchEvent) {
        touchStartX = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: Event) => {
      if (e instanceof TouchEvent) {
        touchEndX = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      const touchDiff = touchStartX - touchEndX;
      if (Math.abs(touchDiff) > 50) { // minimum swipe distance
        if (touchDiff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    const sliderElement = document.querySelector('.slider-wrapper');
    if (sliderElement) {
      sliderElement.addEventListener('wheel', handleWheel as EventListener, { passive: false });
      sliderElement.addEventListener('touchstart', handleTouchStart as EventListener);
      sliderElement.addEventListener('touchmove', handleTouchMove as EventListener);
      sliderElement.addEventListener('touchend', handleTouchEnd);
    }
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (sliderElement) {
        sliderElement.removeEventListener('wheel', handleWheel as EventListener);
        sliderElement.removeEventListener('touchstart', handleTouchStart as EventListener);
        sliderElement.removeEventListener('touchmove', handleTouchMove as EventListener);
        sliderElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [nextSlide, prevSlide]);

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
          <div className="slider-wrapper overflow-hidden relative p-4 cursor-grab active:cursor-grabbing">
            {/* Navigation Arrows with enhanced styling */}
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
            <div 
              ref={sliderRef}
              className="slider flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] gap-6 px-4 py-2"
              style={{ transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {[...features, ...features].map((feature, index) => (
                <div 
                  key={index}
                  className="card group min-w-full sm:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-16px)] bg-linear-to-b from-black via-black/95 to-black p-6 relative cursor-pointer flex flex-col h-64 sm:h-72 transition-all duration-500 rounded-xl overflow-hidden"
                >
                  {/* Premium gradient border effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-px bg-black rounded-xl z-1"></div>
                  
                  <div className="card-content flex flex-col justify-center flex-1 relative z-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-xl transform translate-x-16 -translate-y-16 group-hover:translate-x-8 transition-transform duration-700"></div>
                    
                    <h3 className="text-lg sm:text-xl font-bold mb-4 leading-tight text-white title group-hover:text-yellow-300 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-gray-300/90 font-light subtitle">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Premium border effect */}
                  <div className="absolute inset-0 border border-yellow-500/20 rounded-xl group-hover:border-yellow-500/40 transition-colors duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Simplified Dots Navigation */}
          <div className="dots flex justify-center items-center gap-3 mt-8">
            {features.map((_, index) => (
              <button
                key={index}
                className={`dot w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentSlide 
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

      <style jsx>{`
        .card {
          transform: perspective(1000px) rotateX(0deg);
          background: linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.98));
        }
        
        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(234, 179, 8, 0.06),
            transparent 40%
          );
          border-radius: 12px;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s;
        }
        
        .card:hover::before {
          opacity: 1;
        }
        
        .card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(234, 179, 8, 0.4),
            transparent 40%
          );
          border-radius: 12px;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s;
          mix-blend-mode: overlay;
        }
        
        .card:hover::after {
          opacity: 0.1;
        }
        
        .card:hover {
          transform: perspective(1000px) rotateX(2deg);
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 767px) {
          .slider-wrapper {
            padding: 1rem 0.5rem;
          }
          
          .nav-arrow {
            display: none;
          }
        }
      `}</style>
      

    </section>
  );
};

export default ChatFeaturesSlider;