"use client";
import React, { useRef, useState, useEffect } from 'react';
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { useIsMobile } from '@/hooks/use-mobile';

const appFeatures = [
  {
    index: 1,
    titleHtml: "Compliments & Interaction<br /> Personalization",
    description: "Your emotional AI that reads your vibe, compliments your aura, and interacts like a real companion.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/GV_BOSTON_Davis_Scott_0052_rt-1.png?",
    projectUrl: null,
    imageAlt: "AI companion interface"
  },
  {
    index: 2,
    titleHtml: "Story-Only<br /> Social Media",
    description: "Your Space, Your Energy A pure storytelling zone — no filters, no followers, just real vibes and authentic expression.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/Playa_de_El_Faro-2.png?",
    projectUrl: null,
    imageAlt: "AuraPoints reward system"
  },
  {
    index: 3,
    titleHtml: "Mood Tracking<br />on Chat",
    description: "Feel Seen, Every Time AI that senses your mood in conversations and reflects your emotional journey.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/img_02-3.png?",
    projectUrl: null,
    imageAlt: "Story amplification feature"
  },
  {
    index: 4,
    titleHtml: "Personalized<br />Aura Themes",
    description: "Your Mood, Your Design App themes that evolve with your aura — turning your emotional growth into visual art.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/Ferrari_Skater_wip8_sl_10.22_1-4.png?",
    projectUrl: null,
    imageAlt: "Authenticity tracking dashboard"
  },
  {
    index: 5,
    titleHtml: "College <br />Leaderboard & Vibers",
    description: "Compete. Connect. Shine.Track your aura score with your college peers and vibe with top creators globally.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/image_334618-5.png?",
    projectUrl: null,
    imageAlt: "Positive community space"
  },
  {
    index: 6,
    titleHtml: "Vibe Matching<br />(No Follows)",
    description: "A New Way to Connect Forget followers — match through vibes, emotions, and shared authenticity.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/playful-main-6.jpg?",
    projectUrl: null,
    imageAlt: "Mindful connection interface"
  },
  {
    index: 7,
    titleHtml: "Aura Castle<br />",
    description: "Play. Engage. Grow.Your personal aura world — do activities, play mini-games, and build meaningful bonds.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/playful-main-6.jpg?",
    projectUrl: null,
    imageAlt: "Mindful connection interface"
  },
  {
    index: 7,
    titleHtml: "Rewards for <br />Every Action",
    description: "Earn While You Feel Every authentic action earns AuraPoints — unlock real rewards, themes, and merch.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/playful-main-6.jpg?",
    projectUrl: null,
    imageAlt: "Mindful connection interface"
  },
  {
    index: 7,
    titleHtml: "Secured Chatting<br />",
    description: "Private Yet Personal Emotion-aware encrypted chats that keep your connections safe and soulful.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/90045eb5-1278-4866-96fd-694b701cd2a9-synchronized-studio/assets/images/playful-main-6.jpg?",
    projectUrl: null,
    imageAlt: "Mindful connection interface"
  }
];

const FeatureCard = ({ item, index, isMobile }: { item: typeof appFeatures[0], index: number, isMobile: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Simplified card for mobile to improve performance
  if (isMobile) {
    return (
      <motion.article
        ref={cardRef}
        className="break-inside-avoid"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
        } : { 
          opacity: 0, 
          y: 30
        }}
        transition={{ 
          duration: 0.4,
          delay: index * 0.05
        }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-black border-2 border-white group transition-all duration-300">
          {/* Simplified image container */}
          <div className="relative overflow-hidden w-full">
            <Image
              src={item.imageUrl}
              alt={item.imageAlt}
              width={400}
              height={300}
              className="w-full h-[300px] object-cover"
              priority={index < 2}
            />
          </div>
          
          {/* Content area */}
          <div className="p-5 space-y-4">
            <h3
              className="text-[18px] font-bold leading-[1.2] text-white"
              dangerouslySetInnerHTML={{ __html: item.titleHtml }}
            />
            <p className="text-[14px] leading-[1.4] text-gray-300">
              {item.description}
            </p>
            
          </div>
        </div>
      </motion.article>
    );
  }

  // Desktop version with three-color scheme
  const renderCardContent = () => (
    <div className="relative overflow-hidden rounded-3xl bg-black border-2 border-white shadow-2xl group transition-all duration-500">
      {/* Gold accent elements */}
      <div className="absolute inset-0 rounded-3xl bg-yellow-500/10 opacity-30"></div>
      
      {/* Image container */}
      <div className="relative overflow-hidden rounded-t-3xl w-full">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          width={600}
          height={400}
          className="w-full h-[250px] sm:h-[280px] md:h-[350px] object-cover transition-all duration-500"
          priority={index < 2}
        />
      </div>
      
      {/* Content area */}
      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 relative z-10">
        <h3
          className="text-[16px] sm:text-[18px] md:text-[clamp(18px,2.5vw,28px)] font-extrabold leading-[1.1] text-white title"
          dangerouslySetInnerHTML={{ __html: item.titleHtml }}
        />
        <p className="text-[12px] sm:text-[14px] md:text-[16px] leading-[1.4] sm:leading-[1.5] text-white/80 line-clamp-2">
          {item.description}
        </p>
        
        
      </div>
    </div>
  );

  return (
    <motion.article
      ref={cardRef}
      className="break-inside-avoid"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
      } : { 
        opacity: 0, 
        y: 50
      }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <div className="group">
        <div className="block">
          {renderCardContent()}
        </div>
      </div>
    </motion.article>
  );
};

