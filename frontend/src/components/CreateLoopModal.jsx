import React, { useState } from 'react';
import { X, Rocket, MapPin, Briefcase, Hash, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreateLoopModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    keywords: '',
  });
  const { user, session } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = session?.access_token;

      await axios.post(`${import.meta.env.VITE_API_URL}/loops`, {
        ...formData,
        user_id: user?.id || 'audit-tester'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      onSuccess();
      onClose();
    } catch (err) {
      alert('Failed to create loop. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-dark/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-panel w-full max-w-lg p-8 bg-surface shadow-2xl border-white/10 relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Create New Loop</h2>
          <p className="text-slate-400 text-sm">Configure your automated job search campaign.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-bg-dark/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 outline-none transition-all"
                placeholder="e.g. Senior React Developer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-bg-dark/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 outline-none transition-all"
                placeholder="e.g. London, Remote"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Keywords</label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                className="w-full bg-bg-dark/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 outline-none transition-all"
                placeholder="e.g. TypeScript, Node.js, AWS"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 glass-panel bg-white/5 border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-[2] py-4 premium-gradient rounded-xl font-bold text-white shadow-lg shadow-primary-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Rocket size={20} />}
              {loading ? 'Creating...' : 'Start My Loop'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLoopModal;
