import React from 'react';
import { staffData } from '../constants';
import { MoreVertical, Search } from 'lucide-react';

const StaffPage: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Hospital Staff</h2>
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           <input type="text" placeholder="Search staff..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-0" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="py-3 px-6 font-semibold text-gray-500">Name</th>
              <th className="py-3 px-6 font-semibold text-gray-500">Role</th>
              <th className="py-3 px-6 font-semibold text-gray-500">Department</th>
              <th className="py-3 px-6 font-semibold text-gray-500">Status</th>
              <th className="py-3 px-6 font-semibold text-gray-500">Email</th>
              <th className="py-3 px-6 font-semibold text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staffData.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img src={staff.image} alt={staff.name} className="w-9 h-9 rounded-full object-cover" />
                    <span className="font-medium text-gray-900">{staff.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{staff.role}</td>
                <td className="py-4 px-6 text-gray-600">{staff.department}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    staff.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {staff.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500">{staff.email}</td>
                <td className="py-4 px-6">
                  <button className="text-gray-400 hover:text-gray-600">
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

export default StaffPage;
