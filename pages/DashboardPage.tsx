import React from 'react';
import StatCard from '../components/StatCard';
import VelocityChart from '../components/VelocityChart';
import DistributionChart from '../components/DistributionChart';
import { statsData, velocityData, taskDistributionData, projects, members } from '../constants';
import { MoreVertical, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const DashboardPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} data={stat} />
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="h-[400px]">
          <VelocityChart data={velocityData} />
        </div>
        <div className="h-[400px]">
          <DistributionChart data={taskDistributionData} />
        </div>
      </section>

      {/* Lists Section */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t('dashboard.active_projects_list')}</h3>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              {t('common.view_details')} <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
             {projects.map((proj) => (
               <div key={proj.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl gap-4">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold">
                      {proj.name.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{proj.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Due: {proj.deadline}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="flex-1 sm:w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white font-medium">{proj.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      proj.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      proj.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {proj.status}
                    </span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="xl:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{t('dashboard.team_activity')}</h3>
            <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            {members.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center gap-4">
                <div className="relative">
                  <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-gray-800 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                </div>
                <div className="text-xs text-gray-400">2h ago</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
