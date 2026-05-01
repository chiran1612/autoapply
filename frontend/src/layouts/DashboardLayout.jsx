import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, Search, User } from 'lucide-react';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content flex flex-col bg-bg-dark">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 mb-8">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search loops, companies, or jobs..." 
              className="w-full bg-surface border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full border-2 border-bg-dark"></span>
            </button>
            
            <div className="h-8 w-px bg-white/5 mx-2"></div>
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">Chiranjeev</p>
                <p className="text-[10px] text-slate-500 font-medium">Developer Account</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-primary-500 transition-all overflow-hidden">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="px-8 pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
