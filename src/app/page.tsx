"use client";

import NavigationHeader from '@/components/sections/navigation-header';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ChatFeaturesSliderFixed from '@/components/sections/chat-features-slider-fixed';
import PremiumCarousel from '@/components/sections/premium-carousel';
import AwardsSection from '@/components/sections/awards-section';
import TeamSection from '@/components/sections/team-section';
import Footer from '@/components/sections/footer';
import ContactSection from '@/components/sections/contact-section';
import { useSmoothScroll } from '@/lib/hooks/use-smooth-scroll';
import { useEffect, useState, useRef } from 'react';
import BackToTop from '@/components/ui/back-to-top';
import ScrollEffects from '@/components/ui/scroll-effects';
import ModernAnimations from '@/components/ui/modern-animations';
import ScrollFromGround from '@/components/ui/scroll-from-ground';
import AuraTestSection from '@/components/sections/aura-test-section';

export default function Home() {
  useSmoothScroll();
  
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top on page load and check for mobile
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Check if device is mobile
    const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setIsMobile(mobile);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if elements are in viewport
  const isElementInViewport = (element: HTMLElement | null) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
  };

  const aboutVisible = isElementInViewport(aboutRef.current);
  const portfolioVisible = isElementInViewport(portfolioRef.current);
  const awardsVisible = isElementInViewport(awardsRef.current);
  const teamVisible = isElementInViewport(teamRef.current);
  const contactVisible = isElementInViewport(contactRef.current);

  return (
    <main className="min-h-screen w-full text-white overflow-x-hidden">
      <ModernAnimations />
      {!isMobile && <ScrollEffects />}
      <NavigationHeader />
      <BackToTop />
      
      <div className="space-y-0 w-full">
        <div id="hero" className="relative w-full">
          <HeroSection />
        </div>
        <div ref={aboutRef} id="about-section" className="py-4">
          <ScrollFromGround delay={100} animationType="rise">
            <AboutSection />
          </ScrollFromGround>
        </div>
        <div ref={portfolioRef} id="work" className="py-4">
          <ScrollFromGround delay={200} animationType="pop">
            <ChatFeaturesSliderFixed />
          </ScrollFromGround>
          {/* <div className="py-4">
            <PremiumCarousel />
          </div> */}
        </div>
        <div ref={awardsRef} id="recognition" className="py-4">
          <ScrollFromGround delay={300} animationType="slide">
            <AwardsSection />
          </ScrollFromGround>
        </div>
        {/* Moving PremiumCarousel below AwardsSection as requested */}
        <div className="py-4">
          <PremiumCarousel />
        </div>
        {/* New Aura Test Section */}
        <div className="py-4">
          <AuraTestSection />
        </div>
        <div ref={teamRef} id="team" className="py-4">
          {/* Removed ScrollFromGround to eliminate spacing */}
          <TeamSection />
        </div>
        <div ref={contactRef} id="contact-us" className="py-4">
          <ContactSection />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}