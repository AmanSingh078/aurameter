'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
              🔒 Privacy Policy
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your privacy is our priority. Learn how we protect your data.
            </p>
            <p className="mt-4 text-gray-400">Last updated: October 30, 2025</p>
          </div>

          <div className="space-y-12 text-gray-300">
            {/* Overview */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-400 flex items-center">
                <span className="mr-2">📋</span> Overview
              </h2>
              <div className="space-y-4">
                <p>
                  At Aurameter, we believe that privacy is a fundamental human right. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform. We are committed to transparency and giving you control over your data.
                </p>
                <p>
                  By using Aurameter, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">📊</span> Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-yellow-300 mb-3">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and email address when you create an account</li>
                    <li>Profile information you choose to share</li>
                    <li>Photos you upload for aura analysis</li>
                    <li>Communication preferences and settings</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-yellow-300 mb-3">Usage Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>How you interact with our platform</li>
                    <li>Features you use and content you engage with</li>
                    <li>Device information and browser type</li>
                    <li>IP address and general location data</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-yellow-300 mb-3">Aura Analysis Data</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Photos processed for energy analysis</li>
                    <li>AI-generated insights and aura points</li>
                    <li>Analysis results and recommendations</li>
                    <li>Patterns in your energy over time</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">🎯</span> How We Use Your Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">🔮</span> Aura Analysis
                  </h3>
                  <p>Process your photos to provide energy insights and aura points</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">👥</span> Community Features
                  </h3>
                  <p>Enable connections with other users who share similar energy</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">📈</span> Personalization
                  </h3>
                  <p>Improve your experience with tailored content and features</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">🛡️</span> Security
                  </h3>
                  <p>Protect your account and prevent unauthorized access</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">🔧</span> Platform Improvement
                  </h3>
                  <p>Enhance our services and develop new features</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">📧</span> Communication
                  </h3>
                  <p>Send important updates and respond to your inquiries</p>
                </div>
              </div>
            </section>

            {/* Data Protection & Security */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">🔐</span> Data Protection & Security
              </h2>
              <p className="mb-6">
                We implement industry-standard security measures to protect your personal information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">🔒</span> End-to-End Encryption
                  </h3>
                  <p>All data is encrypted in transit and at rest</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">🛡️</span> Secure Infrastructure
                  </h3>
                  <p>Hosted on secure cloud platforms with regular security audits</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">👤</span> Access Controls
                  </h3>
                  <p>Strict access controls and authentication measures</p>
                </div>
                
                <div className="bg-gray-800/30 p-5 rounded-xl border border-yellow-500/10">
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 flex items-center">
                    <span className="mr-2">🔄</span> Regular Backups
                  </h3>
                  <p>Automatic backups to prevent data loss</p>
                </div>
              </div>
            </section>

            {/* Data Sharing & Third Parties */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">🤝</span> Data Sharing & Third Parties
              </h2>
              <p className="mb-6">
                We are committed to protecting your privacy and do not sell your personal information. We may share your data only in the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <span className="text-yellow-400 font-medium mr-2">With Your Consent</span>
                  <span>When you explicitly agree to share specific information</span>
                </div>
                <div className="flex">
                  <span className="text-yellow-400 font-medium mr-2">Service Providers</span>
                  <span>Trusted partners who help us operate our platform (with strict data protection agreements)</span>
                </div>
                <div className="flex">
                  <span className="text-yellow-400 font-medium mr-2">Legal Requirements</span>
                  <span>When required by law or to protect our rights and safety</span>
                </div>
                <div className="flex">
                  <span className="text-yellow-400 font-medium mr-2">Business Transfers</span>
                  <span>In case of merger, acquisition, or sale of assets (with privacy protections)</span>
                </div>
              </div>
            </section>

            {/* Your Rights & Choices */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">🎛️</span> Your Rights & Choices
              </h2>
              <p className="mb-6">
                You have control over your personal information. Here are your rights:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">Access</span>
                  <span>View and download your personal data</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">Correction</span>
                  <span>Update or correct inaccurate information</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">Deletion</span>
                  <span>Request deletion of your personal data</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">Portability</span>
                  <span>Export your data in a machine-readable format</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">Restriction</span>
                  <span>Limit how we process your information</span>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 font-medium mr-2">Objection</span>
                  <span>Object to certain types of data processing</span>
                </div>
              </div>
            </section>

            {/* Cookies & Tracking */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">🍪</span> Cookies & Tracking
              </h2>
              <p className="mb-6">
                We use cookies and similar technologies to enhance your experience:
              </p>
              
              <div className="space-y-4">
                <div>
                  <span className="text-yellow-400 font-medium">Essential Cookies</span>
                  <span className="ml-2">Required for basic platform functionality</span>
                </div>
                <div>
                  <span className="text-yellow-400 font-medium">Analytics Cookies</span>
                  <span className="ml-2">Help us understand how you use our platform</span>
                </div>
                <div>
                  <span className="text-yellow-400 font-medium">Preference Cookies</span>
                  <span className="ml-2">Remember your settings and preferences</span>
                </div>
              </div>
              
              <p className="mt-4">
                You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect platform functionality.
              </p>
            </section>

            {/* Contact Us */}
            <section className="border-b border-yellow-500/10 pb-8">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">📞</span> Contact Us
              </h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 font-medium mr-2">📧 Email</span>
                  <a href="mailto:privacy@aurameter.com" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                    privacy@aurameter.com
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 font-medium mr-2">🌐 Website</span>
                  <span>www.aurameter.com/privacy</span>
                </div>
                <div>
                  <span className="text-yellow-400 font-medium">📮 Mail</span>
                  <div className="mt-2 ml-2">
                    <p>Privacy Team</p>
                    <p>Aurameter Inc.</p>
                    <p>123 Energy Street</p>
                    <p>Mindful City, MC 12345</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400 flex items-center">
                <span className="mr-2">📝</span> Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Posting the new policy on our website</li>
                <li>Sending you an email notification</li>
                <li>Displaying a notice in the app</li>
              </ul>
              
              <p className="mt-4">
                Your continued use of Aurameter after any changes indicates your acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}