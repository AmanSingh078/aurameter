"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';

// Updated reward data - separating icons and descriptions
const rewardsData = [
  { title: "Brand Vouchers", value: "Unlimited", icon: "💳", bgColor: "bg-black", description: "Exclusive vouchers and deals from top lifestyle and Gen Z brands." },
  { title: "Coupons & Offers", value: "Weekly", icon: "🎫", bgColor: "bg-black", description: "Redeem your AuraPoints for premium partner coupons and discounts." },
  { title: "Real Prize Money", value: "Monthly", icon: "💰", bgColor: "bg-black", description: "Top aura farmers win real cash prizes for their authenticity and consistency." },
  { title: "Flagship Themes", value: "Unlockable", icon: "🎨", bgColor: "bg-black", description: "Access exclusive in-app themes that evolve as your aura level rises." },
  { title: "Unique Badges", value: "Collectible", icon: "🏅", bgColor: "bg-black", description: "Earn rare aura badges that showcase your vibe, growth, and emotional milestones." },
  { title: "Experiences", value: "Quarterly", icon: "🌟", bgColor: "bg-black", description: "Get invited to community events, collaborations, and aura-based IRL meetups." },
  { title: "Charity & Impact", value: "Ongoing", icon: "❤️", bgColor: "bg-black", description: "Convert your aura into action — donate your energy to causes you care about." },
  { title: "Merch Drops", value: "Seasonal", icon: "👕", bgColor: "bg-black", description: "Claim limited-edition AuraMeter fits and accessories before anyone else." }
];

const AwardsSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(rewardsData.length).fill(false));

  // Mobile-optimized sizes (approximately 35% smaller as per requirements)
  const iconSize = isMobile ? 'w-10 h-10' : 'w-16 h-16';
  const iconTextSize = isMobile ? 'text-lg' : 'text-2xl';
  const gapSize = isMobile ? 'gap-3' : 'gap-6';
  const textSize = isMobile ? 'text-[10px]' : 'text-sm';
  const titleSize = isMobile ? 'text-[11px]' : 'text-sm';
  const descriptionSize = isMobile ? 'text-[8px]' : 'text-xs';
  const sectionPadding = isMobile ? 'py-8' : 'py-20';
  const headingSize = isMobile ? 'text-3xl' : 'text-6xl';
  const headingSizeMd = isMobile ? 'text-4xl' : 'text-[120px]';
  const containerWidth = isMobile ? 'w-[260px]' : 'w-full'; // As per mobile visibility requirements

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport
      if (sectionTop < windowHeight * 0.75) {
        rewardsData.forEach((_, index) => {
          setTimeout(() => {
            setVisibleItems(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }, index * 150); // Stagger the animations as per zip-zap specification
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`bg-black py-8 md:py-12`} ref={sectionRef}>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        {/* Centered Heading */}
        <div className="mb-12 text-center">
          <h2 className={`${headingSize} md:${headingSizeMd} font-serif font-extrabold italic leading-[0.95] tracking-tight mb-8 title`} style={{
            fontFamily: 'var(--font-title)',
          }}>
            <span style={{
              fontFamily: 'var(--font-title)',
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Earn</span> Rewards
            <br />
            for Your <span style={{
              fontFamily: 'var(--font-title)',
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>AURA</span>
            {/* Golden underline for "Earn Rewards for Your AURA" */}
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-4 mx-auto"></div>
          </h2>
          <p className={`${textSize} text-gray-400/90 leading-[1.6] max-w-[520px] mx-auto subtitle`}>
            Transform your social media experience.
            <br />
            Every authentic post grows your aura 
            <br />
            and unlocks real rewards.
          </p>
        </div>

        {/* Rewards Card with alternating left/right layout */}
        <div className={`w-full max-w-2xl mx-auto`}>
          <div className="relative bg-transparent rounded-none border-none overflow-visible p-0 shadow-none">
            <div className={`flex flex-col ${isMobile ? 'gap-5' : 'gap-8'} relative`}>
              {rewardsData.map((reward, index) => (
                <React.Fragment key={index}>
                  <div 
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} ${gapSize} relative z-10 transition-all duration-700 ease-out transform ${
                      visibleItems[index] 
                        ? 'opacity-100 translate-x-0 scale-100' 
                        : index % 2 === 0 
                          ? '-translate-x-full opacity-0 scale-95' 
                          : 'translate-x-full opacity-0 scale-95'
                    }`}
                  >
                    {/* Icon with golden accent ring */}
                    <div className={`flex items-center justify-center ${iconSize} rounded-full bg-black border-2 border-white relative transition-all duration-500 ${
                      visibleItems[index] ? 'shadow-[0_0_20px_rgba(255,215,0,0.5)]' : 'shadow-none'
                    }`}>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/30 to-yellow-300/20 animate-pulse"></div>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/20 to-yellow-300/10 blur-sm`}></div>
                      <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-black">
                        <div className={`${iconTextSize} text-white`}>{reward.icon}</div>
                      </div>
                    </div>
                    
                    {/* Text content with golden accents */}
                    <div className={`flex flex-col ${index % 2 === 0 ? 'items-start' : 'items-end'} justify-center flex-1 transition-all duration-500 ${
                      visibleItems[index] ? 'translate-x-0' : index % 2 === 0 ? '-translate-x-2' : 'translate-x-2'
                    }`}>
                      <div className={`text-navigation font-medium text-white mb-0.5 ${titleSize} relative inline-block`}>
                        {reward.title}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500/50 to-yellow-300/30"></span>
                      </div>
                      <div className={`text-base font-medium text-yellow-300 mb-0.5 ${textSize}`}>{reward.value}</div>
                      <div className={`text-gray-300 leading-snug ${descriptionSize} ${index % 2 === 0 ? 'text-left' : 'text-right'} subtitle`}>{reward.description}</div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;