import React from 'react';
import { useApp } from '../contexts/AppContext';
import Logo from '../components/Logo';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { theme, t, language, setLanguage } = useApp();
  
  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Left Side - Brand / Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 opacity-90"></div>
        
        {/* Subtle grid pattern overlay for technical feel */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
                backgroundSize: '30px 30px' 
             }}>
        </div>

        <div className="relative z-10 p-12 text-white max-w-lg flex flex-col items-start">
           <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-sm shadow-2xl mb-8 border border-white/10 ring-1 ring-white/20">
              <Logo className="w-24 h-24" />
           </div>

           <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-white">AI Ignite</span>
             <span className="text-white ml-3">PLM</span>
           </h1>
           
           <p className="text-slate-300 text-lg leading-relaxed font-light border-l-2 border-blue-500/50 pl-6">
             {t('login.hero_desc')}
           </p>
        </div>
        
        {/* Abstract Shapes - Refined for elegance */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-[100px]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-10 rounded-full blur-[80px]"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Language Switcher */}
        <div className="absolute top-6 right-6">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <button 
              onClick={() => setLanguage('zh')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${language === 'zh' ? 'bg-slate-800 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'}`}
            >
              中文
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${language === 'en' ? 'bg-slate-800 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400'}`}
            >
              English
            </button>
          </div>
        </div>

        <div className="max-w-md w-full">
           <div className="lg:hidden flex flex-col items-center mb-8">
              <Logo className="w-20 h-20 mb-4" />
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">AI Ignite</span> 
                <span className="ml-2">PLM</span>
              </h1>
           </div>
           
           <h2 className="text-3xl font-bold mb-2 text-center lg:text-left text-gray-900 dark:text-white">{t('login.welcome')}</h2>
           <p className="text-gray-500 dark:text-gray-400 mb-8 text-center lg:text-left">{t('login.instruction')}</p>
           
           <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t('login.email_label')}</label>
                <input 
                  type="email" 
                  defaultValue="admin@plm.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder={t('login.email_placeholder')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{t('login.password_label')}</label>
                <input 
                  type="password" 
                  defaultValue="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder={t('login.password_placeholder')}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                 <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    {t('login.remember_me')}
                 </label>
                 <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">{t('login.forgot_password')}</a>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200/50 dark:shadow-none transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('login.sign_in')}
              </button>
           </form>
           
           <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
             {t('login.no_account')} <a href="#" className="text-blue-600 font-medium hover:underline">{t('login.contact_admin')}</a>
           </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
