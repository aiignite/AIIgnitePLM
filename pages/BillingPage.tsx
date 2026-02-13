import React from 'react';
import { billingData } from '../constants';
import { DollarSign, FileText, Download } from 'lucide-react';

const BillingPage: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Invoices & Billing</h2>
        <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
          <DollarSign size={18} />
          Create Invoice
        </button>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="py-4 px-6 text-sm font-semibold text-gray-500">Invoice ID</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-500">Patient</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-500">Date</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-500">Insurance</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-500">Amount</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-500">Status</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {billingData.map((bill) => (
            <tr key={bill.id} className="hover:bg-gray-50/50">
              <td className="py-4 px-6 font-medium text-blue-600">{bill.id}</td>
              <td className="py-4 px-6 text-gray-900 font-medium">{bill.patientName}</td>
              <td className="py-4 px-6 text-gray-500">{bill.date}</td>
              <td className="py-4 px-6 text-gray-600">{bill.insurance}</td>
              <td className="py-4 px-6 font-bold text-gray-900">{bill.amount}</td>
              <td className="py-4 px-6">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  bill.status === 'Paid' ? 'bg-green-100 text-green-700' :
                  bill.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {bill.status}
                </span>
              </td>
              <td className="py-4 px-6 flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                   <FileText size={18} />
                 </button>
                 <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                   <Download size={18} />
                 </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingPage;
