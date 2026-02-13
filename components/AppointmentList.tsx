import React from 'react';
import { MoreVertical, Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { Appointment } from '../types';
import { useApp } from '../contexts/AppContext';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  const { t } = useApp();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t('dashboard.booked_appointment')}</h3>
        <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <MoreVertical size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="space-y-6">
        {appointments.map((apt) => (
          <div key={apt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-50 dark:border-gray-700 last:border-0 last:pb-0 group">
            <div className="flex items-center gap-4">
              <img 
                src={apt.doctorImage} 
                alt={apt.doctorName} 
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-50 dark:border-gray-700"
              />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{apt.doctorName}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{apt.patientName} • <span className="text-blue-500 font-medium">{apt.disease}</span></p>
              </div>
            </div>
            
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-md">
                   <Calendar size={12} /> {apt.date}
                </span>
                {apt.time && (
                  <span className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md">
                     <Clock size={12} /> {apt.time}
                  </span>
                )}
              </div>
              <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors">
                  <Edit2 size={14} />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
