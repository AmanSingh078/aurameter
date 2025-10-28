"use client";

import { useState, useEffect } from 'react';
import { getCollegeWaitlist } from '@/lib/firebase-utils';

export default function CollegeDashboard() {
  const [collegeName, setCollegeName] = useState('');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await getCollegeWaitlist(collegeName);
      
      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error fetching dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-500">
          College CEO Dashboard
        </h1>
        
        <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="Enter your college name..."
              className="flex-1 px-4 py-3 bg-black/30 border border-yellow-500/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-500/50"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 font-medium hover:bg-yellow-500/20 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 text-red-300">
            {error}
          </div>
        )}
        
        {dashboardData && (
          <div className="space-y-8">
            {/* College Info */}
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-yellow-500">
                {dashboardData.college}
              </h2>
              
              {dashboardData.campusCEO ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/30 border border-yellow-500/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 text-yellow-300">Your Information</h3>
                    <div className="space-y-2">
                      <p><span className="text-white/70">Name:</span> {dashboardData.campusCEO.name}</p>
                      <p><span className="text-white/70">Email:</span> {dashboardData.campusCEO.email}</p>
                      <p><span className="text-white/70">Phone:</span> {dashboardData.campusCEO.phone}</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 border border-yellow-500/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 text-yellow-300">Dashboard Stats</h3>
                    <p><span className="text-white/70">Waitlist Size:</span> {dashboardData.waitlist.length} students</p>
                    <p className="mt-3 text-sm text-white/50">
                      As the Campus CEO, you can promote AuraMeter to your fellow students and manage your college's waitlist.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-300">
                  <p>This college does not have a Campus CEO assigned yet.</p>
                </div>
              )}
            </div>
            
            {/* Waitlist Entries */}
            {dashboardData.waitlist.length > 0 && (
              <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-yellow-300">
                  Waitlist ({dashboardData.waitlist.length} students)
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-yellow-500/20">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Registration Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.waitlist.map((entry: any, index: number) => (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                          <td className="py-3 px-4">{entry.name}</td>
                          <td className="py-3 px-4">{entry.email}</td>
                          <td className="py-3 px-4">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        
        {!dashboardData && !loading && (
          <div className="text-center py-12 text-white/50">
            <p>Enter your college name above to access your dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
}