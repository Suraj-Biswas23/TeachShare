"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { Briefcase, Users, BookOpen, TrendingUp, FileText, Image, Film, FileIcon } from 'lucide-react';
import axios from 'axios';

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

interface RecentUpload {
  _id: string;
  title: string;
  description: string;
  uploadDate: string;
  fileType: string;
}

interface DashboardCardProps {
  title: string;
  children: ReactNode;
}

const RecentUploadItem: React.FC<RecentUpload> = ({ title, description, uploadDate, fileType }) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'image': return <Image className="h-5 w-5 text-green-500" />;
      case 'video': return <Film className="h-5 w-5 text-blue-500" />;
      default: return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  return (
    <div className="flex items-center space-x-4 py-2 border-b last:border-b-0">
      {getFileIcon(fileType)}
      <div className="flex-grow">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
      <div className="text-xs text-gray-400">{new Date(uploadDate).toLocaleDateString()}</div>
    </div>
  );
};

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
  const [stats, setStats] = useState({
    totalResources: 0,
    activeUsers: 0,
    courses: 0,
    totalDownloads: 0,
  });

  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);

  const fetchStats = async () => {
    try {
      const [resources, users, courses, downloads] = await Promise.all([
        axios.get('/api/stats/total-resources'),
        axios.get('/api/stats/active-users'),
        axios.get('/api/stats/courses'),
        axios.get('/api/stats/downloads'),
      ]);

      setStats({
        totalResources: resources.data.totalResources,
        activeUsers: users.data.activeUsers,
        courses: courses.data.courses,
        totalDownloads: downloads.data.totalDownloads,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    const fetchRecentUploads = async () => {
      try {
        const response = await axios.get('/api/material/recent-uploads');
        setRecentUploads(response.data);
      } catch (error) {
        console.error('Error fetching recent uploads:', error);
      }
    };

    fetchRecentUploads();

    // Set up an interval to fetch stats every 30 seconds
    const intervalId = setInterval(fetchStats, 30000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Briefcase className="h-6 w-6 text-indigo-600" />} title="Total Resources" value={stats.totalResources.toString()} />
        <StatCard icon={<Users className="h-6 w-6 text-green-600" />} title="Total Users" value={stats.activeUsers.toString()} />
        <StatCard icon={<BookOpen className="h-6 w-6 text-yellow-600" />} title="Courses" value={stats.courses.toString()} />
        <StatCard icon={<TrendingUp className="h-6 w-6 text-red-600" />} title="Downloads" value={stats.totalDownloads.toString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Uploads">
          {recentUploads.length > 0 ? (
            <div className="space-y-2">
              {recentUploads.map((upload) => (
                <RecentUploadItem key={upload._id} {...upload} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent uploads found.</p>
          )}
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