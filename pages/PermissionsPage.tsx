import React, { useState } from 'react';
import { permissionRoles } from '../constants';
import { Search, Shield, Edit, MoreVertical, LayoutGrid, List } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const PermissionsPage: React.FC = () => {
  const { t } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('menu.permissions')}</h2>
           <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage roles and access control levels.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 gap-1">
             <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}><LayoutGrid size={18} /></button>
             <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}><List size={18} /></button>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none"><Shield size={18} /><span>Add New Role</span></button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 gap-6">
          {permissionRoles.map((role) => (
            <div key={role.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative">
               <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${role.accessLevel === 'Admin' ? 'bg-red-100 text-red-600' : role.accessLevel === 'Editor' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}><Shield size={24} /></div>
                  <div>
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">{role.roleName}</h3>
                     <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{role.description}</p>
                     <div className="flex gap-2"><span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 font-medium">{role.usersCount} Users assigned</span><span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 font-medium">Level: {role.accessLevel}</span></div>
                  </div>
               </div>
               <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-700">
                  <button className="flex-1 md:flex-none px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">Configure Access</button>
                  <div className="relative">
                    <button onClick={(e) => toggleMenu(role.id, e)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={20} /></button>
                    {activeMenuId === role.id && <RoleActionMenu onClose={() => setActiveMenuId(null)} />}
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {permissionRoles.map((role) => (
            <div key={role.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all relative">
               <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${role.accessLevel === 'Admin' ? 'bg-red-100 text-red-600' : role.accessLevel === 'Editor' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}><Shield size={24} /></div>
                  <div className="relative">
                    <button onClick={(e) => toggleMenu(role.id, e)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={20} /></button>
                    {activeMenuId === role.id && <RoleActionMenu onClose={() => setActiveMenuId(null)} />}
                  </div>
               </div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{role.roleName}</h3>
               <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">{role.description}</p>
               <div className="flex flex-col gap-2 mb-6">
                  <div className="flex justify-between text-xs"><span className="text-gray-500 dark:text-gray-400">Users</span><span className="text-gray-900 dark:text-white font-medium">{role.usersCount}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500 dark:text-gray-400">Level</span><span className="text-gray-900 dark:text-white font-medium">{role.accessLevel}</span></div>
               </div>
               <button className="w-full py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">Configure Access</button>
            </div>
          ))}
        </div>
      )}
      {activeMenuId && <div className="fixed inset-0 z-0" onClick={() => setActiveMenuId(null)}></div>}
    </div>
  );
};

const RoleActionMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-10 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Edit Role</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Clone Role</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Delete</button>
  </div>
);

export default PermissionsPage;
