"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { teamMembers, TeamMember } from '@/data/team-data';

const TeamSection = () => {
  const { scrollY } = useScrollAnimation();
  const isMobile = useIsMobile();
  const [isInView, setIsInView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate team members
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [currentMemberIndex, setCurrentMemberIndex] = useState<number>(0);
  const [autoShowActive, setAutoShowActive] = useState<boolean>(true);
  const [circlePositions, setCirclePositions] = useState<Array<{left: string, top: string}>>([]);
  const circleContainerRef = useRef<HTMLDivElement>(null);
  const autoShowIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize members
  useEffect(() => {
    setMembers(teamMembers);
  }, []);

  // Check if element is in view
  useEffect(() => {
    const checkInView = () => {
      const element = document.getElementById('team-section');
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

    window.addEventListener("scroll", checkInView);
    checkInView();

    return () => {
      window.removeEventListener("scroll", checkInView);
    };
  }, [isVisible]);

  // Create circle positions
  const createCirclePositions = () => {
    if (!circleContainerRef.current || members.length === 0) return;

    const container = circleContainerRef.current;
    const containerWidth = container.offsetWidth;
    const radius = containerWidth * 0.42;
    const memberSize = isMobile ? 45 : 70;

    const positions = members.map((_, index) => {
      const angle = (360 / members.length) * index;
      const radian = (angle * Math.PI) / 180;
      
      const x = radius * Math.cos(radian);
      const y = radius * Math.sin(radian);
      
      return {
        left: `calc(50% + ${x}px - ${memberSize / 2}px)`,
        top: `calc(50% + ${y}px - ${memberSize / 2}px)`
      };
    });

    setCirclePositions(positions);
  };

  // Show member details
  const showMember = (index: number) => {
    setCurrentMemberIndex(index);
  };

  // Toggle auto-show
  const toggleAutoShow = () => {
    setAutoShowActive(!autoShowActive);
  };

  // Auto-show effect with longer duration for co-founders
  useEffect(() => {
    if (autoShowActive && members.length > 0) {
      const currentMember = members[currentMemberIndex];
      const isCoFounder = currentMember?.role === 'Co-Founder Aurameter';
      const duration = isCoFounder ? 5000 : 3000; // 5 seconds for co-founders, 3 seconds for others
      
      autoShowIntervalRef.current = setTimeout(() => {
        setCurrentMemberIndex(prev => (prev + 1) % members.length);
      }, duration);
    } else if (autoShowIntervalRef.current) {
      clearTimeout(autoShowIntervalRef.current);
    }

    return () => {
      if (autoShowIntervalRef.current) {
        clearTimeout(autoShowIntervalRef.current);
      }
    };
  }, [autoShowActive, members.length, currentMemberIndex]);

  // Handle resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createCirclePositions();
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (autoShowIntervalRef.current) {
        clearInterval(autoShowIntervalRef.current);
      }
    };
  }, [members.length]);

  // Initial positioning and auto-show
  useEffect(() => {
    if (members.length > 0) {
      // Wait for the container to be rendered
      const timer = setTimeout(() => {
        createCirclePositions();
        showMember(0);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [members.length, isMobile]);

  const currentMember = members[currentMemberIndex] || members[0];

  // Handle mouse enter event for hover effect
  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setCurrentMemberIndex(index);
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (index: number) => {
    if (isMobile) {
      setCurrentMemberIndex(index);
    }
  };

  return (
    <section id="team-section" className="relative overflow-hidden">
      <div className="container relative z-10">
        <div 
          className={`w-full min-h-screen flex flex-col justify-center items-center py-10 px-4 sm:px-6 md:px-10 lg:px-20 transition-all duration-1000 ease-out transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold italic tracking-tight mb-2 drop-shadow-lg title" style={{
              fontFamily: 'var(--font-title)',
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Don't hesitate
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold italic tracking-tight mb-2 text-white drop-shadow-lg title" style={{
              fontFamily: 'var(--font-title)',
            }}>
              to say Hello
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold italic tracking-tight mb-2 text-white drop-shadow-lg title" style={{
              fontFamily: 'var(--font-title)',
            }}>
              to our studio
            </h1>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto my-6 md:my-8 rounded-full"></div>
            <p className="text-sm sm:text-base md:text-lg tracking-widest text-gray-300 font-serif italic font-bold">
              Our Creative Team
            </p>
          </div>

          {/* Main content area */}
          <div className="main-content flex items-center justify-center w-full relative">
            <div 
              ref={circleContainerRef}
              className="circle-container relative w-[90vw] h-[90vw] sm:w-[75vw] sm:h-[75vw] md:w-[70vw] md:h-[70vw] max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] max-h-[320px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px]"
            >
              {/* Member Photos */}
              {members.length > 0 && circlePositions.length > 0 && circlePositions.map((position, index) => (
                <div
                  key={index}
                  className={`member-circle absolute rounded-full overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                    index === currentMemberIndex 
                      ? 'border-white scale-125 md:scale-150 shadow-[0_0_20px_rgba(255,255,255,0.8)] z-50' 
                      : 'border-white'
                  }`}
                  style={{
                    width: isMobile ? '35px' : '60px',
                    height: isMobile ? '35px' : '60px',
                    left: position.left,
                    top: position.top,
                  }}
                  onClick={() => showMember(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onTouchStart={() => handleTouchStart(index)}
                >
                  <img 
                    src={members[index].image} 
                    alt={members[index].name} 
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      index === currentMemberIndex ? 'grayscale-0' : 'grayscale'
                    }`}
                  />
                </div>
              ))}

              {/* Center Info */}
              <div 
                className={`center-info absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-[70%] sm:w-[70%] max-w-[220px] sm:max-w-[280px] md:max-w-[320px] cursor-pointer transition-opacity duration-300 ${
                  autoShowActive ? 'opacity-100' : 'opacity-70'
                }`}
                onClick={toggleAutoShow}
              >
                {currentMember ? (
                  <>
                    {/* Member Detail View */}
                    <div className="detail-view">
                      <div className="center-image w-[60px] sm:w-[90px] md:w-[100px] lg:w-[120px] h-[60px] sm:h-[90px] md:h-[100px] lg:h-[120px] rounded-full border-2 sm:border-2 md:border-[3px] lg:border-[3px] border-white overflow-hidden mx-auto mb-2 sm:mb-4 md:mb-4 animate-fade-in-scale">
                        <img 
                          src={currentMember.image} 
                          alt={currentMember.name} 
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                      <div className="member-number text-[10px] sm:text-xs md:text-sm tracking-widest text-gray-500 mb-1 md:mb-2 font-serif italic">
                        MEMBER {String(currentMember.id).padStart(2, '0')}
                      </div>
                      <h2 className="member-name text-sm sm:text-xl md:text-3xl lg:text-4xl font-serif font-bold italic uppercase leading-tight mb-1 sm:mb-2 md:mb-3 text-white title" style={{
                        fontFamily: 'var(--font-title)',
                      }}>
                        {currentMember.name}
                      </h2>
                      <div className="member-role text-[7px] sm:text-xs md:text-sm tracking-wide sm:tracking-widest uppercase text-gray-400 py-0 sm:py-2 md:py-2 sm:border-t sm:border-b border-white my-1 sm:my-2 md:my-3 font-serif italic">
                        {currentMember.role}
                      </div>
                      <p className="member-bio text-[8px] sm:text-xs md:text-sm text-gray-300 leading-relaxed mb-2 sm:mb-3 md:mb-4 hidden sm:block animate-slide-up-details font-serif subtitle">
                        {currentMember.bio}
                      </p>
                    </div>
                  </>
                ) : (
                  // Default View
                  <div className="default-view">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-1 font-serif italic text-white">{members.length}</h2>
                    <p className="text-[10px] sm:text-xs md:text-sm tracking-widest text-gray-500 font-serif italic">TAP ANY MEMBER</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* About Team Button - Positioned below the main content */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <a 
              href="/team"
              className="px-6 py-2 bg-yellow-500 text-black font-serif font-bold italic text-sm md:text-base rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              About Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;