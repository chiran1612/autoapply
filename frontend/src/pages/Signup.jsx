import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, Loader2, User } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await signup(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      alert('Signup successful! Please check your email for the confirmation link.');
      navigate('/login');
    }
  };

  return (
    <div className="animate-fade-in min-h-[80vh] flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 bg-surface/50 border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">
            L
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="text-slate-400 mt-2">Start your automated job search today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 text-red-400 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-bg-dark/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-dark/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 outline-none transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-dark/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 premium-gradient rounded-xl font-bold text-white shadow-lg shadow-primary-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <UserPlus size={20} />}
            {loading ? 'Creating account...' : 'Create Free Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account? {' '}
          <Link to="/login" className="text-primary-400 font-bold hover:text-primary-300 transition-colors underline underline-offset-4">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
