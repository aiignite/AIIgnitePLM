import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';

// Pages
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import MembersPage from './pages/MembersPage';
import OrganizationPage from './pages/OrganizationPage';
import PermissionsPage from './pages/PermissionsPage';
import FilesPage from './pages/FilesPage';
import LogsPage from './pages/LogsPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('Dashboard');
  const { theme, isSidebarCollapsed } = useApp();

  const handleNavigate = (page: string) => {
    if (page === 'Logout') {
      setIsAuthenticated(false);
      return;
    }
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('Dashboard');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Projects':
        return <ProjectsPage />;
      case 'Members':
        return <MembersPage />;
      case 'Organization':
        return <OrganizationPage />;
      case 'Permissions':
        return <PermissionsPage />;
      case 'Files':
        return <FilesPage />;
      case 'Logs':
        return <LogsPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Notifications':
        return <NotificationsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#F3F4F6] text-gray-900'}`}>
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <div className={`${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'} flex flex-col min-h-screen transition-all duration-300 ease-in-out`}>
        <Header onNavigate={handleNavigate} />
        
        <main className="flex-1 p-4 sm:p-6 pb-24 lg:pb-6 max-w-[1600px] mx-auto w-full">
          {renderPage()}
        </main>

        <BottomNav />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;