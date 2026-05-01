import React, { useState, useEffect } from 'react';
import { Plus, RotateCw, MapPin, Briefcase, ChevronRight, Play, Pause, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CreateLoopModal from '../components/CreateLoopModal';

const Loops = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loops, setLoops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  const fetchLoops = async () => {
    try {
      const token = session?.access_token;
      if (!token) return;

      const response = await axios.get('http://localhost:8080/api/loops', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLoops(response.data);
    } catch (err) {
      console.error('Failed to fetch loops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoops();
  }, [session]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this loop?')) return;
    try {
      const token = session?.access_token;
      await axios.delete(`http://localhost:8080/api/loops/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchLoops();
    } catch (err) {
      alert('Failed to delete loop');
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Loops</h1>
          <p className="text-slate-400">Manage your automated job search campaigns.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 premium-gradient rounded-xl font-bold shadow-lg shadow-primary-600/20 hover:scale-105 transition-all"
        >
          <Plus size={20} />
          Create New Loop
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="glass-panel h-64 animate-pulse bg-white/5" />)
        ) : loops.length === 0 ? (
          <div className="col-span-full glass-panel p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-500">
              <RotateCw size={32} />
            </div>
            <h3 className="text-xl font-bold">No loops active</h3>
            <p className="text-slate-400 max-w-sm mx-auto">Create your first loop to start automating your job applications.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-primary-400 font-bold hover:text-primary-300 transition-colors"
            >
              Get started →
            </button>
          </div>
        ) : loops.map((loop) => (
          <div key={loop.id} className="glass-panel p-6 group hover:border-primary-500/30 transition-all flex flex-col h-full">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center text-primary-400">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary-400 transition-colors">{loop.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin size={12} />
                    {loop.location}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                loop.status === 'ACTIVE' ? 'bg-green-400/10 text-green-400' : 'bg-white/10 text-slate-400'
              }`}>
                {loop.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Applications</p>
                <p className="text-2xl font-bold">{loop.applicationsCount || 0}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Keywords</p>
                <p className="text-xs font-medium truncate">{loop.keywords}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
              <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                {loop.status === 'ACTIVE' ? <Pause size={14} /> : <Play size={14} />}
                {loop.status === 'ACTIVE' ? 'Pause' : 'Resume'}
              </button>
              <button 
                onClick={() => handleDelete(loop.id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateLoopModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchLoops}
      />
    </div>
  );
};

export default Loops;
