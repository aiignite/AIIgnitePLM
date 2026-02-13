import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Briefcase, CheckCircle, Users, PieChart, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { StatData } from '../types';
import { useApp } from '../contexts/AppContext';

const iconMap: Record<string, React.FC<any>> = {
  "briefcase": Briefcase,
  "check-circle": CheckCircle,
  "users": Users,
  "pie-chart": PieChart,
  "activity": Activity
};

interface StatCardProps {
  data: StatData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const { t } = useApp();
  const Icon = iconMap[data.iconName] || Activity;
  // Create chart data array
  const chartData = data.data.map((val, i) => ({ i, val }));
  
  // Use explicit key if available, otherwise title
  const displayTitle = data.translationKey ? t(data.translationKey) : data.title;

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${data.color} dark:bg-opacity-20`}>
          <Icon size={24} />
        </div>
        {data.trend && (
          <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-lg ${data.trendUp ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
            {data.trendUp ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {data.trend}
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{displayTitle}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{data.value}</h3>
      <div className="h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="val"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
