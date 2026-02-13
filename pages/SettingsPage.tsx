import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Moon, Smartphone, Mail, Shield, Eye } from 'lucide-react';
import { USER_IMAGE } from '../constants';
import { useApp } from '../contexts/AppContext';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const { t } = useApp();

  const tabs = [
    { id: 'Profile', icon: User, label: t('settings.profile') },
    { id: 'Notifications', icon: Bell, label: t('settings.notifications') },
    { id: 'Security', icon: Lock, label: t('settings.security') },
    { id: 'Appearance', icon: Moon, label: t('settings.appearance') },
    { id: 'Language', icon: Globe, label: t('settings.language') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <ProfileSettings />;
      case 'Notifications':
        return <NotificationSettings />;
      case 'Security':
        return <SecuritySettings />;
      case 'Appearance':
        return <AppearanceSettings />;
      case 'Language':
        return <LanguageSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('settings.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
           {tabs.map((tab) => (
             <button 
               key={tab.id} 
               onClick={() => setActiveTab(tab.id)}
               className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                 activeTab === tab.id 
                   ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400 border border-gray-100 dark:border-gray-700' 
                   : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
               }`}
             >
                <tab.icon size={18} />
                {tab.label}
             </button>
           ))}
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[500px]">
           {renderContent()}
        </div>
      </div>
    </div>
  );
};

const ProfileSettings: React.FC = () => {
  const { t } = useApp();
  return (
  <>
    <div className="flex items-center gap-4 mb-8">
      <div className="relative">
          <img src={USER_IMAGE} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white dark:border-gray-800">
            <User size={14} />
          </button>
      </div>
      <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Noah Arthur</h3>
          <p className="text-gray-500 dark:text-gray-400">{t('settings.admin_role')}</p>
      </div>
    </div>

    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.firstname')}</label>
            <input type="text" defaultValue="Noah" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.lastname')}</label>
            <input type="text" defaultValue="Arthur" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
          </div>
      </div>
      
      <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.email')}</label>
          <input type="email" defaultValue="noah.arthur@plm.com" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
      </div>

      <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.role')}</label>
          <input type="text" defaultValue="Admin" disabled className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed" />
      </div>

      <div className="pt-4 flex justify-end gap-3">
          <button type="button" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">{t('settings.cancel')}</button>
          <button type="button" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('settings.save')}</button>
      </div>
    </form>
  </>
  );
};

const NotificationSettings: React.FC = () => {
    const { t } = useApp();
    return (
  <div className="space-y-6">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">{t('settings.notifications')}</h3>
    
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Mail size={16} className="text-gray-500" /> {t('settings.email_notif')}
      </h4>
      <div className="space-y-3 pl-6">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.news_updates')}</span>
          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.account_activity')}</span>
          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.new_device')}</span>
          <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
        </label>
      </div>
    </div>

    <div className="space-y-4 pt-4">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Smartphone size={16} className="text-gray-500" /> {t('settings.push_notif')}
      </h4>
      <div className="space-y-3 pl-6">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.new_projects')}</span>
          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.team_msgs')}</span>
          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
        </label>
      </div>
    </div>
    
    <div className="pt-4 flex justify-end gap-3">
        <button type="button" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('settings.save_pref')}</button>
    </div>
  </div>
    );
};

const SecuritySettings: React.FC = () => {
    const { t } = useApp();
    return (
  <div className="space-y-6">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">{t('settings.security')}</h3>
    
    <form className="space-y-4">
      <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.current_password')}</label>
          <div className="relative">
            <input type="password" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900" />
          </div>
      </div>
      <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.new_password')}</label>
          <div className="relative">
            <input type="password" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900" />
          </div>
      </div>
      <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.confirm_password')}</label>
          <div className="relative">
            <input type="password" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900" />
          </div>
      </div>
      
      <div className="pt-4 border-t border-gray-50 dark:border-gray-700">
         <div className="flex items-center justify-between">
           <div>
             <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
               <Shield size={16} className="text-gray-500" /> {t('settings.2fa')}
             </h4>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('settings.2fa_desc')}</p>
           </div>
           <label className="relative inline-flex items-center cursor-pointer">
             <input type="checkbox" className="sr-only peer" />
             <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
           </label>
         </div>
      </div>

      <div className="pt-4 flex justify-end gap-3">
          <button type="button" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('settings.update_password')}</button>
      </div>
    </form>
  </div>
    );
};

const AppearanceSettings: React.FC = () => {
  const { theme, setTheme, t } = useApp();

  return (
  <div className="space-y-6">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">{t('settings.appearance')}</h3>
    
    <div className="space-y-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">{t('settings.theme')}</label>
      <div className="grid grid-cols-3 gap-4">
        <button 
          onClick={() => setTheme('light')}
          className={`border-2 ${theme === 'light' ? 'border-blue-600' : 'border-gray-200 dark:border-gray-700'} bg-white p-4 rounded-xl flex flex-col items-center gap-2 relative transition-all`}
        >
          <div className="w-full h-16 bg-gray-100 rounded-lg border border-gray-200"></div>
          <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-600' : 'text-gray-500'}`}>{t('settings.theme.light')}</span>
          {theme === 'light' && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
             <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </span>
          )}
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className={`border-2 ${theme === 'dark' ? 'border-blue-600' : 'border-gray-200 dark:border-gray-700'} bg-gray-900 p-4 rounded-xl flex flex-col items-center gap-2 relative transition-all`}
        >
          <div className="w-full h-16 bg-gray-800 rounded-lg border border-gray-700"></div>
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-600' : 'text-gray-400'}`}>{t('settings.theme.dark')}</span>
           {theme === 'dark' && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
             <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </span>
          )}
        </button>
        <button 
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center gap-2 opacity-50 cursor-not-allowed"
        >
          <div className="w-full h-16 bg-gradient-to-br from-gray-100 to-gray-900 rounded-lg border border-gray-200"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('settings.theme.system')}</span>
        </button>
      </div>
    </div>
    
    <div className="space-y-4 pt-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block flex items-center gap-2">
        <Eye size={16} /> {t('settings.density')}
      </label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="density" defaultChecked className="text-blue-600 focus:ring-blue-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('settings.comfortable')}</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="density" className="text-blue-600 focus:ring-blue-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t('settings.compact')}</span>
        </label>
      </div>
    </div>
  </div>
  );
};

const LanguageSettings: React.FC = () => {
  const { language, setLanguage, t } = useApp();

  return (
  <div className="space-y-6">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">{t('settings.language')}</h3>
    
    <div className="space-y-4">
      <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.language')}</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="en">{t('settings.lang.english')}</option>
            <option value="zh">{t('settings.lang.chinese')}</option>
          </select>
      </div>
      
      <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.timezone')}</label>
          <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <option>(GMT-08:00) Pacific Time (US & Canada)</option>
            <option>(GMT-05:00) Eastern Time (US & Canada)</option>
            <option>(GMT+00:00) London</option>
            <option>(GMT+01:00) Paris</option>
            <option>(GMT+08:00) Beijing</option>
            <option>(GMT+09:00) Tokyo</option>
          </select>
      </div>

      <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings.date_format')}</label>
          <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
      </div>
    </div>

    <div className="pt-4 flex justify-end gap-3">
        <button type="button" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('settings.save')}</button>
    </div>
  </div>
  );
};

export default SettingsPage;
