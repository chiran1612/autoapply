import React, { useState, useEffect } from 'react';
import { ExternalLink, Search, Filter, Play } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Tracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = session?.access_token;
        if (!token) return;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/applications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(response.data);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session]);

  const handleApply = async (jobUrl) => {
    try {
      const token = session?.access_token;
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/applications/apply`, 
        { jobUrl },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (response.data.status === 'success') {
        alert('Bot launched! Check your LinkedIn or wait for completion.');
      } else {
        alert('Bot encountered an issue: ' + response.data.message);
      }
    } catch (err) {
      console.error('Apply error:', err);
      alert('Failed to launch the automation bot.');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'APPLIED': return 'bg-blue-400/10 text-blue-400';
      case 'VIEWED': return 'bg-purple-400/10 text-purple-400';
      case 'INTERVIEW': return 'bg-yellow-400/10 text-yellow-400';
      case 'REJECTED': return 'bg-red-400/10 text-red-400';
      case 'OFFER': return 'bg-green-400/10 text-green-400';
      default: return 'bg-white/10 text-slate-400';
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Application Tracker</h1>
          <p className="text-slate-400">Manage and track your automated job submissions.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-500">Total Apps</p>
            <p className="text-xl font-bold">{applications.length}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface/50 p-4 rounded-2xl border border-white/5">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search company or role..."
            className="w-full bg-surface border border-white/5 rounded-xl py-2.5 pl-11 pr-4 focus:border-primary-500 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl border border-white/5 text-sm font-medium hover:bg-white/10 transition-all">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading your applications...</div>
        ) : applications.length === 0 ? (
          <div className="py-20 text-center text-slate-500 bg-white/5 rounded-3xl border border-dashed border-white/10">
            No applications found. Create a "Loop" to start applying!
          </div>
        ) : (
          applications.map((app) => (
            <div key={app.id} className="group flex flex-col md:flex-row items-center justify-between p-6 bg-surface border border-white/5 rounded-2xl hover:border-primary-500/30 transition-all gap-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 font-bold text-xl">
                  {app.company?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{app.jobTitle}</h3>
                  <p className="text-sm text-slate-400">{app.company} • {app.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(app.status)}`}>
                  {app.status || 'Found'}
                </span>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleApply(app.jobUrl)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-primary-500/20"
                  >
                    <Play size={14} fill="currentColor" />
                    Apply with AI
                  </button>
                  <a 
                    href={app.jobUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-lg"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tracker;
