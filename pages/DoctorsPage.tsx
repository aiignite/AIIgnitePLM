import React from 'react';
import { Mail, Phone, MapPin, MoreHorizontal, Star } from 'lucide-react';
import { doctors } from '../constants';

const DoctorsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Medical Specialists</h2>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">Filter</button>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700">Add Doctor</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                doc.status === 'Available' ? 'bg-green-50 text-green-600' :
                doc.status === 'In Surgery' ? 'bg-orange-50 text-orange-600' :
                'bg-red-50 text-red-600'
              }`}>
                {doc.status}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-3">
                <img src={doc.image} alt={doc.name} className="w-24 h-24 rounded-full object-cover border-4 border-gray-50" />
                <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{doc.name}</h3>
              <p className="text-blue-500 text-sm font-medium">{doc.specialty}</p>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <Mail size={16} />
                </div>
                <span className="truncate">{doc.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                  <Phone size={16} />
                </div>
                <span>{doc.phone}</span>
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors text-sm">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
