import React, { useState } from 'react';
import { User, Bell, Shield, Globe, CreditCard, Share2, Save, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [credentials, setCredentials] = useState({
    linkedin_email: '',
    linkedin_password: '',
    naukri_email: '',
    naukri_password: '',
    indeed_email: '',
    indeed_password: '',
    twitter_user: '',
    twitter_pass: ''
  });

  const handleCredentialChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const saveCredentials = async () => {
    setSaving(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/settings/credentials`, credentials);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save credentials', err);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { icon: User, label: 'Profile' },
    { icon: Share2, label: 'Linked Platforms' },
    { icon: Bell, label: 'Notifications' },
    { icon: Globe, label: 'Job Search Regions' },
    { icon: Shield, label: 'Privacy & Security' },
  ];

  return (
    <div className="animate-fade-in space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and platform configurations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-1">
          {tabs.map((tab, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(i)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === i ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        <div className="md:col-span-3 space-y-8">
          {activeTab === 0 && (
            <section className="glass-panel p-8 space-y-6">
              <h3 className="text-lg font-bold border-b border-white/5 pb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="Full Name" className="settings-input" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="Email Address" className="settings-input" />
                </div>
              </div>
              <button className="premium-button text-sm">Save Profile</button>
            </section>
          )}

          {activeTab === 1 && (
            <section className="glass-panel p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-lg font-bold">Platform Credentials</h3>
                <div className="flex items-center gap-2">
                   {success && <span className="text-xs text-green-400 flex items-center gap-1"><CheckCircle2 size={14}/> Saved</span>}
                   <button 
                    onClick={saveCredentials}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 premium-gradient rounded-lg font-bold text-xs shadow-lg shadow-primary-600/20 hover:scale-105 transition-all disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Save Credentials
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-primary-400 flex items-center gap-2">
                      LinkedIn
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                      <input name="linkedin_email" value={credentials.linkedin_email} onChange={handleCredentialChange} type="text" className="settings-input" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                      <input name="linkedin_password" value={credentials.linkedin_password} onChange={handleCredentialChange} type="password" class="settings-input" placeholder="••••••••" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                      Naukri
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                      <input name="naukri_email" value={credentials.naukri_email} onChange={handleCredentialChange} type="text" className="settings-input" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                      <input name="naukri_password" value={credentials.naukri_password} onChange={handleCredentialChange} type="password" class="settings-input" placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-orange-400 flex items-center gap-2">
                      Indeed
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                      <input name="indeed_email" value={credentials.indeed_email} onChange={handleCredentialChange} type="text" className="settings-input" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                      <input name="indeed_password" value={credentials.indeed_password} onChange={handleCredentialChange} type="password" class="settings-input" placeholder="••••••••" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      Twitter (X)
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Username</label>
                      <input name="twitter_user" value={credentials.twitter_user} onChange={handleCredentialChange} type="text" className="settings-input" placeholder="@username" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                      <input name="twitter_pass" value={credentials.twitter_pass} onChange={handleCredentialChange} type="password" class="settings-input" placeholder="••••••••" />
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-[10px] text-slate-500 italic">
                Note: These credentials are saved securely in your local environment and are used only for automated job applications.
              </p>
            </section>
          )}

          {(activeTab > 1) && (
             <div className="glass-panel p-12 text-center text-slate-500">
                This section is coming soon.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
