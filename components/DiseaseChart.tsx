import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types';
import { useApp } from '../contexts/AppContext';

interface DiseaseChartProps {
  data: ChartData[];
}

const DiseaseChart: React.FC<DiseaseChartProps> = ({ data }) => {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t('dashboard.common_diseases')}</h3>
        <select className="bg-gray-50 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-300 border-none rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer outline-none">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-200"></span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Colds</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400"></span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Allergies</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Headaches</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={12}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9CA3AF' }} 
              dy={10}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ fontSize: '12px', color: isDark ? '#F3F4F6' : '#111827' }}
            />
            <Bar dataKey="value1" stackId="a" fill="#BFDBFE" radius={[0, 0, 0, 0]} name="Colds" />
            <Bar dataKey="value2" stackId="a" fill="#60A5FA" radius={[0, 0, 0, 0]} name="Allergies" />
            <Bar dataKey="value3" stackId="a" fill="#2563EB" radius={[4, 4, 0, 0]} name="Headaches" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiseaseChart;
