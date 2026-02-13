import React from 'react';
import { roomsData } from '../constants';
import { User, CheckCircle, AlertCircle } from 'lucide-react';

const RoomAllotmentPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Room Status</h2>
        <div className="flex gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> Available
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> Occupied
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Maintenance
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {roomsData.map((room) => (
          <div 
            key={room.id} 
            className={`p-5 rounded-2xl border-l-4 shadow-sm bg-white hover:shadow-md transition-all ${
              room.status === 'Available' ? 'border-green-500' :
              room.status === 'Occupied' ? 'border-red-500' :
              'border-yellow-500'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Room {room.number}</h3>
                <p className="text-sm text-gray-500">{room.type}</p>
              </div>
              {room.status === 'Available' && <CheckCircle className="text-green-500" size={20} />}
              {room.status === 'Occupied' && <User className="text-red-500" size={20} />}
              {room.status === 'Maintenance' && <AlertCircle className="text-yellow-500" size={20} />}
            </div>

            <div className="pt-4 border-t border-gray-50">
              {room.status === 'Occupied' ? (
                <div>
                   <p className="text-xs text-gray-400">Patient</p>
                   <p className="text-sm font-medium text-gray-800">{room.patient}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  {room.status === 'Available' ? 'Ready for allotment' : 'Under maintenance'}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAllotmentPage;
