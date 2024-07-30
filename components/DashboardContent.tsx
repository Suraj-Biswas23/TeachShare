import React, { ReactNode } from 'react';
import { Briefcase, Users, BookOpen, TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

interface DashboardCardProps {
  title: string;
  children: ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
    <div className="rounded-full bg-gray-100 p-3">{icon}</div>
    <div>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  </div>
);

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
      <h3 className="text-lg font-semibold text-indigo-800">{title}</h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const DashboardContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Briefcase className="h-6 w-6 text-indigo-600" />} title="Total Resources" value="1,234" />
        <StatCard icon={<Users className="h-6 w-6 text-green-600" />} title="Active Users" value="5,678" />
        <StatCard icon={<BookOpen className="h-6 w-6 text-yellow-600" />} title="Courses" value="42" />
        <StatCard icon={<TrendingUp className="h-6 w-6 text-red-600" />} title="Downloads" value="10,987" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Uploads">
          <p>List of recent uploads will appear here.</p>
        </DashboardCard>
        <DashboardCard title="Popular Resources">
          <p>List of popular resources will appear here.</p>
        </DashboardCard>
      </div>

      <DashboardCard title="Activity Feed">
        <p>Recent activity and notifications will appear here.</p>
      </DashboardCard>
    </div>
  );
};

export default DashboardContent;