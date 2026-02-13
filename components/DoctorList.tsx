import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Doctor } from '../types';
import { useApp } from '../contexts/AppContext';

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  const { t } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t('dashboard.doctors_list')}</h3>
        <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <MoreVertical size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="space-y-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                />
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white dark:border-gray-700 rounded-full ${doc.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{doc.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[150px]">{doc.specialty}</p>
              </div>
            </div>
            
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              doc.status === 'Available' 
                ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}>
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
