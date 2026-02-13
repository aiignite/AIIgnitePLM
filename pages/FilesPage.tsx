import React, { useState } from 'react';
import { Folder, File, Clock, MoreVertical, Download, Share2, LayoutGrid, List, ChevronRight, Home, Trash, PenLine, X } from 'lucide-react';
import { filesData } from '../constants';
import { useApp } from '../contexts/AppContext';
import { FileItem } from '../types';

const FilesPage: React.FC = () => {
  const { t } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter files based on current path (Folder ID)
  const currentFolderId = currentPath[currentPath.length - 1];
  const currentFiles = filesData.filter(f => f.parentId === currentFolderId || (!f.parentId && currentFolderId === 'root'));

  const handleFolderClick = (folderId: string) => {
    setCurrentPath([...currentPath, folderId]);
  };

  const handleBreadcrumbClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const getFolderName = (id: string) => {
    if (id === 'root') return 'Home';
    return filesData.find(f => f.id === id)?.name || id;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px] transition-colors relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
         <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('menu.files')}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              {currentPath.map((pathId, index) => (
                <React.Fragment key={pathId}>
                  {index > 0 && <ChevronRight size={14} />}
                  <button 
                    onClick={() => handleBreadcrumbClick(index)}
                    className={`hover:text-blue-600 flex items-center gap-1 ${index === currentPath.length - 1 ? 'font-bold text-gray-900 dark:text-white' : ''}`}
                  >
                    {pathId === 'root' && <Home size={14} />}
                    {getFolderName(pathId)}
                  </button>
                </React.Fragment>
              ))}
            </div>
         </div>
         
         <div className="flex gap-4 items-center self-end sm:self-auto">
            <div className="flex bg-gray-50 dark:bg-gray-700 rounded-lg p-1 gap-1">
               <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}><LayoutGrid size={18} /></button>
               <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}><List size={18} /></button>
             </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700">Upload</button>
            </div>
         </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {currentFolderId === 'root' && (
             <div className="p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all cursor-pointer min-h-[160px]">
                <Folder size={32} className="mb-2" />
                <span className="text-sm font-medium">New Folder</span>
             </div>
           )}

           {currentFiles.map((file) => (
             <div 
               key={file.id} 
               onClick={() => file.type === 'FOLDER' ? handleFolderClick(file.id) : null}
               className="p-4 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all group cursor-pointer bg-white dark:bg-gray-800 relative"
             >
                <div className="flex justify-between items-start mb-3">
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      file.type === 'FOLDER' ? 'bg-yellow-100 text-yellow-600' :
                      file.type === 'PDF' ? 'bg-red-100 text-red-500' :
                      file.type === 'XLS' ? 'bg-green-100 text-green-500' :
                      file.type === 'IMG' ? 'bg-purple-100 text-purple-500' :
                      'bg-blue-50 text-blue-600'
                   }`}>
                      {file.type === 'FOLDER' ? <Folder size={20} fill="currentColor" fillOpacity={0.2} /> : <File size={20} />}
                   </div>
                   <div className="relative">
                      <button onClick={(e) => toggleMenu(file.id, e)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><MoreVertical size={18} /></button>
                      {activeMenuId === file.id && <FileActionMenu onClose={() => setActiveMenuId(null)} />}
                   </div>
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white text-sm truncate mb-1">{file.name}</h4>
                <p className="text-xs text-gray-400 mb-4">{file.type === 'FOLDER' ? 'Folder' : file.size} • {file.owner}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 border-t border-gray-50 dark:border-gray-700 pt-3 mt-auto">
                   <Clock size={12} /><span>{file.date}</span>
                </div>
             </div>
           ))}
           {currentFiles.length === 0 && <div className="col-span-full text-center py-10 text-gray-400">This folder is empty</div>}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Name</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Size</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Owner</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Date</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer" onClick={() => file.type === 'FOLDER' ? handleFolderClick(file.id) : null}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          file.type === 'FOLDER' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-50 text-blue-600'
                       }`}>
                          {file.type === 'FOLDER' ? <Folder size={16} fill="currentColor" fillOpacity={0.2} /> : <File size={16} />}
                       </div>
                       <span className="font-medium text-gray-900 dark:text-white text-sm">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{file.size}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{file.owner}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{file.date}</td>
                  <td className="py-4 px-4 relative">
                    <button onClick={(e) => toggleMenu(file.id, e)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400"><MoreVertical size={16} /></button>
                    {activeMenuId === file.id && <FileActionMenu onClose={() => setActiveMenuId(null)} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeMenuId && <div className="fixed inset-0 z-0" onClick={() => setActiveMenuId(null)}></div>}
    </div>
  );
};

const FileActionMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
    <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><Download size={14} /> Download</button>
    <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><Share2 size={14} /> Share</button>
    <button className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"><PenLine size={14} /> Rename</button>
    <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
    <button className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"><Trash size={14} /> Delete</button>
  </div>
);

export default FilesPage;
