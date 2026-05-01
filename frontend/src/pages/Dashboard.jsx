import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Send, 
  Eye, 
  MessageSquare,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { session } = useAuth();
  const [stats, setStats] = useState([
    { label: 'Loops Active', value: '0', icon: Rocket, color: 'text-primary-400', bg: 'bg-primary-400/10' },
    { label: 'Applications Sent', value: '0', icon: Send, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Interviews', value: '0', icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Success Rate', value: '0%', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = session?.access_token;
        if (!token) return;

        const response = await axios.get('http://localhost:8080/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = response.data;
        setStats([
          { label: 'Loops Active', value: data.activeLoops, icon: Rocket, color: 'text-primary-400', bg: 'bg-primary-400/10' },
          { label: 'Applications Sent', value: data.totalApplications, icon: Send, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Interviews', value: data.interviews, icon: MessageSquare, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Success Rate', value: `${data.successRate}%`, icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-400/10' },
        ]);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session?.user?.user_metadata?.full_name || 'Chiranjeev'}!</h1>
          <p className="text-slate-400">Here is what happened with your job search today.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 premium-gradient rounded-xl font-bold shadow-lg shadow-primary-600/20"
        >
          <Rocket size={18} />
          Create New Loop
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 group hover:border-primary-500/50 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight size={10} /> Live
              </span>
            </div>
            <p className="text-2xl font-bold mb-1 tracking-tight">{loading ? '...' : stat.value}</p>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-8"
        >
          <section className="glass-panel p-8">
            <h3 className="text-lg font-bold mb-6">Active Job Search Loops</h3>
            <div className="space-y-4">
               <div className="py-10 text-center text-slate-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                Go to the "Loops" tab to manage your active searches.
              </div>
            </div>
          </section>
        </motion.div>

        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <section className="glass-panel p-8">
            <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                <p className="text-sm font-bold">Upload New CV</p>
                <p className="text-xs text-slate-500">Update your resume for AI matching</p>
              </button>
              <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                <p className="text-sm font-bold">Edit Profile</p>
                <p className="text-xs text-slate-500">Update target locations and roles</p>
              </button>
            </div>
          </section>
        </motion.aside>
      </div>
    </motion.div>
  );
};

export default Dashboard;