const PortfolioGrid = () => {
  const { scrollY, velocity, scrollOpacity, scrollBlur, hueRotation } = useScrollAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  
  const [elementTop, setElementTop] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (sectionRef.current) {
        setElementTop(sectionRef.current.offsetTop);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial setup
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % appFeatures.length);
    }, 3000); // Change card every 3 seconds
    
    return () => clearInterval(interval);
  }, [isMobile]);

  // Calculate parallax effect for background elements
  const parallaxValue = (scrollY - elementTop) * 0.1;

  // Don't render animation on server to avoid hydration issues
  if (!isMounted) {
    return (
      <section ref={sectionRef} id="work" className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="container relative z-10">
          <h2 className="text-[24px] sm:text-[28px] md:text-[clamp(28px,3.5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.01em] mb-8 sm:mb-12 md:mb-16 text-center w-full">
            <span className="block text-center justify-center">
              <span style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>AI</span> that <span className="italic font-serif">Uplifts</span>,
            </span>
            <span className="block mt-2 text-center justify-center">
              Not <span className="font-serif italic font-bold" style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Judges</span>
            </span>
          </h2>
          <div className="flex justify-center">
            <div style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Animated background elements with parallax - Reduced for mobile performance */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-yellow-500/10"
              style={{
                width: `${Math.random() * 120 + 40}px`,
                height: `${Math.random() * 120 + 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: `blur(${25 + parallaxValue * 0.2}px)`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                transform: `translateY(${parallaxValue * (i % 3 + 1) * 0.2}px) scale(${1 + (isInView ? 0.05 : 0)})`,
                opacity: scrollOpacity * 0.7
              }}
            />
          ))}
        </div>
      )}
      
      <div className="container relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(32px,4vw,64px)] font-extrabold leading-tight tracking-[-0.03em] mb-8 sm:mb-12 md:mb-16 text-center text-white relative inline-block mx-auto w-full title"
        >
          <span className="relative z-10 block text-center justify-center">
            <span style={{
              fontFamily: 'var(--font-title)',
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>AI</span> that <span className="italic font-serif">Uplifts</span>,
          </span>
          <span className="block mt-2 text-center justify-center">
            Not <span className="font-serif italic font-bold" style={{
              fontFamily: 'var(--font-title)',
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Judges</span>
          </span>
          {/* Decorative underline */}
          <div className="flex justify-center mt-4">
            <span className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-full"></span>
          </div>
          <p className="text-[16px] sm:text-[18px] text-gray-300 mt-4 max-w-2xl mx-auto text-center leading-relaxed subtitle" 
             style={{ fontFamily: 'var(--font-subtitle)' }}>
            The internet needed a reset. And that's why we built AuraMeter.<br /><br />
            Because scrolling should feel good.<br />
            Because social media should be about connection, not comparison.<br />
            Because your real energy is worth more than fake engagement.<br /><br />
            AI that gets you.<br />
            People who feel you.<br />
            Rewards that value you.<br /><br />
            Welcome to your energy era.
          </p>
        </motion.h2>
        
        <div className="relative overflow-hidden py-6 sm:py-8">
          {/* Mobile: Single card carousel */}
          {isMobile ? (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[340px] mx-auto">
                <FeatureCard 
                  item={appFeatures[currentIndex]} 
                  index={currentIndex} 
                  isMobile={isMobile} 
                />
              </div>
              
              {/* Carousel indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {appFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-yellow-500 w-8' 
                        : 'bg-white/30'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Desktop: Horizontal scrolling */
            <>
              <div className="overflow-x-auto pb-4" style={{ overflowY: 'hidden' }}>
                <div className="flex gap-4 sm:gap-5 md:gap-8 w-max px-4">
                  {appFeatures.map((item, index) => (
                    <div 
                      key={item.index} 
                      className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[420px]"
                    >
                      <FeatureCard item={item} index={index} isMobile={isMobile} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Scroll indicator - hidden on mobile */}
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 text-yellow-500/70 text-sm">
                  <span>← Scroll to explore →</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Custom scrollbar styling */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(255, 215, 0, 0.1);
          border-radius: 10px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #FFD700;
          border-radius: 10px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #FFD700;
        }
      `}</style>
    </section>
  );
};

export default PortfolioGrid;