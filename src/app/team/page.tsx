import AboutTeamSection from '@/components/sections/about-team-section';
import React from 'react';
import Link from 'next/link';

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold title" style={{ fontFamily: 'var(--font-title)' }}>Our Team</h1>
          <Link href="/" className="text-gold hover:text-yellow-500 transition-colors">
            Back to Home
          </Link>
        </div>
        <AboutTeamSection />
        <div className="mt-12 text-center">
          <Link 
            href="/know-more" 
            className="inline-block px-6 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300"
          >
            Learn More About Aurameter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;