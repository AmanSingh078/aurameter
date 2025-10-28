"use client";

import { useState, useEffect, useRef } from 'react';
import { database } from '@/lib/firebase';
import { ref, push, set, query, orderByChild, equalTo, get } from 'firebase/database';

interface College {
  name: string;
  // Add other college properties as needed
}

export default function JoinSection() {
  // State for tabs
  const [activeTab, setActiveTab] = useState<'waitlist' | 'ceo'>('waitlist');
  
  // State for waitlist form
  const [waitlistData, setWaitlistData] = useState({
    name: '',
    college: '',
    email: ''
  });
  
  // State for CEO form
  const [ceoData, setCeoData] = useState({
    name: '',
    college: '',
    email: '',
    phone: ''
  });
  
  // State for autocomplete
  const [allColleges, setAllColleges] = useState<string[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);
  const [showCollegeList, setShowCollegeList] = useState(false);
  const [showCeoCollegeList, setShowCeoCollegeList] = useState(false);
  
  // State for messages
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  // State for loading
  const [loading, setLoading] = useState(false);
  
  // Refs for autocomplete
  const collegeInputRef = useRef<HTMLInputElement>(null);
  const ceoCollegeInputRef = useRef<HTMLInputElement>(null);
  
  // Fetch colleges from Firebase
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const collegesRef = ref(database, 'colleges');
        const snapshot = await get(collegesRef);
        
        if (snapshot.exists()) {
          const collegesData = snapshot.val();
          const colleges = Object.values(collegesData).map((college: any) => college.name);
          setAllColleges(colleges);
        } else {
          // Default colleges if none exist in database
          const defaultColleges = [
            "Harvard University",
            "Stanford University",
            "Massachusetts Institute of Technology",
            "California Institute of Technology",
            "University of Cambridge",
            "University of Oxford",
            "Columbia University",
            "University of Chicago",
            "Princeton University",
            "Yale University"
          ];
          setAllColleges(defaultColleges);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };
    
    fetchColleges();
  }, []);
  
  // Handle waitlist form input changes
  const handleWaitlistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWaitlistData(prev => ({ ...prev, [name]: value }));
    
    // Handle college autocomplete
    if (name === 'college') {
      handleCollegeSearch(value);
    }
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
  
  // Handle college search for waitlist form
  const handleCollegeSearch = (value: string) => {
    if (value.length < 2) {
      setFilteredColleges([]);
      setShowCollegeList(false);
      return;
    }
    
    const filtered = allColleges.filter(college => 
      college.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5);
    
    setFilteredColleges(filtered);
    setShowCollegeList(filtered.length > 0);
  };
  
  // Handle college search for CEO form
  const handleCeoCollegeSearch = (value: string) => {
    if (value.length < 2) {
      setFilteredColleges([]);
      setShowCeoCollegeList(false);
      return;
    }
    
    const filtered = allColleges.filter(college => 
      college.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5);
    
    setFilteredColleges(filtered);
    setShowCeoCollegeList(filtered.length > 0);
  };
  
  // Select college from autocomplete
  const selectCollege = (college: string, isCeoForm: boolean = false) => {
    if (isCeoForm) {
      setCeoData(prev => ({ ...prev, college }));
      setShowCeoCollegeList(false);
    } else {
      setWaitlistData(prev => ({ ...prev, college }));
      setShowCollegeList(false);
    }
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
  
  // Handle waitlist form submission
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if college already exists in Firebase
      const collegesRef = ref(database, 'colleges');
      const collegeQuery = query(collegesRef, orderByChild('name'), equalTo(waitlistData.college));
      const snapshot = await get(collegeQuery);
      
      if (snapshot.exists()) {
        // College exists, add to waitlist
        const collegeData: any = Object.values(snapshot.val())[0];
        const collegeKey = Object.keys(snapshot.val())[0];
        const waitlistRef = ref(database, `colleges/${collegeKey}/waitlist`);
        
        // Check if email already exists in waitlist
        const emailQuery = query(waitlistRef, orderByChild('email'), equalTo(waitlistData.email));
        const emailSnapshot = await get(emailQuery);
        
        if (emailSnapshot.exists()) {
          setMessage({ text: 'You are already on the waitlist for this college!', type: 'info' });
        } else {
          // Add to waitlist
          const newWaitlistRef = push(waitlistRef);
          await set(newWaitlistRef, {
            name: waitlistData.name,
            email: waitlistData.email,
            timestamp: Date.now()
          });
          
          setMessage({ 
            text: 'Successfully added to the waitlist! We will notify you when spots open up.', 
            type: 'success' 
          });
          
          // Reset form
          setWaitlistData({ name: '', college: '', email: '' });
        }
      } else {
        // College doesn't exist, ask if they want to become Campus CEO
        setMessage({ 
          text: `Your college "${waitlistData.college}" is not yet registered. Would you like to become a Campus CEO and add your college?`, 
          type: 'info' 
        });
        
        // Switch to CEO form and prefill data
        setActiveTab('ceo');
        setCeoData({
          name: waitlistData.name,
          college: waitlistData.college,
          email: waitlistData.email,
          phone: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle CEO form submission
  const handleCeoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if college already exists
      const collegesRef = ref(database, 'colleges');
      const collegeQuery = query(collegesRef, orderByChild('name'), equalTo(ceoData.college));
      const snapshot = await get(collegeQuery);
      
      if (snapshot.exists()) {
        setMessage({ text: 'This college is already registered!', type: 'info' });
      } else {
        // Add college with CEO as first waitlist entry
        const newCollegeRef = push(collegesRef);
        await set(newCollegeRef, {
          name: ceoData.college,
          campusCEO: {
            name: ceoData.name,
            email: ceoData.email,
            phone: ceoData.phone,
            timestamp: Date.now()
          },
          waitlist: {
            [newCollegeRef.key as string]: {
              name: ceoData.name,
              email: ceoData.email,
              timestamp: Date.now()
            }
          }
        });
        
        // Update local college list
        setAllColleges(prev => [...prev, ceoData.college]);
        
        setMessage({ 
          text: 'Successfully applied as Campus CEO! Our team will contact you within 48 hours.', 
          type: 'success' 
        });
        
        // Reset form
        setCeoData({ name: '', college: '', email: '', phone: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Waitlist</h1>
            <p className="text-gray-600 mb-6">Join the waitlist for your college or apply to become a Campus CEO</p>
          </div>
          
          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'waitlist'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('waitlist')}
            >
              Join Waitlist
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'ceo'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('ceo')}
            >
              Become Campus CEO
            </button>
          </div>
          
          {/* Message display */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800' 
                : message.type === 'error' 
                  ? 'bg-red-50 text-red-800' 
                  : 'bg-blue-50 text-blue-800'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {message.type === 'success' ? (
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : message.type === 'error' ? (
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Waitlist Form */}
          {activeTab === 'waitlist' && (
            <form onSubmit={handleWaitlistSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={waitlistData.name}
                    onChange={handleWaitlistChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                  College Name
                </label>
                <div className="relative" ref={collegeInputRef}>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    value={waitlistData.college}
                    onChange={handleWaitlistChange}
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Start typing your college name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  
                  {/* Autocomplete dropdown */}
                  {showCollegeList && filteredColleges.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden">
                      <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {filteredColleges.map((college, index) => (
                          <li
                            key={index}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                            onClick={() => selectCollege(college)}
                          >
                            <div className="flex items-center">
                              <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                              </svg>
                              <span className="font-normal block truncate">{college}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={waitlistData.email}
                    onChange={handleWaitlistChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your email address"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
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
                  'Join Waitlist'
                )}
              </button>
            </form>
          )}
          
          {/* Campus CEO Form */}
          {activeTab === 'ceo' && (
            <form onSubmit={handleCeoSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      As a Campus CEO, you'll represent our brand on your campus and earn exciting rewards!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="mx-auto bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Leadership</h3>
                  <p className="mt-1 text-xs text-gray-500">Opportunities</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="mx-auto bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Rewards</h3>
                  <p className="mt-1 text-xs text-gray-500">And Incentives</p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="mx-auto bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Network</h3>
                  <p className="mt-1 text-xs text-gray-500">Building</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="ceo-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="ceo-name"
                    name="name"
                    value={ceoData.name}
                    onChange={handleCeoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="ceo-college" className="block text-sm font-medium text-gray-700 mb-1">
                  College Name
                </label>
                <div className="relative" ref={ceoCollegeInputRef}>
                  <input
                    type="text"
                    id="ceo-college"
                    name="college"
                    value={ceoData.college}
                    onChange={handleCeoChange}
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Start typing your college name"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  
                  {/* Autocomplete dropdown */}
                  {showCeoCollegeList && filteredColleges.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden">
                      <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {filteredColleges.map((college, index) => (
                          <li
                            key={index}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                            onClick={() => selectCollege(college, true)}
                          >
                            <div className="flex items-center">
                              <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                              </svg>
                              <span className="font-normal block truncate">{college}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="ceo-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="ceo-email"
                    name="email"
                    value={ceoData.email}
                    onChange={handleCeoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your email address"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={ceoData.phone}
                    onChange={handleCeoChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter your phone number"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition"
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
                  'Apply as Campus CEO'
                )}
              </button>
            </form>
          )}
          
          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">1.2K+</p>
                <p className="text-sm text-gray-500">Students Joined</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">85</p>
                <p className="text-sm text-gray-500">Campuses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">32</p>
                <p className="text-sm text-gray-500">Campus CEOs</p>
              </div>
            </div>
          </div>
          
          {/* Learn more link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setActiveTab('ceo')}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Learn more about Campus CEO program
              <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}