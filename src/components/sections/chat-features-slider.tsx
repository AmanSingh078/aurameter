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
      title: "AI Kundli",
      description: "Our AI algorithms meticulously analyze the positions of celestial bodies at the moment of your birth to generate your Kundli, a detailed astrological chart unique to you.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="40" height="40" stroke="#FFD700" strokeWidth="1.5" fill="none"/>
          <line x1="25" y1="5" x2="25" y2="45" stroke="#FFD700" strokeWidth="1.5"/>
          <line x1="5" y1="25" x2="45" y2="25" stroke="#FFD700" strokeWidth="1.5"/>
          <line x1="10" y1="10" x2="40" y2="40" stroke="#FFD700" strokeWidth="1.5"/>
          <line x1="40" y1="10" x2="10" y2="40" stroke="#FFD700" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: "True Love Match Making",
      description: "Discover true love in the stars with Star Astro - your perfect match awaits! Our AI-based app combines Vedic Indian astrology and NASA space intelligence for harmonious cosmic connections.",
      icon: "💝"
    },
    {
      title: "Horoscope",
      description: "Your personalized horoscope sheds light on the opportunities and challenges that lie ahead, empowering you to make informed decisions.",
      icon: "🔮"
    },
    {
      title: "Astro Chat",
      description: "Look no further than Star Astro - your very own AI astrologer at your fingertips! Our revolutionary AI combines the power of technology with the wisdom of ancient astrology.",
      icon: "💬"
    },
    {
      title: "Birth Chart Analysis",
      description: "Unlock the secrets of your birth chart with detailed planetary positions and aspects. Understand how cosmic energies influence your personality, strengths, and life path.",
      icon: "⭐"
    },
    {
      title: "Tarot Reading",
      description: "Experience AI-powered tarot readings that provide guidance on love, career, and personal growth. Get insights from ancient wisdom combined with modern technology.",
      icon: "🃏"
    },
    {
      title: "Palmistry Scan",
      description: "Upload your palm photo and receive instant AI-based palmistry analysis. Discover what the lines on your hands reveal about your destiny and character traits.",
      icon: "🤚"
    },
    {
      title: "Numerology Insights",
      description: "Unlock the mystical power of numbers in your life. Our AI analyzes your birth date and name to reveal hidden patterns and life purpose.",
      icon: "🔢"
    },
    {
      title: "Gemstone Recommendations",
      description: "Discover which gemstones align with your astrological chart to enhance positive energies and ward off negative influences in your life.",
      icon: "💎"
    },
    {
      title: "Feng Shui Analysis",
      description: "Optimize your living space with personalized Feng Shui recommendations. Our AI analyzes your home layout to maximize positive energy flow.",
      icon: "🏠"
    },
    {
      title: "Compatibility Checker",
      description: "See how well you connect with friends, family, or colleagues. Our compatibility analysis helps you understand relationship dynamics.",
      icon: "👥"
    },
    {
      title: "Career Guidance",
      description: "Align your career path with cosmic energies. Get personalized advice on the best timing for job changes, promotions, and business ventures.",
      icon: "💼"
    },
    {
      title: "Health Forecast",
      description: "Stay ahead of potential health challenges with our predictive health astrology. Learn which body systems need extra care during planetary transits.",
      icon: "❤️"
    },
    {
      title: "Financial Predictions",
      description: "Navigate your financial journey with cosmic insights. Discover the best times for investments, major purchases, and wealth-building opportunities.",
      icon: "💰"
    },
    {
      title: "Daily Moon Guidance",
      description: "Harness the power of lunar cycles with personalized daily guidance. Learn how each moon phase affects your emotions and decision-making.",
      icon: "🌙"
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
            Chat Smarter, Not Harder<br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic" style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>with Star Astro</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light subtitle px-4">
            Discover the cosmic powers that shape your destiny
          </p>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          </div>
        </div>

        <div className="slider-container max-w-6xl mx-auto px-4 relative">
          <div className="slider-wrapper overflow-hidden relative rounded-none border border-white/10">
            {/* Navigation Arrows with enhanced styling */}
            <button 
              className="nav-arrow left absolute top-1/2 -translate-y-1/2 bg-black border border-white/20 text-yellow-500 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 hover:border-yellow-500/70 hover:text-yellow-300 hover:shadow-lg hover:shadow-yellow-500/30 text-xl sm:text-2xl font-light rounded-full transform hover:scale-110"
              onClick={prevSlide}
              style={{ left: '-20px' }}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button 
              className="nav-arrow right absolute top-1/2 -translate-y-1/2 bg-black border border-white/20 text-yellow-500 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 hover:border-yellow-500/70 hover:text-yellow-300 hover:shadow-lg hover:shadow-yellow-500/30 text-xl sm:text-2xl font-light rounded-full transform hover:scale-110"
              onClick={nextSlide}
              style={{ right: '-20px' }}
              aria-label="Next slide"
            >
              ›
            </button>
            
            {/* Slider */}
            <div 
              ref={sliderRef}
              className="slider flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] gap-4 sm:gap-6"
              style={{ transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {[...features, ...features].map((feature, index) => (
                <div 
                  key={index}
                  className="card group min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-white/10 p-5 sm:p-6 relative cursor-pointer flex flex-col h-[320px] sm:h-[400px] transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/30 transform-gpu overflow-hidden"
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent transform rotate-12 scale-150 group-hover:scale-125 transition-all duration-1000"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-all duration-700"></div>
                  </div>
                  
                  {/* Enhanced gold accent border with animation */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <div className="absolute inset-0 border border-yellow-500/40 rounded-lg"></div>
                  </div>
                  
                  <div className="card-content flex flex-col items-center justify-center flex-1 relative z-10 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="card-icon-wrapper w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black border border-white/20 transition-all duration-500 group-hover:border-yellow-500/60 group-hover:shadow-2xl group-hover:shadow-yellow-500/40 rounded-xl transform group-hover:scale-110 relative overflow-hidden">
                        {/* Glowing background for icons */}
                        <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 rounded-xl transition-all duration-500"></div>
                        <div className="card-icon text-xl sm:text-2xl opacity-95 filter drop-shadow-lg relative z-10">
                          {typeof feature.icon === 'string' ? feature.icon : feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold mb-3 leading-tight text-white title group-hover:text-yellow-300 transition-colors duration-300 transform group-hover:translate-y-[-2px]">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-300 px-2 font-light subtitle transform group-hover:translate-y-[-1px] transition-transform duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Dots Navigation */}
          <div className="dots flex justify-center items-center gap-2 mt-8 sm:mt-10 flex-wrap">
            {features.map((_, index) => (
              <button
                key={index}
                className={`dot w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full cursor-pointer transition-all duration-500 transform hover:scale-125 ${
                  index === currentSlide 
                    ? 'bg-yellow-500 w-6 sm:w-8 rounded-full shadow-lg shadow-yellow-500/50 transform scale-125' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 1px;
          background: linear-gradient(135deg, transparent, #FFD700, transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.3;
          transition: all 0.5s ease;
          border-radius: 0.5rem;
        }
        
        .card:hover::before {
          opacity: 0.7;
          transform: scale(1.02);
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 767px) {
          .slider-wrapper {
            padding: 0 20px;
          }
          
          .nav-arrow {
            display: none;
          }
          
          .card {
            height: 320px;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .card {
            height: 400px;
          }
        }
        
        @media (min-width: 1024px) {
          .card {
            height: 400px;
          }
        }
      `}</style>
    </section>
  );
};

export default ChatFeaturesSlider;