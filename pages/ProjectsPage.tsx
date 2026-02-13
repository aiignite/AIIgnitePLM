import React, { useState } from 'react';
import { Briefcase, Calendar, MoreVertical, Plus, Search, Filter, LayoutGrid, List, Clock, User, X } from 'lucide-react';
import { projects } from '../constants';
import { useApp } from '../contexts/AppContext';
import { Project } from '../types';

const ProjectsPage: React.FC = () => {
  const { t } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleView = (proj: Project) => {
    setSelectedProject(proj);
    setActiveMenuId(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('menu.projects')}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage project lifecycles and tasks.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none">
            <Plus size={18} />
            <span>New Project</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
               <input type="text" placeholder={t('common.search')} className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"><Filter size={18} /><span className="hidden sm:inline">{t('common.filter')}</span></button>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 gap-1 self-start sm:self-auto">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}><LayoutGrid size={18} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}><List size={18} /></button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Project Name</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Manager</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Progress</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Priority</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Deadline</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Status</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="min-h-[200px]">
                {projects.map((proj) => (
                  <tr key={proj.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">{proj.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">#{proj.id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3"><img src={proj.manager.image} className="w-8 h-8 rounded-full" /><span className="text-sm text-gray-700 dark:text-gray-300">{proj.manager.name}</span></div>
                    </td>
                    <td className="py-4 px-4 w-48">
                      <div className="flex items-center gap-3"><div className="flex-1 h-2 bg-gray-100 dark:bg-gray-600 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${proj.progress}%` }}></div></div><span className="text-xs font-medium text-gray-600 dark:text-gray-400">{proj.progress}%</span></div>
                    </td>
                    <td className="py-4 px-4"><span className={`text-xs font-bold px-2 py-1 rounded ${proj.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{proj.priority}</span></td>
                    <td className="py-4 px-4"><div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"><Calendar size={14} /> {proj.deadline}</div></td>
                    <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600`}>{proj.status}</span></td>
                    <td className="py-4 px-4 relative">
                      <button onClick={(e) => toggleMenu(proj.id, e)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={18} /></button>
                      {activeMenuId === proj.id && <ProjectActionMenu onView={() => handleView(proj)} onClose={() => setActiveMenuId(null)} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl hover:shadow-md transition-all relative">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg bg-blue-100 text-blue-600`}>{proj.name.substring(0, 2).toUpperCase()}</div>
                  <div className="relative">
                     <button onClick={(e) => toggleMenu(proj.id, e)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={20} /></button>
                     {activeMenuId === proj.id && <ProjectActionMenu onView={() => handleView(proj)} onClose={() => setActiveMenuId(null)} />}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{proj.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">ID: {proj.id}</p>
                
                {/* Simplified Card Content for Brevity */}
                <div className="space-y-4">
                   <div className="flex justify-between text-xs mb-1.5"><span className="text-gray-500 dark:text-gray-400">Progress</span><span className="text-gray-900 dark:text-white font-medium">{proj.progress}%</span></div>
                   <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${proj.progress}%` }}></div></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Slide Panel */}
      {selectedProject && (
         <div className="fixed inset-y-0 right-0 w-[400px] bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-100 dark:border-gray-700 overflow-y-auto">
            <div className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Details</h3>
                  <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><X size={20} /></button>
               </div>
               
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedProject.name}</h2>
               <div className="flex gap-2 mb-6">
                 <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold">{selectedProject.status}</span>
                 <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold">{selectedProject.priority} Priority</span>
               </div>

               <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                     <h4 className="text-sm font-semibold text-gray-500 mb-2">Manager</h4>
                     <div className="flex items-center gap-3">
                        <img src={selectedProject.manager.image} className="w-10 h-10 rounded-full" />
                        <div><p className="font-bold text-gray-900 dark:text-white">{selectedProject.manager.name}</p><p className="text-xs text-gray-500">{selectedProject.manager.role}</p></div>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="font-bold text-gray-900 dark:text-white">{selectedProject.budget}</p>
                     </div>
                     <div className="p-4 border border-gray-100 dark:border-gray-700 rounded-xl">
                        <p className="text-xs text-gray-500">Deadline</p>
                        <p className="font-bold text-gray-900 dark:text-white">{selectedProject.deadline}</p>
                     </div>
                  </div>
                  
                  <div>
                     <h4 className="font-bold mb-3 dark:text-white">Recent Tasks</h4>
                     <div className="space-y-2">
                        {[1,2,3].map(i => (
                           <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">Phase {i} deliverable review</span>
                           </div>
                        ))}
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

const ProjectActionMenu: React.FC<{ onView: () => void; onClose: () => void }> = ({ onView, onClose }) => (
  <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-10 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
    <button onClick={(e) => { e.stopPropagation(); onView(); }} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">View Details</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Edit Project</button>
    <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Delete</button>
  </div>
);

export default ProjectsPage;
