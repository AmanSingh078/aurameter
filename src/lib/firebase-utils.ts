import { database } from './firebase';
import { ref, push, set, query, orderByChild, equalTo, get, DatabaseReference, DataSnapshot } from 'firebase/database';

// Utility function to handle Firebase errors
export const handleFirebaseError = (error: any): string => {
  console.error('Firebase error:', error);
  
  if (error.code) {
    switch (error.code) {
      case 'PERMISSION_DENIED':
        return 'Permission denied. Please contact support.';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection.';
      case 'DISCONNECTED':
        return 'Disconnected from database. Please try again.';
      case 'EXPIRED_TOKEN':
        return 'Session expired. Please refresh the page.';
      case 'INDEX_NOT_DEFINED':
        return 'Database configuration issue. Please contact support.';
      default:
        return `Firebase error: ${error.message || error.code}`;
    }
  }
  
  // Handle the specific index error we're seeing
  if (error.message && error.message.includes('Index not defined')) {
    return 'The database is not properly configured. Please contact support.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Utility function to validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Utility function to validate phone number
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9+\-\s()]+$/;
  return phoneRegex.test(phone);
};

// Utility function to check if college exists
export const checkCollegeExists = async (collegeName: string): Promise<{ exists: boolean; data: any }> => {
  try {
    const collegesRef = ref(database, 'colleges');
    
    // First try the optimized query (requires index)
    try {
      const collegeQuery = query(collegesRef, orderByChild('name'), equalTo(collegeName));
      const snapshot = await get(collegeQuery);
      
      return { exists: snapshot.exists(), data: snapshot.exists() ? snapshot.val() : null };
    } catch (queryError: any) {
      // If we get an index error, fall back to loading all colleges
      if (queryError.message && queryError.message.includes('Index not defined')) {
        console.warn('Using fallback method due to missing database index');
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
      } else {
        // Re-throw if it's a different error
        throw queryError;
      }
      
      return { exists: false, data: null };
    }
  } catch (error) {
    console.error('Error checking college existence:', error);
    return { exists: false, data: null };
  }
};

// Utility function to add college name only (when user says "no thanks")
export const addCollegeNameOnly = async (
  collegeName: string
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    // Validate input
    if (!collegeName) {
      return { success: false, message: 'College name is required.' };
    }
    
    // Check if college already exists
    const collegeCheck = await checkCollegeExists(collegeName);
    
    if (collegeCheck.exists) {
      return { success: false, message: 'This college is already registered.' };
    }
    
    // Add college with empty CEO and waitlist
    const collegesRef = ref(database, 'colleges');
    const newCollegeRef = push(collegesRef);
    const collegeData = {
      name: collegeName,
      waitlist: {}
    };
    
    await set(newCollegeRef, collegeData);
    
    return { 
      success: true, 
      message: `College "${collegeName}" has been added to our database.`,
      data: collegeData
    };
  } catch (error) {
    return { success: false, message: handleFirebaseError(error) };
  }
};

// Utility function to add to waitlist
export const addToWaitlist = async (
  collegeName: string,
  name: string,
  email: string
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    // Validate inputs
    if (!collegeName || !name || !email) {
      return { success: false, message: 'All fields are required.' };
    }
    
    if (!isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    
    // Check if college exists
    const collegeCheck = await checkCollegeExists(collegeName);
    
    if (!collegeCheck.exists) {
      return { 
        success: false, 
        message: `College "${collegeName}" is not registered.` 
      };
    }
    
    // College exists, get college data
    const collegeData: any = Object.values(collegeCheck.data)[0];
    const collegeKey = Object.keys(collegeCheck.data)[0];
    
    // College exists, proceed with waitlist registration
    // (Allow joining waitlist even if there's no CEO)
    // College has a CEO or not, proceed with waitlist registration
    const waitlistRef = ref(database, `colleges/${collegeKey}/waitlist`);
    
    try {
      // Check if email already exists in waitlist
      const emailQuery = query(waitlistRef, orderByChild('email'), equalTo(email));
      const emailSnapshot = await get(emailQuery);
      
      if (emailSnapshot.exists()) {
        return { success: false, message: 'You are already on the waitlist for this college!' };
      }
    } catch (queryError: any) {
      // Handle the specific index error we're seeing
      if (queryError.message && queryError.message.includes('Index not defined')) {
        console.warn('Using fallback method to check for duplicate email due to missing database index');
        // Fallback method if index is not defined - load all waitlist entries and check manually
        try {
          const waitlistSnapshot = await get(waitlistRef);
          if (waitlistSnapshot.exists()) {
            const waitlistData = waitlistSnapshot.val();
            const waitlistEntries = Object.values(waitlistData);
            const emailExists = waitlistEntries.some((entry: any) => entry.email === email);
            if (emailExists) {
              return { success: false, message: 'You are already on the waitlist for this college!' };
            }
          }
        } catch (fallbackError) {
          console.error('Error in fallback email check:', fallbackError);
        }
      } else {
        // Re-throw if it's a different error
        throw queryError;
      }
    }
    
    // Add to waitlist
    const newWaitlistRef = push(waitlistRef);
    const waitlistEntry = {
      name,
      email,
      college: collegeName, // Include college name in the entry
      timestamp: Date.now()
    };
    
    await set(newWaitlistRef, waitlistEntry);
    
    return { 
      success: true, 
      message: 'Successfully added to the waitlist! We will notify you when spots open up.',
      data: waitlistEntry
    };
  } catch (error) {
    return { success: false, message: handleFirebaseError(error) };
  }
};

