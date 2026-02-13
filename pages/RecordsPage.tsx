import React from 'react';
import { Folder, File, Clock, MoreVertical } from 'lucide-react';

const RecordsPage: React.FC = () => {
  const records = [
    { id: 1, name: "Lab Results - M. Press", type: "PDF", size: "2.4 MB", date: "Apr 18, 2023" },
    { id: 2, name: "X-Ray Scan - L. Lubin", type: "DICOM", size: "45 MB", date: "Apr 21, 2023" },
    { id: 3, name: "Prescription History - T. Bator", type: "DOCX", size: "125 KB", date: "Apr 24, 2023" },
    { id: 4, name: "Discharge Summary - #4592", type: "PDF", size: "1.2 MB", date: "Apr 15, 2023" },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-bold text-gray-900">Medical Records</h2>
         <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50">Recent</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700">Upload</button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {records.map((file) => (
           <div key={file.id} className="p-4 border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    file.type === 'PDF' ? 'bg-red-100 text-red-500' :
                    file.type === 'DICOM' ? 'bg-blue-100 text-blue-500' :
                    'bg-blue-50 text-blue-600'
                 }`}>
                    <File size={20} />
                 </div>
                 <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                 </button>
              </div>
              <h4 className="font-bold text-gray-800 text-sm truncate mb-1">{file.name}</h4>
              <p className="text-xs text-gray-400 mb-3">{file.size} • {file.type}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 border-t border-gray-50 pt-2">
                 <Clock size={12} />
                 <span>Added {file.date}</span>
              </div>
           </div>
         ))}
         
         <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer min-h-[140px]">
            <Folder size={32} className="mb-2" />
            <span className="text-sm font-medium">New Folder</span>
         </div>
      </div>
    </div>
  );
};

export default RecordsPage;
