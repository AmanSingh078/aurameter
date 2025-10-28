"use client";

import { useEffect, useState } from 'react';

interface ErrorReport {
  timestamp: number;
  message: string;
  stack?: string;
  component: string;
}

export default function ErrorReporter() {
  const [errors, setErrors] = useState<ErrorReport[]>([]);
  
  useEffect(() => {
    // Override console.error to capture errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Log to original console
      originalConsoleError.apply(console, args);
      
      // Capture Firebase and other errors
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      
      // Check if it's a Firebase error or related to our app
      if (message.includes('Firebase') || message.includes('database') || message.includes('permission')) {
        const errorReport: ErrorReport = {
          timestamp: Date.now(),
          message,
          component: 'Unknown',
        };
        
        // Try to extract stack trace if available
        if (args.some(arg => typeof arg === 'object' && arg !== null && 'stack' in arg)) {
          const errorObj = args.find(arg => typeof arg === 'object' && arg !== null && 'stack' in arg);
          if (errorObj && typeof errorObj === 'object' && errorObj !== null) {
            errorReport.stack = (errorObj as Error).stack;
            errorReport.component = (errorObj as any).component || 'Unknown';
          }
        }
        
        setErrors(prev => [...prev.slice(-9), errorReport]); // Keep last 10 errors
      }
    };
    
    // Listen for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || String(event.reason);
      if (message.includes('Firebase') || message.includes('database')) {
        setErrors(prev => [...prev.slice(-9), {
          timestamp: Date.now(),
          message,
          stack: event.reason?.stack,
          component: 'Promise Rejection'
        }]);
      }
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      console.error = originalConsoleError;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  
  if (errors.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      {errors.map((error, index) => (
        <div 
          key={`${error.timestamp}-${index}`} 
          className="mb-2 p-3 bg-red-900/90 text-red-100 text-sm rounded-lg border border-red-700 shadow-lg"
        >
          <div className="font-bold mb-1">{error.component} Error</div>
          <div className="mb-1">{error.message}</div>
          {error.stack && (
            <details className="text-xs">
              <summary>Stack trace</summary>
              <pre className="whitespace-pre-wrap">{error.stack}</pre>
            </details>
          )}
          <div className="text-xs opacity-70 mt-1">
            {new Date(error.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
}