// Utility function to register as Campus CEO
export const registerAsCEO = async (
  collegeName: string,
  name: string,
  email: string,
  phone: string
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    // Validate inputs
    if (!collegeName || !name || !email || !phone) {
      return { success: false, message: 'All fields are required.' };
    }
    
    if (!isValidEmail(email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    
    if (!isValidPhone(phone)) {
      return { success: false, message: 'Please enter a valid phone number.' };
    }
    
    // Check if college already exists
    const collegeCheck = await checkCollegeExists(collegeName);
    
    if (collegeCheck.exists) {
      // Check if college already has a CEO
      const collegeData: any = Object.values(collegeCheck.data)[0];
      if (collegeData.campusCEO) {
        return { success: false, message: 'This college already has a Campus CEO!' };
      } else {
        // College exists but has no CEO, update the college with CEO info
        const collegeKey = Object.keys(collegeCheck.data)[0];
        
        // Update college with CEO info
        await set(ref(database, `colleges/${collegeKey}/campusCEO`), {
          name,
          email,
          phone,
          college: collegeName, // Include college name in CEO info
          timestamp: Date.now()
        });
        
        // Add CEO to waitlist as well
        const waitlistRef = ref(database, `colleges/${collegeKey}/waitlist`);
        const newWaitlistRef = push(waitlistRef);
        await set(newWaitlistRef, {
          name,
          email,
          college: collegeName, // Include college name in the entry
          timestamp: Date.now()
        });
        
        return { 
          success: true, 
          message: 'Successfully became Campus CEO for this college! Our team will contact you within 48 hours.',
          data: { name, email, phone, college: collegeName }
        };
      }
    } else {
      // College doesn't exist, create new college with CEO
      const collegesRef = ref(database, 'colleges');
      const newCollegeRef = push(collegesRef);
      const collegeData = {
        name: collegeName,
        campusCEO: {
          name,
          email,
          phone,
          college: collegeName, // Include college name in CEO info
          timestamp: Date.now()
        },
        waitlist: {
          [newCollegeRef.key as string]: {
            name,
            email,
            college: collegeName, // Include college name in the entry
            timestamp: Date.now()
          }
        }
      };
      
      await set(newCollegeRef, collegeData);
      
      return { 
        success: true, 
        message: 'Successfully registered as Campus CEO! Our team will contact you within 48 hours.',
        data: collegeData
      };
    }
  } catch (error) {
    return { success: false, message: handleFirebaseError(error) };
  }
};

// Utility function to get all waitlist entries for a college
export const getCollegeWaitlist = async (
  collegeName: string
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    // Check if college exists
    const collegeCheck = await checkCollegeExists(collegeName);
    
    if (!collegeCheck.exists) {
      return { 
        success: false, 
        message: `College "${collegeName}" is not registered.` 
      };
    }
    
    // College exists, get college data
    const collegeData: any = Object.values(collegeCheck.data)[0];
    const collegeKey = Object.keys(collegeCheck.data)[0];
    
    // Get waitlist entries
    const waitlistRef = ref(database, `colleges/${collegeKey}/waitlist`);
    const waitlistSnapshot = await get(waitlistRef);
    
    if (waitlistSnapshot.exists()) {
      const waitlistData = waitlistSnapshot.val();
      const waitlistEntries = Object.values(waitlistData);
      return { 
        success: true, 
        message: `Found ${waitlistEntries.length} entries in the waitlist for ${collegeName}.`,
        data: { 
          college: collegeName,
          campusCEO: collegeData.campusCEO,
          waitlist: waitlistEntries
        }
      };
    } else {
      return { 
        success: true, 
        message: `No entries found in the waitlist for ${collegeName}.`,
        data: { 
          college: collegeName,
          campusCEO: collegeData.campusCEO,
          waitlist: []
        }
      };
    }
  } catch (error) {
    return { success: false, message: handleFirebaseError(error) };
  }
};

// Utility function to get all colleges with their data
export const getAllCollegesData = async (): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const collegesRef = ref(database, 'colleges');
    const snapshot = await get(collegesRef);
    
    if (snapshot.exists()) {
      const collegesData = snapshot.val();
      const collegesList = Object.entries(collegesData).map(([key, value]: [string, any]) => ({
        id: key,
        ...value
      }));
      
      return { 
        success: true, 
        message: `Found ${collegesList.length} colleges in the database.`,
        data: collegesList
      };
    } else {
      return { 
        success: true, 
        message: 'No colleges found in the database.',
        data: []
      };
    }
  } catch (error) {
    return { success: false, message: handleFirebaseError(error) };
  }
};

// Utility function to fetch colleges
export const fetchColleges = async (): Promise<string[]> => {
  try {
    const collegesRef = ref(database, 'colleges');
    const snapshot = await get(collegesRef);
    
    if (snapshot.exists()) {
      const collegesData = snapshot.val();
      return Object.values(collegesData).map((college: any) => college.name);
    } else {
      // Default colleges if none exist in database
      return [
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
    }
  } catch (error: any) {
    console.error("Error fetching colleges:", error);
    
    // Return default colleges if there's an error
    return [
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
  }
};
