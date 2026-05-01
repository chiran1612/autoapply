import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary-400 bg-primary-600/10 border border-primary-600/20 rounded-full">
        ✨ Re-launching AutoApply
      </div>
      <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
        Land your dream job <br />
        <span className="text-primary-500">on autopilot.</span>
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
        Upload your CV, select the types of jobs you want, and press start. 
        LoopCVClone will mass apply on your behalf every single day.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/signup" className="px-8 py-4 premium-gradient rounded-2xl font-bold text-lg shadow-2xl shadow-primary-600/20 hover:scale-105 transition-all">
          Get Started for Free
        </Link>
        <Link to="/login" className="px-8 py-4 glass-panel bg-white/5 border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
          Sign In
        </Link>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {[
          { title: 'Auto Apply', desc: 'LoopCV collects new job postings every day and applies automatically.' },
          { title: 'Email Recruiters', desc: 'We find the email of the recruiter and send a personalized message.' },
          { title: 'Analytics', desc: 'Measure and improve your AI applications with detailed stats.' }
        ].map((feat, i) => (
          <div key={i} className="glass-panel p-8 text-left hover:border-primary-500/50 transition-colors">
            <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center text-primary-400 mb-6">
              <span className="font-bold">{i+1}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
