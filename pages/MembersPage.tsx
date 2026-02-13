import React, { useState } from 'react';
import { Mail, Phone, MoreHorizontal, Building, Search, LayoutGrid, List, MoreVertical, X, MapPin } from 'lucide-react';
import { members } from '../constants';
import { useApp } from '../contexts/AppContext';
import { Member } from '../types';

const MembersPage: React.FC = () => {
  const { t } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleView = (member: Member) => {
    setSelectedMember(member);
    setActiveMenuId(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('menu.members')}</h2>
        <div className="flex gap-4 w-full sm:w-auto items-center">
           <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input type="text" placeholder={t('common.search')} className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white" />
           </div>
           <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 gap-1">
             <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}><LayoutGrid size={18} /></button>
             <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}><List size={18} /></button>
           </div>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">{t('common.add')}</button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all relative">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2 py-1 rounded-lg text-xs font-medium ${member.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{member.status}</div>
                <div className="relative">
                   <button onClick={(e) => toggleMenu(member.id, e)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreHorizontal size={20} /></button>
                   {activeMenuId === member.id && <MemberActionMenu onView={() => handleView(member)} onClose={() => setActiveMenuId(null)} />}
                </div>
              </div>
              <div className="flex flex-col items-center text-center mb-6">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 dark:border-gray-700 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-blue-500 text-sm font-medium">{member.role}</p>
              </div>
              <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-gray-700">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"><div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400"><Building size={16} /></div><span>{member.department}</span></div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"><div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400"><Mail size={16} /></div><span className="truncate">{member.email}</span></div>
              </div>
              <button onClick={() => handleView(member)} className="w-full mt-6 py-2.5 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">{t('common.view_details')}</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Member</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Role</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Department</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Contact</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-6"><div className="flex items-center gap-3"><img src={member.image} className="w-10 h-10 rounded-full object-cover" /><div><h4 className="font-bold text-gray-900 dark:text-white text-sm">{member.name}</h4><p className="text-xs text-gray-500">#{member.id}</p></div></div></td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">{member.role}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">{member.department}</td>
                  <td className="py-4 px-6"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${member.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{member.status}</span></td>
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">{member.email}</td>
                  <td className="py-4 px-6 relative">
                     <button onClick={(e) => toggleMenu(member.id, e)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={18} /></button>
                     {activeMenuId === member.id && <MemberActionMenu onView={() => handleView(member)} onClose={() => setActiveMenuId(null)} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Member Details Panel */}
      {selectedMember && (
         <div className="fixed inset-y-0 right-0 w-[400px] bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-100 dark:border-gray-700 overflow-y-auto">
            <div className="p-0">
               <div className="h-32 bg-blue-600 relative">
                  <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full"><X size={20} /></button>
               </div>
               <div className="px-6 pb-6">
                  <div className="relative -mt-16 mb-4 text-center">
                     <img src={selectedMember.image} className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto shadow-md" />
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">{selectedMember.name}</h2>
                     <p className="text-blue-600 dark:text-blue-400">{selectedMember.role}</p>
                  </div>

                  <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 dark:shadow-none"><Mail size={18} /> Message</button>
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium"><Phone size={18} /> Call</button>
                     </div>

                     <div className="space-y-4">
                        <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Information</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                           <Mail size={16} className="text-gray-400" /> {selectedMember.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                           <Building size={16} className="text-gray-400" /> {selectedMember.department}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                           <MapPin size={16} className="text-gray-400" /> San Francisco, CA
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Backdrop for Menu */}
      {activeMenuId && <div className="fixed inset-0 z-0" onClick={() => setActiveMenuId(null)}></div>}
    </div>
  );
};

const MemberActionMenu: React.FC<{ onView: () => void; onClose: () => void }> = ({ onView, onClose }) => (
  <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-10 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
    <button onClick={(e) => { e.stopPropagation(); onView(); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">View Profile</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Edit Member</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Deactivate</button>
  </div>
);

export default MembersPage;
