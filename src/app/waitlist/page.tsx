"use client";

import { Suspense } from 'react';
import WaitlistSection from '@/components/sections/waitlist-section';
import ErrorReporter from '@/components/ErrorReporter';

// Create a client component that uses useSearchParams
function WaitlistContent() {
  return (
    <div className="min-h-screen bg-black">
      <ErrorReporter />
      <WaitlistSection />
    </div>
  );
}

// Wrap the client component in Suspense
export default function WaitlistPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">Loading...</div>}>
      <WaitlistContent />
    </Suspense>
  );
}