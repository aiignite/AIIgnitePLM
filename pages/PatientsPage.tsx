import React from 'react';
import { patientsData } from '../constants';
import { Search, Filter, Download } from 'lucide-react';

const PatientsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search patients by name, id or diagnosis..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-gray-600 font-medium hover:bg-gray-50">
            <Filter size={18} />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-gray-600 font-medium hover:bg-gray-50">
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patientsData.map((patient) => (
          <div key={patient.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <img src={patient.image} alt={patient.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{patient.name}</h3>
                  <p className="text-sm text-gray-500">ID: #{patient.id}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                patient.status === 'Admitted' ? 'bg-purple-50 text-purple-600' : 
                patient.status === 'Discharged' ? 'bg-green-50 text-green-600' :
                'bg-red-50 text-red-600'
              }`}>
                {patient.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-4 pt-4 border-t border-gray-50">
               <div>
                 <p className="text-gray-400 text-xs mb-0.5">Age/Gender</p>
                 <p className="font-medium text-gray-700">{patient.age} / {patient.gender}</p>
               </div>
               <div>
                 <p className="text-gray-400 text-xs mb-0.5">Diagnosis</p>
                 <p className="font-medium text-gray-700">{patient.diagnosis}</p>
               </div>
               <div>
                 <p className="text-gray-400 text-xs mb-0.5">Admission Date</p>
                 <p className="font-medium text-gray-700">{patient.admissionDate}</p>
               </div>
               <div>
                 <p className="text-gray-400 text-xs mb-0.5">Phone</p>
                 <p className="font-medium text-gray-700">{patient.phone}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;
