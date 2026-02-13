import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types';
import { useApp } from '../contexts/AppContext';

interface SurveyChartProps {
  data: ChartData[];
}

const SurveyChart: React.FC<SurveyChartProps> = ({ data }) => {
  const { t, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t('dashboard.hospital_survey')}</h3>
        <select className="bg-gray-50 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-300 border-none rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer outline-none">
          <option>10 - 16 Apr - 2023</option>
          <option>Last Week</option>
        </select>
      </div>
      
      <div className="flex gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">New Patients</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Old Patients</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOld" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9CA3AF' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9CA3AF' }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: isDark ? '#1F2937' : '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 600, color: isDark ? '#F3F4F6' : '#111827' }}
              labelStyle={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="value1" 
              stroke="#3B82F6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorNew)" 
              name="New Patients"
            />
            <Area 
              type="monotone" 
              dataKey="value2" 
              stroke="#EF4444" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorOld)" 
              name="Old Patients"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SurveyChart;
