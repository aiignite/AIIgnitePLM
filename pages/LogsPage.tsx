import React, { useState } from 'react';
import { systemLogs } from '../constants';
import { ScrollText, Filter, AlertCircle, CheckCircle, Info, LayoutGrid, List, MoreVertical } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const LogsPage: React.FC = () => {
  const { t } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('menu.logs')}</h2>
        
        <div className="flex gap-4 items-center">
           <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 gap-1">
             <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}><LayoutGrid size={18} /></button>
             <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}><List size={18} /></button>
           </div>
           
           <div className="flex gap-2">
             <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-2"><Filter size={16} /> Filter</button>
             <button className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600">Export Logs</button>
           </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                   <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                   <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Action</th>
                   <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">User</th>
                   <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Module</th>
                   <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Timestamp</th>
                   <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">IP Address</th>
                   <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase"></th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {systemLogs.map((log) => (
                   <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-6">
                         {log.status === 'Success' && <CheckCircle size={18} className="text-green-500" />}
                         {log.status === 'Warning' && <AlertCircle size={18} className="text-orange-500" />}
                         {log.status === 'Error' && <Info size={18} className="text-red-500" />}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{log.action}</td>
                      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{log.user}</td>
                      <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400"><span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">{log.module}</span></td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400 font-mono">{log.timestamp}</td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400 font-mono">{log.ip}</td>
                      <td className="py-4 px-6 relative">
                        <button onClick={(e) => toggleMenu(log.id, e)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
                        {activeMenuId === log.id && <LogActionMenu onClose={() => setActiveMenuId(null)} />}
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {systemLogs.map((log) => (
            <div key={log.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all relative">
               <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg ${log.status === 'Success' ? 'bg-green-100 text-green-600' : log.status === 'Warning' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                     {log.status === 'Success' && <CheckCircle size={18} />}
                     {log.status === 'Warning' && <AlertCircle size={18} />}
                     {log.status === 'Error' && <Info size={18} />}
                  </div>
                  <div className="relative">
                    <button onClick={(e) => toggleMenu(log.id, e)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={16} /></button>
                    {activeMenuId === log.id && <LogActionMenu onClose={() => setActiveMenuId(null)} />}
                  </div>
               </div>
               
               <h3 className="font-bold text-gray-900 dark:text-white mb-1">{log.action}</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{log.user}</p>
               
               <div className="pt-3 border-t border-gray-50 dark:border-gray-700 text-xs text-gray-400 font-mono space-y-1">
                  <div className="flex justify-between"><span>Time:</span><span>{log.timestamp}</span></div>
                  <div className="flex justify-between"><span>IP:</span><span>{log.ip}</span></div>
               </div>
            </div>
          ))}
        </div>
      )}
      {activeMenuId && <div className="fixed inset-0 z-0" onClick={() => setActiveMenuId(null)}></div>}
    </div>
  );
};

const LogActionMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-10 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">View Details</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Copy JSON</button>
  </div>
);

export default LogsPage;
