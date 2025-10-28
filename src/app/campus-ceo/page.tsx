"use client";

import CampusCEOSection from '@/components/sections/campus-ceo-section';
import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';

export default function CampusCEOPage() {
  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <NavigationHeader />
      <CampusCEOSection />
      <Footer />
    </main>
  );
}