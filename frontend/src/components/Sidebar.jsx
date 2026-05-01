import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  RotateCw, 
  Table, 
  FileText, 
  Settings, 
  CreditCard,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: RotateCw, label: 'Loops', path: '/loops' },
  { icon: Table, label: 'Tracker', path: '/tracker' },
  { icon: FileText, label: 'CV Builder', path: '/cv-builder' },
  { icon: CreditCard, label: 'Pricing', path: '/pricing' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-surface border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center font-bold text-lg">
          L
        </div>
        <span className="font-bold text-xl tracking-tight">LoopCV <span className="text-primary-500">Clone</span></span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-primary-600/10 text-primary-400 border border-primary-600/20" 
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            <ChevronRight 
              size={14} 
              className={cn(
                "transition-transform duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1",
                "isActive" && "opacity-100"
              )} 
            />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
        
        <div className="mt-4 p-4 glass-panel bg-primary-600/5 border-primary-600/10">
          <p className="text-xs text-slate-400 mb-2">User Session</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white truncate max-w-[120px]">
              {user?.email?.split('@')[0] || 'Guest'}
            </span>
            <span className="text-[10px] bg-primary-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
