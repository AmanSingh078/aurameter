"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { database } from '@/lib/firebase';
import { ref, push, set, query, orderByChild, equalTo, get } from 'firebase/database';
import { fetchColleges, addToWaitlist, registerAsCEO, isValidEmail, isValidPhone, checkCollegeExists, addCollegeNameOnly, getCollegeWaitlist, getAllCollegesData } from '@/lib/firebase-utils';

interface CollegeData {
  name: string;
  campusCEO?: {
    name: string;
    email: string;
    phone: string;
    timestamp: number;
  };
  waitlist: Record<string, {
    name: string;
    email: string;
    timestamp: number;
  }>;
}

interface College {
  name: string;
  // Add other college properties as needed
}

export default function WaitlistSection() {
  const searchParams = useSearchParams();
  const [ceoData, setCeoData] = useState({
    name: '',
    college: '',
    email: '',
    phone: ''
  });
  const [allColleges, setAllColleges] = useState<string[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);
  const [showCollegeList, setShowCollegeList] = useState(false);
  const [showCeoCollegeList, setShowCeoCollegeList] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showCeoConfirmation, setShowCeoConfirmation] = useState(false); // New state for CEO confirmation
  const [selectedCollege, setSelectedCollege] = useState(''); // New state for selected college
  const collegeInputRef = useRef<HTMLInputElement>(null);
  const ceoCollegeInputRef = useRef<HTMLInputElement>(null);

  // Fetch colleges from Firebase
  useEffect(() => {
    const loadColleges = async () => {
      setInitialLoading(true);
      try {
        const colleges = await fetchColleges();
        setAllColleges(colleges);
      } catch (error) {
        console.error("Error loading colleges:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    
    loadColleges();
  }, []);
  
  // Enhanced college data with CEO status
  const [collegeData, setCollegeData] = useState<Record<string, { hasCEO: boolean }>>({});
  
  // Load college data with CEO status
  const loadCollegeData = async () => {
    try {
      const result = await getAllCollegesData();
      if (result.success && result.data) {
        const collegeInfo: Record<string, { hasCEO: boolean }> = {};
        result.data.forEach((college: any) => {
          collegeInfo[college.name] = { 
            hasCEO: !!college.campusCEO 
          };
        });
        setCollegeData(collegeInfo);
      }
    } catch (error) {
      console.error("Error loading college data:", error);
    }
  };
  
  // Load college data when component mounts
  useEffect(() => {
    loadCollegeData();
  }, []);
  
  // Refresh college data when needed
  const refreshCollegeData = () => {
    loadCollegeData();
  };
  

  
  // Handle CEO form input changes
  const handleCeoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCeoData(prev => ({ ...prev, [name]: value }));
    
    // Handle college autocomplete
    if (name === 'college') {
      handleCeoCollegeSearch(value);
    }
  };
  
  // Handle college search for CEO form
  const handleCeoCollegeSearch = async (value: string) => {
    if (value.length < 2) {
      setFilteredColleges([]);
      setShowCeoCollegeList(false);
      return;
    }
    
    // Only show colleges that exist in the database
    // For CEO form, we might want to filter out colleges that already have CEOs
    const filtered = allColleges.filter(college => 
      college.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5);
    
    setFilteredColleges(filtered);
    setShowCeoCollegeList(filtered.length > 0);
  };
  
  // Select college from autocomplete
  const selectCollege = (college: string) => {
    setCeoData(prev => ({ ...prev, college }));
    setShowCeoCollegeList(false);
  };
  
  // Handle clicking outside autocomplete
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (collegeInputRef.current && !collegeInputRef.current.contains(e.target as Node)) {
        setShowCollegeList(false);
      }
      if (ceoCollegeInputRef.current && !ceoCollegeInputRef.current.contains(e.target as Node)) {
        setShowCeoCollegeList(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  
  // Check if college exists in database
  const checkCollegeExists = async (collegeName: string) => {
    try {
      const collegesRef = ref(database, 'colleges');
      const collegeQuery = query(collegesRef, orderByChild('name'), equalTo(collegeName));
      const snapshot = await get(collegeQuery);
      
      return { exists: snapshot.exists(), data: snapshot.exists() ? snapshot.val() : null };
    } catch (error) {
      // Fallback method if index is not defined
      try {
        const collegesRef = ref(database, 'colleges');
        const snapshot = await get(collegesRef);
        
        if (snapshot.exists()) {
          const collegesData = snapshot.val();
          const colleges = Object.entries(collegesData).map(([key, value]: [string, any]) => ({
            key,
            ...value
          }));
          
          const college = colleges.find(c => c.name === collegeName);
          return { exists: !!college, data: college || null };
        }
      } catch (fallbackError) {
        console.error('Error checking college existence:', fallbackError);
      }
      
      return { exists: false, data: null };
    }
  };
  
  // Handle CEO confirmation response
  const handleCeoResponse = async (becomeCeo: boolean) => {
    setShowCeoConfirmation(false);
    
    if (becomeCeo) {
      // Switch to CEO form and prefill data
      setCeoData({
        name: ceoData.name,
        college: selectedCollege,
        email: ceoData.email,
        phone: ''
      });
    } else {
      // User doesn't want to become CEO, just add the college name only
      setLoading(true);
      const result = await addCollegeNameOnly(selectedCollege);
      
      if (result.success) {
        // Update local college list
        setAllColleges(prev => [...prev, selectedCollege]);
        
        // Update college data
        setCollegeData(prev => ({
          ...prev,
          [selectedCollege]: { hasCEO: false }
        }));
        
        // Show success message
        setMessage({ 
          text: `College "${selectedCollege}" has been added to our database. The next person to join from this college can become the Campus CEO.`, 
          type: 'success' 
        });
        
        // Refresh college data
        setTimeout(() => {
          refreshCollegeData();
        }, 1000);
      } else {
        setMessage({ 
          text: result.message, 
          type: 'error' 
        });
      }
      
      setLoading(false);
    }
  };
  
  // Handle CEO form submission
  const handleCeoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    // Check if college already has a CEO before submitting
    if (collegeData[ceoData.college]?.hasCEO) {
      setMessage({ 
        text: `College "${ceoData.college}" already has a Campus CEO! You can still join the waitlist instead.`, 
        type: 'error' 
      });
      setLoading(false);
      return;
    }
    
    const result = await registerAsCEO(
      ceoData.college,
      ceoData.name,
      ceoData.email,
      ceoData.phone
    );
    
    setMessage({ 
      text: result.success ? 
        `Successfully registered as Campus CEO! Our team will contact you within 48 hours.` : 
        result.message, 
      type: result.success ? 'success' : 'error' 
    });
    
    if (result.success) {
      // Update local college list
      setAllColleges(prev => [...prev, ceoData.college]);
      
      // Update college data to reflect new CEO
      setCollegeData(prev => ({
        ...prev,
        [ceoData.college]: { hasCEO: true }
      }));
      
      // Reset form
      setCeoData({ name: '', college: '', email: '', phone: '' });
      
      // Refresh college data
      setTimeout(() => {
        refreshCollegeData();
      }, 1000);
    }
    
    setLoading(false);
  };
  
  // Handle message dismissal
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Prefill form data from query parameters
  useEffect(() => {
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const college = searchParams.get('college');
    const becomeCEO = searchParams.get('becomeCEO');
    
    if (becomeCEO === 'true') {
      setCeoData({
        name: name || '',
        college: college || '',
        email: email || '',
        phone: ''
      });
    }
  }, [searchParams]);
  
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Premium Background Pattern - Simplified */}
      <div className="fixed inset-0 z-[-1]" aria-hidden="true">
        <div className="absolute inset-0 bg-transparent"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-2">
        {/* Top Bar */}
        <div className="fixed top-4 right-8 flex gap-4 z-50">
        </div>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden py-10 px-4">

          <h1 
            className="text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-1000"
            style={{
              fontFamily: 'var(--font-title)',
              background: 'linear-gradient(180deg, #ffffff 0%, #d4af37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}
          >
            Seize Your Moment to Lead<br />
            As Campus CEO!
          </h1>

          {/* Know More Button */}
          <p 
            className="text-center text-base md:text-lg max-w-2xl mb-12 transition-all duration-1000 delay-200"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: '1.7',
              fontWeight: 300,
              fontSize: '1.25rem'
            }}
          >
            AuraMeter is an AI-powered emotional social app that measures and enhances your aura — your emotional energy and positivity.
          </p>

          <div className="mb-8">
            <a 
              href="/campus-ceo" 
              className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 py-3 rounded-full font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              Know More About Campus CEO Program
            </a>
          </div>



          {/* Message display */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg max-w-md ${
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
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          )}

          {/* Show loading indicator while fetching colleges */}
          {initialLoading && (
            <div className="flex items-center justify-center mb-8">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
          )}
          
          {/* Campus CEO Form */}
          {!initialLoading && (
            <div className="w-full max-w-md mx-auto">
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-300">
                      As a Campus CEO, you'll represent our brand on your campus and earn exciting rewards!
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleCeoSubmit} className="space-y-4">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <input
                    type="text"
                    name="name"
                    value={ceoData.name}
                    onChange={handleCeoChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/2 border border-yellow-500/20 rounded-xl text-white text-base backdrop-blur-lg transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-white/4"
                    placeholder="Full name..."
                  />
                </div>

                <div className="relative" ref={ceoCollegeInputRef}>
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <input
                    type="text"
                    name="college"
                    value={ceoData.college}
                    onChange={handleCeoChange}
                    required
                    autoComplete="off"
                    className="w-full pl-12 pr-4 py-4 bg-white/2 border border-yellow-500/20 rounded-xl text-white text-base backdrop-blur-lg transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-white/4"
                    placeholder="College name..."
                  />
                  {showCeoCollegeList && filteredColleges.length > 0 && (
                    <div className="absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-black/95 border border-yellow-500/30 rounded-xl backdrop-blur-2xl opacity-100 visible translate-y-0 transition-all duration-300 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.5)] mt-1">
                      {filteredColleges.map((college, index) => (
                        <div
                          key={index}
                          className={`px-4 py-3 text-white/70 cursor-pointer transition-all duration-200 border-b border-white/3 hover:bg-yellow-500/10 hover:text-white hover:pl-6 flex justify-between items-center ${
                            collegeData[college]?.hasCEO ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                          onClick={() => !collegeData[college]?.hasCEO && selectCollege(college)}
                        >
                          <span>{college}</span>
                          {collegeData[college]?.hasCEO && (
                            <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                              Has CEO
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={ceoData.email}
                    onChange={handleCeoChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/2 border border-yellow-500/20 rounded-xl text-white text-base backdrop-blur-lg transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-white/4"
                    placeholder="Email address..."
                  />
                </div>

                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    value={ceoData.phone}
                    onChange={handleCeoChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/2 border border-yellow-500/20 rounded-xl text-white text-base backdrop-blur-lg transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-white/4"
                    placeholder="Phone number..."
                  />
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
                      Apply as Campus CEO
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                        <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-sm text-white/40 leading-relaxed">
              AuraMeter is an AI-powered emotional social app that measures<br />and enhances your aura — your emotional energy and positivity.
            </p>
            <p className="mt-4 text-sm text-white/40 leading-relaxed">
              Designed by <a href="#" className="text-yellow-500/80 underline transition-colors hover:text-yellow-500">Aurameter</a> to give you back your time.
            </p>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/30">
              Powered by ⚡ Aurameter
            </div>
          </div>
        </section>

        {/* Campus CEO Information Section */}
        <section id="campus-ceo-info" className="py-16 px-4 bg-gray-900/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-500">
              Why Become an Aurmeter Campus CEO?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/30 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-500">Leadership Opportunities</h3>
                <p className="text-gray-300">
                  As a Campus CEO, you'll represent Aurmeter on your campus and develop crucial leadership skills 
                  while inspiring your peers to join our community.
                </p>
              </div>
              
              <div className="bg-black/30 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-500">Networking & Connections</h3>
                <p className="text-gray-300">
                  Connect with fellow tech enthusiasts, industry professionals, and Aurmeter's leadership team 
                  to build valuable relationships for your future career.
                </p>
              </div>
              
              <div className="bg-black/30 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-500">Real-World Experience</h3>
                <p className="text-gray-300">
                  Gain hands-on experience in marketing, event organization, and community building while 
                  representing one of India's fastest-growing social media platforms.
                </p>
              </div>
              
              <div className="bg-black/30 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-yellow-500">Rewards & Recognition</h3>
                <p className="text-gray-300">
                  Earn exciting rewards, performance-based incentives, and official certification that 
                  enhances your resume and career prospects.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">

            </div>
          </div>
        </section>
      </div>

      {/* CEO Confirmation Modal */}
      {showCeoConfirmation && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-yellow-500/30 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Become Campus CEO?</h3>
            <p className="mb-6 text-white/80">
              The college "{selectedCollege}" is not yet registered in our system. 
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
                No, thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
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
        
        .animate-pulse-gold {
          animation: pulse-gold 2s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-click {
          animation: click-effect 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}