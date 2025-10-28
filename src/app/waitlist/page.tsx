"use client";

import WaitlistSection from '@/components/sections/waitlist-section';
import ErrorReporter from '@/components/ErrorReporter';

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-black">
      <ErrorReporter />
      <WaitlistSection />
    </div>
  );
}