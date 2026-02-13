import React from 'react';
import { Calendar, Clock, MoreVertical, Plus, Search } from 'lucide-react';
import { appointments } from '../constants';

const AppointmentsPage: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-500 text-sm mt-1">Manage and schedule patient appointments</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by patient name..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white">
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-4 text-sm font-semibold text-gray-500">Patient</th>
              <th className="py-4 px-4 text-sm font-semibold text-gray-500">Doctor</th>
              <th className="py-4 px-4 text-sm font-semibold text-gray-500">Disease</th>
              <th className="py-4 px-4 text-sm font-semibold text-gray-500">Date & Time</th>
              <th className="py-4 px-4 text-sm font-semibold text-gray-500">Status</th>
              <th className="py-4 px-4 text-sm font-semibold text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{apt.patientName}</div>
                  <div className="text-xs text-gray-500">#{apt.id}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img src={apt.doctorImage} alt={apt.doctorName} className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-700">{apt.doctorName}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{apt.disease}</td>
                <td className="py-4 px-4">
                  <div className="flex flex-col text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {apt.date}</span>
                    <span className="flex items-center gap-1 mt-1"><Clock size={12} /> {apt.time}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'Confirmed' ? 'bg-green-50 text-green-600' :
                    apt.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    {apt.status || 'Scheduled'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
