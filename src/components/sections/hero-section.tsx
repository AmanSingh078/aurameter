"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/use-scroll-animation';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import { checkCollegeExists, addCollegeNameOnly, registerAsCEO, addToWaitlist, fetchColleges } from '@/lib/firebase-utils';

const HeroSection = () => {
  const { scrollY } = useScrollAnimation();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: ''
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [allColleges, setAllColleges] = useState<string[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);
  const [showCollegeList, setShowCollegeList] = useState(false);
  const [showCeoModal, setShowCeoModal] = useState(false);
  const [tempCollege, setTempCollege] = useState('');
  const collegeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Trigger mount animation
    setIsMounted(true);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Handle college autocomplete
    if (name === 'college') {
      handleCollegeSearch(value);
    }
  };
  
  // Handle college search
  const handleCollegeSearch = async (value: string) => {
    if (value.length < 2) {
      setFilteredColleges([]);
      setShowCollegeList(false);
      return;
    }
    
    try {
      const colleges = await fetch('/api/colleges/search?q=' + encodeURIComponent(value))
        .then(res => res.json())
        .then(data => data.colleges || []);
      
      const filtered = colleges.slice(0, 5);
      setFilteredColleges(filtered);
      setShowCollegeList(filtered.length > 0);
    } catch (error) {
      // Fallback to local filtering if API fails
      const allColleges = await getAllCollegesFromFirebase();
      const filtered = allColleges
        .filter(college => college.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      
      setFilteredColleges(filtered);
      setShowCollegeList(filtered.length > 0);
    }
  };
  
  // Get all colleges from Firebase
  const getAllCollegesFromFirebase = async (): Promise<string[]> => {
    try {
      const colleges = await fetchColleges();
      return colleges;
    } catch (error) {
      console.error("Error fetching colleges:", error);
      return [];
    }
  };
  
  // Select college from autocomplete
  const selectCollege = (college: string) => {
    setFormData(prev => ({ ...prev, college }));
    setShowCollegeList(false);
  };
  
  // Handle clicking outside autocomplete
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (collegeInputRef.current && !collegeInputRef.current.contains(e.target as Node)) {
        setShowCollegeList(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about-section');
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    // Validate inputs
    if (!formData.name || !formData.email || !formData.college) {
      setMessage({ text: 'Please fill in all fields.', type: 'error' });
      setLoading(false);
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      setLoading(false);
      return;
    }
    
    try {
      // Check if college exists in the database
      const collegeCheck = await checkCollegeExists(formData.college);
      
      if (!collegeCheck.exists) {
        // College doesn't exist, ask if user wants to become campus CEO
        setTempCollege(formData.college);
        setShowCeoModal(true);
        setLoading(false);
        return;
      }
      
      // College exists, add user to waitlist regardless of CEO status
      const result = await addToWaitlist(
        formData.college,
        formData.name,
        formData.email
      );
      
      if (result.success) {
        setMessage({ 
          text: result.message, 
          type: 'success' 
        });
        
        // Reset form
        setFormData({ name: '', email: '', college: '' });
      } else {
        setMessage({ 
          text: result.message, 
          type: 'error' 
        });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle CEO modal response
  const handleCeoResponse = async (becomeCeo: boolean) => {
    setShowCeoModal(false);
    
    if (becomeCeo) {
      // Navigate to the waitlist page with form data as query parameters
      const queryParams = new URLSearchParams({
        name: formData.name,
        college: tempCollege,
        email: formData.email,
        becomeCEO: 'true'
      }).toString();
      
      router.push(`/waitlist?${queryParams}`);
    } else {
      // User doesn't want to become CEO, just add the college name only
      try {
        const result = await addCollegeNameOnly(tempCollege);
        
        if (result.success) {
          // Add user to waitlist for this college
          const waitlistResult = await addToWaitlist(
            tempCollege,
            formData.name,
            formData.email
          );
          
          if (waitlistResult.success) {
            setMessage({ 
              text: `College "${tempCollege}" has been added to our database. You've been added to the waitlist!`, 
              type: 'success' 
            });
            
            // Reset form
            setFormData({ name: '', email: '', college: '' });
          } else {
            setMessage({ 
              text: waitlistResult.message, 
              type: 'error' 
            });
          }
        } else {
          setMessage({ 
            text: result.message, 
            type: 'error' 
          });
        }
      } catch (error) {
        setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
      }
    }
  };

  // Calculate wave effect for scroll indicator
  const waveEffect = Math.sin(scrollY * 0.02) * 10;

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }
          
          @keyframes shimmer {
            0%, 100% { opacity: 0.3; transform: rotate(0deg); }
            50% { opacity: 0.6; transform: rotate(180deg); }
          }
          
          @keyframes pulse-gold {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.2); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(10px); }
          }
          
          @keyframes click-effect {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }
          
          // Removed unused animations
          
          .animate-pulse-gold {
            animation: pulse-gold 2s ease-in-out infinite;
          }
          
          .animate-bounce {
            animation: bounce 2s ease-in-out infinite;
          }
          
          .animate-click {
            animation: click-effect 0.3s ease-in-out;
          }
        `}
      </style>
      
      {/* Premium Background Pattern - Simplified */}
      <div className="fixed inset-0 z-[-1]" aria-hidden="true">
        <div className="absolute inset-0 bg-transparent"></div>
      </div>

      <section className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden py-10 px-4">

        {/* Main Heading */}
        <h1 
          className={`text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-1000 title ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-10'}`}
          style={{
            fontFamily: 'var(--font-title)',
            background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}
        >
          Experience Social Media.<br />Like Never Before.
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-center text-base md:text-lg max-w-2xl mb-4 transition-all duration-1000 delay-200 subtitle ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            lineHeight: '1.7',
            fontWeight: 300,
            fontSize: '1.25rem'
          }}
        >
          Farm your aura. Reap your rewards. Powered by Aura AI
        </p>

        {/* Email and College Input Form */}
        <div className="w-full max-w-md mx-auto mt-8 mb-12">
          {/* Message display */}
          {message && (
            <div className={`mb-4 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
                : message.type === 'error' 
                  ? 'bg-red-500/10 text-red-300 border border-red-500/20' 
                  : 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {message.type === 'success' ? (
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : message.type === 'error' ? (
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 10-16 0 8 8 0 0016 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-white/2 border border-yellow-500/20 rounded-xl text-white text-base backdrop-blur-lg transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-white/4"
                placeholder="Full name..."
              />
            </div>
            
            <div className="relative">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-white/2 border border-yellow-500/20 rounded-xl text-white text-base backdrop-blur-lg transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-white/4"
                placeholder="Email address..."
              />
            </div>

            <div className="relative" ref={collegeInputRef}>
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                required
                autoComplete="off"
                className="w-full pl-12 pr-4 py-4 bg-white/2 border border-yellow-500/20 rounded-xl text-white text-base backdrop-blur-lg transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-white/4"
                placeholder="College name..."
              />
              {showCollegeList && filteredColleges.length > 0 && (
                <div className="absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-black/95 border border-yellow-500/30 rounded-xl backdrop-blur-2xl opacity-100 visible translate-y-0 transition-all duration-300 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.5)] mt-1">
                  {filteredColleges.map((college, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 text-white/70 cursor-pointer transition-all duration-200 border-b border-white/3 hover:bg-yellow-500/10 hover:text-white hover:pl-6"
                      onClick={() => selectCollege(college)}
                    >
                      {college}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-yellow-500/8 border border-yellow-500/30 rounded-xl text-white text-base font-medium backdrop-blur-lg transition-all duration-300 hover:bg-yellow-500/12 hover:border-yellow-500/50 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Join Waitlist
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mb-20">
          {[
            { name: 'instagram', url: 'https://www.instagram.com/app.aurameter/' },
            { name: 'linkedin', url: 'https://www.linkedin.com/company/aurameter/posts/?feedView=all' }
          ].map((social, index) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(212, 175, 55, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {social.name === 'linkedin' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" style={{ fill: 'rgba(255, 255, 255, 0.7)' }}>
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              )}
              {social.name === 'instagram' && (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)}
            </a>
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer transition-all duration-300 animate-bounce"
          onClick={scrollToNextSection}
          style={isMobile ? {} : { 
            transform: `translateX(-50%) translateY(${waveEffect}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.001)
          }}
        >
          <ChevronDownIcon className="w-6 h-6 text-white/30 hover:text-white transition-colors" />
        </div>
      </section>
      
      {/* CEO Confirmation Modal */}
      {showCeoModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-yellow-500/30 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Become Campus CEO?</h3>
            <p className="mb-6 text-white/80">
              The college "{tempCollege}" is not yet registered in our system. 
              Would you like to become the Campus CEO for this college?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleCeoResponse(true)}
                className="flex-1 py-3 px-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 font-medium hover:bg-yellow-500/20 transition-colors"
              >
                Yes, I'll be CEO
              </button>
              <button
                onClick={() => handleCeoResponse(false)}
                className="flex-1 py-3 px-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors"
              >
                No, just add college
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;