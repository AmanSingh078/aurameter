"use client";

import React from 'react';
import Link from 'next/link';

const CommunityGuidelinesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="inline-block text-yellow-400 hover:text-yellow-300 transition-colors duration-300 mb-8"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="block">🌱 Aurameter</span>
            <span className="block text-yellow-400">Community Guidelines</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Aurameter is not just an app — it's a collective. A sanctuary of digital energy, where souls connect, grow, and radiate.
          </p>
        </div>

        <div className="space-y-12 text-gray-300">
          {/* What We Cultivate */}
          <section className="border-b border-yellow-500/10 pb-8">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400 flex items-center">
              <span className="mr-3">🌸</span> What We Cultivate
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-medium text-yellow-300 mb-3 flex items-center">
                  <span className="mr-2">🌸</span> Respect for all
                </h3>
                <p>No hate speech, bullying, or harassment.</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-medium text-yellow-300 mb-3 flex items-center">
                  <span className="mr-2">🌞</span> Positive energy
                </h3>
                <p>Share with intention, uplift with action.</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-medium text-yellow-300 mb-3 flex items-center">
                  <span className="mr-2">🌀</span> Authenticity
                </h3>
                <p>Be real, be kind, be present.</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-medium text-yellow-300 mb-3 flex items-center">
                  <span className="mr-2">🧿</span> Privacy and consent
                </h3>
                <p>Never share someone else's info or content without permission.</p>
              </div>
            </div>
          </section>

          {/* What We Reject */}
          <section className="border-b border-yellow-500/10 pb-8">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400 flex items-center">
              <span className="mr-3">🚫</span> What We Reject
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-medium text-yellow-300 mb-3">Harmful Behavior</h3>
                <p>Harmful, violent, or abusive behavior of any kind.</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-medium text-yellow-300 mb-3">Discrimination</h3>
                <p>Discrimination based on race, gender, sexuality, religion, or identity.</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-medium text-yellow-300 mb-3">Spam & Scams</h3>
                <p>Spamming, scamming, or exploiting the aura system.</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
                <h3 className="text-xl font-medium text-yellow-300 mb-3">Content Involving Minors</h3>
                <p>Any content involving minors in unsafe or inappropriate ways (zero tolerance).</p>
              </div>
            </div>
          </section>

          {/* Consequences */}
          <section className="border-b border-yellow-500/10 pb-8">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400 flex items-center">
              <span className="mr-3">⚖️</span> Consequences of Violating the Code
            </h2>
            
            <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
              <p className="mb-4">
                Violations will result in warnings, aura penalties, or permanent bans — depending on the severity.
              </p>
              <p>
                In extreme cases, we will cooperate with law enforcement and relevant agencies.
              </p>
            </div>
          </section>

          {/* Report Violations */}
          <section className="pb-8">
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400 flex items-center">
              <span className="mr-3">🚩</span> Report Violations
            </h2>
            
            <div className="bg-gray-900/50 p-6 rounded-xl border border-yellow-500/10">
              <p className="mb-4">
                See something that doesn't belong in our collective? Report it directly in-app or email us at{' '}
                <a 
                  href="mailto:community@aurameter.com" 
                  className="text-yellow-400 hover:text-yellow-300 underline"
                >
                  community@aurameter.com
                </a>.
              </p>
              <p className="text-yellow-300 font-medium">
                Together, we shape the energy. Let's keep this space sacred, strong, and soul-full.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelinesPage;