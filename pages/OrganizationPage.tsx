import React, { useState } from 'react';
import { departments, orgTree } from '../constants';
import { Users, Briefcase, CheckCircle, AlertTriangle, LayoutGrid, List, MoreVertical, ChevronRight, ChevronDown, Building, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Department, OrgNode } from '../types';

const OrganizationPage: React.FC = () => {
  const { t } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleViewDetails = (dept: Department) => {
    setSelectedDept(dept);
    setActiveMenuId(null);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left Sidebar Tree */}
      <div className="w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 overflow-y-auto hidden md:block">
         <h3 className="font-bold text-gray-900 dark:text-white mb-4 px-2">Structure</h3>
         <div className="space-y-1">
            <TreeNode node={orgTree} />
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('menu.organization')}</h2>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full bg-green-500"></span> Active
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span> Restructuring
              </div>
            </div>
            
            <div className="flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 gap-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}><LayoutGrid size={18} /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700 text-blue-600' : 'text-gray-500'}`}><List size={18} /></button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {departments.map((dept) => (
              <div key={dept.id} className={`p-5 rounded-2xl border-l-4 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all relative ${dept.status === 'Active' ? 'border-green-500' : 'border-orange-500'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{dept.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manager: {dept.managerName}</p>
                  </div>
                  <div className="relative">
                     <button onClick={(e) => toggleMenu(dept.id, e)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={20} /></button>
                     {activeMenuId === dept.id && (
                        <ActionMenu 
                          onView={() => handleViewDetails(dept)} 
                          onClose={() => setActiveMenuId(null)}
                        />
                     )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 dark:border-gray-700 grid grid-cols-2 gap-4 cursor-pointer" onClick={() => handleViewDetails(dept)}>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg"><Users size={16} /></div>
                    <div><p className="text-xs text-gray-400">Members</p><p className="font-bold text-gray-900 dark:text-white">{dept.memberCount}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg"><Briefcase size={16} /></div>
                    <div><p className="text-xs text-gray-400">Projects</p><p className="font-bold text-gray-900 dark:text-white">{dept.projectCount}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Manager</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Stats</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 dark:text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{dept.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">{dept.managerName}</td>
                    <td className="py-4 px-6"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${dept.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>{dept.status}</span></td>
                    <td className="py-4 px-6 text-xs text-gray-600 dark:text-gray-400">{dept.memberCount} Members • {dept.projectCount} Projects</td>
                    <td className="py-4 px-6 relative">
                      <button onClick={(e) => toggleMenu(dept.id, e)} className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                      {activeMenuId === dept.id && <ActionMenu onView={() => handleViewDetails(dept)} onClose={() => setActiveMenuId(null)} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Slide Panel */}
      {selectedDept && (
         <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-100 dark:border-gray-700 overflow-y-auto">
            <div className="p-6">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Details</h3>
                  <button onClick={() => setSelectedDept(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><X size={20} /></button>
               </div>
               
               <div className="mb-6 text-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                     <Building size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDept.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{selectedDept.status}</p>
               </div>

               <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                     <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Manager</h4>
                     <p className="text-gray-900 dark:text-white font-medium">{selectedDept.managerName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Members</h4>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDept.memberCount}</p>
                     </div>
                     <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Projects</h4>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDept.projectCount}</p>
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

const TreeNode: React.FC<{ node: OrgNode; level?: number }> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 py-1.5 px-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer ${level === 0 ? 'font-bold' : 'text-sm'}`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />
        ) : <span className="w-3.5" />}
        <span className={`${node.type === 'Company' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{node.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const ActionMenu: React.FC<{ onView: () => void; onClose: () => void }> = ({ onView, onClose }) => (
  <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-10 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
    <button onClick={(e) => { e.stopPropagation(); onView(); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">View Details</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Edit Dept</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Delete</button>
  </div>
);

export default OrganizationPage;
