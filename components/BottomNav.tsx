import React from 'react';
import { LayoutDashboard, FileText, Plus, Briefcase, Settings } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-end z-40 lg:hidden pb-safe">
      <button className="flex flex-col items-center gap-1 text-blue-600 p-2">
        <LayoutDashboard size={24} />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 p-2">
        <FileText size={24} />
        <span className="text-[10px] font-medium">Reports</span>
      </button>
      
      <div className="relative -top-5">
        <button className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors shadow-blue-200">
          <Plus size={28} />
        </button>
      </div>
      
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 p-2">
        <Briefcase size={24} />
        <span className="text-[10px] font-medium">Services</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 p-2">
        <Settings size={24} />
        <span className="text-[10px] font-medium">Settings</span>
      </button>
    </nav>
  );
};

export default BottomNav;
