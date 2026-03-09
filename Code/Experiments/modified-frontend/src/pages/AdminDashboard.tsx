import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Train, 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  Settings as SettingsIcon, 
  LogOut,
  Search,
  MapPin,
  Shield
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { SidebarItem } from '../components/admin/SidebarItem';
import { DashboardOverview } from '../components/admin/DashboardOverview';
import { ManageTrains } from '../components/admin/ManageTrains';
import { ManageStations } from '../components/admin/ManageStations';
import { ViewAccounts } from '../components/admin/ViewAccounts';
import { ManageAdmins } from '../components/admin/ManageAdmins';
import { SettingsView } from '../components/admin/SettingsView';
import { DataManagement } from '../components/admin/DataManagement';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'manage-trains':
        return <ManageTrains />;
      case 'manage-stations':
        return <ManageStations />;
      case 'data-management':
        return <DataManagement />;
      case 'accounts':
        return <ViewAccounts />;
      case 'manage-admins':
        return <ManageAdmins />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Train className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">RailFlow Admin</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Inventory</div>
          <SidebarItem icon={<Train />} label="Manage Trains" isActive={activeTab === 'manage-trains'} onClick={() => setActiveTab('manage-trains')} />
          <SidebarItem icon={<MapPin />} label="Manage Stations" isActive={activeTab === 'manage-stations'} onClick={() => setActiveTab('manage-stations')} />
          <SidebarItem icon={<PlusCircle />} label="Data Management" isActive={activeTab === 'data-management'} onClick={() => setActiveTab('data-management')} />
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Users</div>
          <SidebarItem icon={<Users />} label="Customer Accounts" isActive={activeTab === 'accounts'} onClick={() => setActiveTab('accounts')} />
          <SidebarItem icon={<Shield />} label="Manage Admins" isActive={activeTab === 'manage-admins'} onClick={() => setActiveTab('manage-admins')} />
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</div>
          <SidebarItem icon={<SettingsIcon />} label="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-slate-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64"
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
              A
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
