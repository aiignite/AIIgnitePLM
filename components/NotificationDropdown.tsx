import React from 'react';
import { useApp } from '../contexts/AppContext';
import { notifications } from '../constants';
import { Bell, Check, Info, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface NotificationDropdownProps {
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose, onNavigate }) => {
  const { t } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch(type) {
        case 'success': return <CheckCircle size={16} className="text-green-500" />;
        case 'warning': return <AlertTriangle size={16} className="text-orange-500" />;
        case 'error': return <XCircle size={16} className="text-red-500" />;
        default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
         <h3 className="font-bold text-gray-900 dark:text-white">{t('notifications.title')}</h3>
         <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700">{t('notifications.mark_all_read')}</button>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
         {notifications.length > 0 ? (
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
               {notifications.map(notif => (
                  <div key={notif.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                     <div className="flex gap-3">
                        <div className="mt-1 flex-shrink-0">
                           {getIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                           <h4 className={`text-sm ${!notif.read ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>{notif.title}</h4>
                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{notif.message}</p>
                           <p className="text-[10px] text-gray-400 mt-2">{notif.timestamp}</p>
                        </div>
                        {!notif.read && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
               {t('notifications.empty')}
            </div>
         )}
      </div>
      
      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
         <button 
           onClick={() => { onNavigate('Notifications'); onClose(); }}
           className="w-full py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
         >
            {t('notifications.view_all')}
         </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
