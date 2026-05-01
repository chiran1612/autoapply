import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await login(email, password);
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="animate-fade-in min-h-[80vh] flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 bg-surface/50 border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">
            L
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 mt-2">Sign in to manage your loops</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 text-red-400 text-sm rounded-xl flex items-center gap-2">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" size={14} className="text-[10px] font-bold text-primary-400 hover:text-primary-300">Forgot?</Link>
            </div>
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
            className="w-full py-4 premium-gradient rounded-xl font-bold text-white shadow-lg shadow-primary-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? {' '}
          <Link to="/signup" className="text-primary-400 font-bold hover:text-primary-300 transition-colors underline underline-offset-4">Sign up for free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
