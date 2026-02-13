import React, { useState } from 'react';
import { notifications } from '../constants';
import { useApp } from '../contexts/AppContext';
import { CheckCircle, AlertTriangle, XCircle, Info, Trash2, Check, Filter } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const { t } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getIcon = (type: string) => {
    switch(type) {
        case 'success': return <CheckCircle size={20} className="text-green-500" />;
        case 'warning': return <AlertTriangle size={20} className="text-orange-500" />;
        case 'error': return <XCircle size={20} className="text-red-500" />;
        default: return <Info size={20} className="text-blue-500" />;
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('notifications.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and view your system alerts.</p>
         </div>
         <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'all' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
               {t('notifications.filter_all')}
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'unread' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
               {t('notifications.filter_unread')}
            </button>
         </div>
      </div>

      <div className="space-y-4">
         {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notif => (
              <div key={notif.id} className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border ${!notif.read ? 'border-blue-200 dark:border-blue-800 bg-blue-50/10' : 'border-gray-100 dark:border-gray-700'} transition-all hover:shadow-md`}>
                 <div className="flex gap-4 items-start">
                    <div className={`p-3 rounded-full ${
                      notif.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 
                      notif.type === 'warning' ? 'bg-orange-100 dark:bg-orange-900/30' : 
                      notif.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' : 
                      'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                       {getIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-start">
                          <h3 className={`text-lg ${!notif.read ? 'font-bold text-gray-900 dark:text-white' : 'font-semibold text-gray-800 dark:text-gray-200'}`}>{notif.title}</h3>
                          <span className="text-xs text-gray-400">{notif.timestamp}</span>
                       </div>
                       <p className="text-gray-600 dark:text-gray-400 mt-1">{notif.message}</p>
                       
                       <div className="flex gap-3 mt-4 justify-end">
                          {!notif.read && (
                             <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                <Check size={14} /> Mark as read
                             </button>
                          )}
                          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                             <Trash2 size={14} /> Delete
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
            ))
         ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
               <Info size={48} className="mb-4 opacity-20" />
               <p>{t('notifications.empty')}</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default NotificationsPage;
