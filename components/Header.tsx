import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { USER_IMAGE, notifications } from '../constants';
import { useApp } from '../contexts/AppContext';
import NotificationDropdown from './NotificationDropdown';
import Logo from './Logo';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { t } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between lg:justify-end gap-4 transition-colors duration-300">
      <button className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-2 lg:hidden mr-auto">
        <Logo className="w-8 h-8 rounded-lg shadow-sm" />
        <span className="font-extrabold text-lg tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">AI Ignite</span>
          <span className="text-gray-700 dark:text-gray-300 font-bold ml-1">PLM</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 w-full max-w-md mr-auto lg:mr-0 lg:ml-auto xl:mr-auto">
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-600 pr-3">
          <span className="text-sm font-medium whitespace-nowrap">Apr-2023</span>
        </div>
        <Search size={18} className="text-gray-400 dark:text-gray-500" />
        <input 
          type="text" 
          placeholder={t('common.search')}
          className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-6 pl-2 sm:pl-0">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 relative transition-colors"
          >
            <Search size={20} className="md:hidden" />
            <span className="hidden md:block material-icons-round">
              <Bell size={20} />
            </span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            )}
          </button>
          
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
              <NotificationDropdown onClose={() => setShowNotifications(false)} onNavigate={onNavigate} />
            </>
          )}
        </div>
        
        {/* User Profile Dropdown */}
        <div className="relative pl-3 sm:border-l border-gray-100 dark:border-gray-700">
           <button 
             onClick={() => setShowProfileMenu(!showProfileMenu)}
             className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1.5 rounded-xl transition-all outline-none"
           >
             <img 
              src={USER_IMAGE} 
              alt="Admin" 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
             />
             <div className="hidden lg:block text-left">
               <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Noah Arthur</p>
               <p className="text-xs text-gray-500 dark:text-gray-400">{t('settings.admin_role')}</p>
             </div>
             <ChevronDown size={16} className={`hidden lg:block text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
           </button>

           {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
              <div className="absolute right-0 top-14 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                
                {/* User Info Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Noah Arthur</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@plm.com</p>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  <button 
                    onClick={() => { onNavigate('Settings'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <User size={16} className="text-gray-400" />
                    {t('settings.profile')}
                  </button>
                  <button 
                    onClick={() => { onNavigate('Settings'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Settings size={16} className="text-gray-400" />
                    {t('settings.title')}
                  </button>
                  <button 
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <HelpCircle size={16} className="text-gray-400" />
                    {t('menu.help')}
                  </button>
                </div>

                {/* Footer Actions */}
                <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                  <button 
                    onClick={() => { onNavigate('Logout'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                    {t('menu.logout')}
                  </button>
                </div>
              </div>
            </>
           )}
        </div>
      </div>
    </header>
  );
};

export default Header;