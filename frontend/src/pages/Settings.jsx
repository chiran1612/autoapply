import React from 'react';
import { User, Bell, Shield, Globe, CreditCard } from 'lucide-react';

const Settings = () => {
  return (
    <div className="animate-fade-in space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and search configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-1">
          {[
            { icon: User, label: 'Profile' },
            { icon: Bell, label: 'Notifications' },
            { icon: Shield, label: 'Privacy & Security' },
            { icon: Globe, label: 'Job Search Regions' },
            { icon: CreditCard, label: 'Billing' },
          ].map((tab, i) => (
            <button 
              key={i} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                i === 0 ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        <div className="md:col-span-3 space-y-8">
          <section className="glass-panel p-8 space-y-6">
            <h3 className="text-lg font-bold border-b border-white/5 pb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Chiranjeev" 
                  className="w-full bg-surface border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-primary-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="chiranjeev@example.com" 
                  className="w-full bg-surface border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-primary-500 outline-none transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bio</label>
              <textarea 
                rows={4} 
                className="w-full bg-surface border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-primary-500 outline-none transition-colors resize-none"
                placeholder="Brief summary for your profile..."
              />
            </div>
            <button className="px-6 py-3 premium-gradient rounded-xl font-bold text-sm shadow-lg shadow-primary-600/20 hover:scale-105 transition-all">
              Save Changes
            </button>
          </section>

          <section className="glass-panel p-8 space-y-6">
            <h3 className="text-lg font-bold border-b border-white/5 pb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Application status updates', desc: 'Get notified when a company views your CV or sends a message.' },
                { label: 'Weekly loop reports', desc: 'Summary of all applications sent by your active loops.' },
                { label: 'New matching jobs', desc: 'Alerts for high-scoring jobs that match your profile.' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="max-w-md">
                    <p className="text-sm font-bold mb-0.5">{item.label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
