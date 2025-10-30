"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AuraTestSection = () => {
  return (
    <section className="relative overflow-hidden text-neutral-100 py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <h2 
            className="text-3xl md:text-5xl font-bold mb-6 title"
            style={{
              fontFamily: 'var(--font-title)',
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Experience the Power of Emotional AI
          </h2>
          
          <p 
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed subtitle"
            style={{
              fontFamily: 'var(--font-subtitle)',
            }}
          >
            Discover how AuraMeter understands your emotions and transforms your social interactions into rewarding experiences.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center">
            <Link href="/waitlist">
              <Button 
                size="lg" 
                className="bg-yellow-500/10 border border-yellow-500/30 text-white font-medium py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] backdrop-blur-lg"
                style={{
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Test Aura Emotional AI Now
              </Button>
            </Link>
          </div>
          
          {/* Supporting text */}
          <p 
            className="mt-8 text-gray-400 text-sm subtitle"
            style={{
              fontFamily: 'var(--font-subtitle)',
            }}
          >
            Join thousands of users already experiencing the future of emotional intelligence
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuraTestSection;