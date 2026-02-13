import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building2, 
  Shield, 
  Folder, 
  ScrollText, 
  Settings, 
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Database,
  FileText,
  Activity,
  Box,
  Cpu
} from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  pageId?: string; // If it's a leaf node, it navigates to this page
  children?: MenuItem[];
  hasAdd?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const { t, isSidebarCollapsed, toggleSidebar } = useApp();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['workspace', 'organization']);

  // PLM Best Practice Structure
  // Grouping functional areas into logical folders
  const menuStructure: MenuItem[] = [
    {
      id: 'workspace',
      label: t('menu.workspace'),
      icon: LayoutDashboard,
      children: [
        { id: 'dashboard', label: t('menu.dashboard'), icon: Activity, pageId: 'Dashboard' },
        { id: 'notifications', label: t('menu.my_tasks'), icon: ScrollText, pageId: 'Notifications' }, // Reusing Notif page as Tasks for demo
      ]
    },
    {
      id: 'portfolio',
      label: t('menu.portfolio'),
      icon: Briefcase,
      children: [
        { id: 'projects', label: t('menu.projects'), icon: Layers, pageId: 'Projects', hasAdd: true },
        { id: 'analytics', label: t('menu.analytics'), icon: FileText, pageId: 'Dashboard' }, // Reuse dashboard
      ]
    },
    {
      id: 'product_data',
      label: t('menu.product_data'),
      icon: Cpu, // Representing Tech/Engineering
      children: [
        { id: 'parts', label: t('menu.parts'), icon: Box, pageId: 'Files' }, // Reuse Files for demo
        { id: 'docs', label: t('menu.documents'), icon: Folder, pageId: 'Files' },
        { id: 'changes', label: t('menu.eng_changes'), icon: FileText, pageId: 'Logs' }, // Reuse Logs for demo
      ]
    },
    {
      id: 'organization',
      label: t('menu.organization_group'),
      icon: Building2,
      children: [
        { id: 'members', label: t('menu.members'), icon: Users, pageId: 'Members', hasAdd: true },
        { id: 'structure', label: t('menu.org_structure'), icon: Database, pageId: 'Organization' },
      ]
    },
    {
      id: 'system',
      label: t('menu.system_admin'),
      icon: Settings,
      children: [
        { id: 'permissions', label: t('menu.permissions'), icon: Shield, pageId: 'Permissions' },
        { id: 'logs', label: t('menu.logs'), icon: ScrollText, pageId: 'Logs' },
        { id: 'settings', label: t('menu.settings'), icon: Settings, pageId: 'Settings' },
      ]
    }
  ];

  const toggleMenu = (id: string) => {
    if (isSidebarCollapsed) return; // Don't toggle accordion in collapsed mode
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      toggleMenu(item.id);
    } else if (item.pageId) {
      onNavigate(item.pageId);
    }
  };

  // Close all menus when sidebar collapses to avoid visual glitches
  useEffect(() => {
    if (isSidebarCollapsed) {
      setExpandedMenus([]);
    }
  }, [isSidebarCollapsed]);

  return (
    <aside 
      className={`hidden lg:flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 h-screen fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out`}
    >
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-colors z-40"
      >
        {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Header / Logo */}
      <div 
        className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center px-4' : 'gap-3'} cursor-pointer h-24 transition-all flex-shrink-0`} 
        onClick={() => !isSidebarCollapsed && onNavigate('Dashboard')}
      >
         <Logo className={`${isSidebarCollapsed ? 'w-10 h-10' : 'w-10 h-10'} shadow-lg shadow-blue-500/20 rounded-xl transition-all`} />
         
         <div className={`overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <h1 className="text-2xl font-extrabold tracking-tight leading-none whitespace-nowrap pt-1 pb-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 leading-[1.2]">AI Ignite</span>
              <span className="text-gray-700 dark:text-gray-300 font-bold ml-1.5">PLM</span>
            </h1>
         </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto hide-scrollbar">
        {menuStructure.map((item) => {
          const isActive = item.children 
            ? item.children.some(child => child.pageId === currentPage) 
            : item.pageId === currentPage;
          
          const isExpanded = expandedMenus.includes(item.id);
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative group">
              {/* Parent Item */}
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 
                  ${isActive && !isExpanded && isSidebarCollapsed 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}
                `}
              >
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <Icon size={20} className="flex-shrink-0" />
                  
                  <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${isSidebarCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100 block'}`}>
                    {item.label}
                  </span>
                </div>

                {/* Arrow for Accordion (Expanded Mode) */}
                {!isSidebarCollapsed && item.children && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} text-gray-400`} 
                  />
                )}
              </button>

              {/* Collapsed Mode: Floating Submenu */}
              {isSidebarCollapsed && item.children && (
                <div className="absolute left-full top-0 ml-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase border-b border-gray-50 dark:border-gray-700 mb-1">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={(e) => { e.stopPropagation(); onNavigate(child.pageId!); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                        ${currentPage === child.pageId 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}
                      `}
                    >
                      <span className="flex items-center gap-2">
                        {/* Dot indicator for submenus in floating mode */}
                        <span className={`w-1.5 h-1.5 rounded-full ${currentPage === child.pageId ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                        {child.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Expanded Mode: Inline Accordion Children */}
              {!isSidebarCollapsed && item.children && isExpanded && (
                <div className="mt-1 ml-4 pl-3 border-l border-gray-100 dark:border-gray-700 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={(e) => { e.stopPropagation(); onNavigate(child.pageId!); }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group/child
                        ${currentPage === child.pageId 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'}
                      `}
                    >
                      <span>{child.label}</span>
                      {child.hasAdd && (
                        <Plus 
                          size={14} 
                          className="opacity-0 group-hover/child:opacity-100 hover:text-blue-600 transition-opacity" 
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Area - Empty or minimal based on request to remove logout */}
      <div className="p-4">
          {/* Optional: Version info or small legal text could go here, or left empty for cleanliness */}
      </div>
    </aside>
  );
};

export default Sidebar;