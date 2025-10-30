'use client';

import React from 'react';
import Link from 'next/link';

export default function ChildSafety() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 mb-8 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-gray-900/50 border border-yellow-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              👶 Child Safety
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Protecting the wellbeing of young users is our top priority.
            </p>
          </div>

          <div className="space-y-12 text-gray-300">
            {/* Our Commitment */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Our Commitment to Child Safety</h2>
              <p className="mb-4">
                At Aurameter, we are deeply committed to creating a safe and positive online environment for all users, especially children and teenagers. We take child safety very seriously and have implemented comprehensive measures to protect young users.
              </p>
              <p>
                Our platform is designed with built-in safety features and strict community guidelines to ensure a secure experience for users of all ages. We continuously monitor and update our safety protocols to address emerging risks and maintain the highest standards of protection.
              </p>
            </section>

            {/* Age Requirements */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">📅</span> Age Requirements
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">🚫</span>
                  <span><strong>Under 13:</strong> Users under 13 years of age are not permitted to create accounts or use our Service.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">👥</span>
                  <span><strong>13-17:</strong> Users between 13 and 17 years of age must have parental consent to use our Service.</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">✅</span>
                  <span><strong>Verification:</strong> We may require age verification for accounts that appear to belong to minors.</span>
                </div>
              </div>
            </section>

            {/* Safety Features */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">🛡️</span> Safety Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3">Privacy Controls</h3>
                  <p>Granular privacy settings to control who can see your content and interact with you</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3">Content Moderation</h3>
                  <p>Advanced AI systems to detect and remove inappropriate content automatically</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3">Reporting Tools</h3>
                  <p>Easy-to-use reporting features for users to flag concerns immediately</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3">Parental Controls</h3>
                  <p>Dedicated tools for parents to monitor and manage their teen's account activity</p>
                </div>
              </div>
            </section>

            {/* Reporting and Support */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">🚨</span> Reporting and Support
              </h2>
              <p className="mb-6">
                We provide multiple channels for reporting safety concerns and getting help:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">📱</span>
                  <span><strong>In-App Reporting:</strong> Instant reporting tools available on every screen</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">📧</span>
                  <span><strong>Email Support:</strong> Direct line to our safety team at 
                  <a href="mailto:safety@aurameter.com" className="text-yellow-500 hover:text-yellow-400 transition-colors ml-1">safety@aurameter.com</a></span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">📞</span>
                  <span><strong>24/7 Helpline:</strong> Immediate support for urgent safety concerns</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">🌐</span>
                  <span><strong>Resource Center:</strong> Educational materials for parents and teens</span>
                </div>
              </div>
            </section>

            {/* Educational Resources */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">📚</span> Educational Resources
              </h2>
              <p>
                We provide comprehensive resources to help parents and teens navigate online safety:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Digital wellness guides for healthy social media habits</li>
                <li>Parenting in the digital age workshops</li>
                <li>Online safety best practices for teenagers</li>
                <li>Recognizing and responding to cyberbullying</li>
                <li>Understanding privacy settings and controls</li>
              </ul>
            </section>

            {/* Enforcement */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">⚖️</span> Enforcement and Consequences
              </h2>
              <p>
                We take violations of our safety policies seriously and enforce consistent consequences:
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex">
                  <span className="text-yellow-400 font-medium mr-2">⚠️</span>
                  <span><strong>First Offense:</strong> Warning and mandatory safety education</span>
                </div>
                <div className="flex">
                  <span className="text-yellow-400 font-medium mr-2">⏸️</span>
                  <span><strong>Second Offense:</strong> Temporary suspension and parental notification</span>
                </div>
                <div className="flex">
                  <span className="text-yellow-400 font-medium mr-2">🚫</span>
                  <span><strong>Severe/Repeat:</strong> Permanent account ban and potential law enforcement involvement</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <h3 className="text-lg font-medium text-red-400 mb-2">Zero Tolerance Policy</h3>
                <p>
                  We maintain a zero-tolerance policy for any content or behavior involving minors in unsafe or inappropriate ways. 
                  Violations will result in immediate account termination and may be reported to law enforcement.
                </p>
              </div>
            </section>

            {/* Parental Guidance */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">👨‍👩‍👧‍👦</span> Parental Guidance
              </h2>
              <p className="mb-4">
                Parents play a crucial role in ensuring their children's online safety. We recommend:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Having open conversations about online behavior and digital citizenship</li>
                <li>Regularly reviewing privacy settings and account activity with your teen</li>
                <li>Using our parental control features to set appropriate boundaries</li>
                <li>Reporting any concerns immediately through our safety channels</li>
                <li>Participating in our educational workshops and resources</li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h3 className="text-lg font-medium text-blue-400 mb-2">Need Help?</h3>
                <p>
                  If you have concerns about a child's safety on Aurameter, contact our dedicated safety team immediately at 
                  <a href="mailto:safety@aurameter.com" className="text-yellow-500 hover:text-yellow-400 transition-colors ml-1">safety@aurameter.com</a> 
                  or call our 24/7 helpline.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}