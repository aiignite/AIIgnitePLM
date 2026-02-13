import React from 'react';
import { ambulanceData } from '../constants';
import { MapPin, Phone, Truck } from 'lucide-react';

const AmbulancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Ambulance Fleet</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold">Total: {ambulanceData.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambulanceData.map((amb) => (
          <div key={amb.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                     <Truck size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-900">{amb.vehicleNumber}</h3>
                     <p className="text-xs text-gray-500">{amb.type} Class</p>
                  </div>
               </div>
               <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                 amb.status === 'Available' ? 'bg-green-100 text-green-700' :
                 amb.status === 'On Duty' ? 'bg-blue-100 text-blue-700' :
                 'bg-gray-100 text-gray-600'
               }`}>
                 {amb.status}
               </span>
             </div>

             <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                   <UserIcon className="text-gray-400" />
                   <div>
                      <p className="text-xs text-gray-400">Driver</p>
                      <p className="text-sm font-bold text-gray-700">{amb.driverName}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                   <MapPin className="text-gray-400" size={18} />
                   <div>
                      <p className="text-xs text-gray-400">Current Location</p>
                      <p className="text-sm font-bold text-gray-700">{amb.location}</p>
                   </div>
                </div>
             </div>
             
             <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">Track</button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                   <Phone size={20} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default AmbulancePage;
