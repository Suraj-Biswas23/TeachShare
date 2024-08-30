"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { Briefcase, Users, BookOpen, TrendingUp, FileText, Image, Film, FileIcon, Bookmark, Download } from 'lucide-react';
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

interface PopularResource {
  _id: string;
  title: string;
  description: string;
  bookmarks: number;
  downloads: number;
  fileType: string;
}

interface ActivityFeedItem {
  _id: string;
  title: string;
  description: string;
  uploadDate: string;
  fileType: string;
  uploaderName: string;
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

const ActivityFeedItem: React.FC<ActivityFeedItem> = ({ title, description, uploadDate, fileType, uploaderName }) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xlsx': return <FileText className="h-5 w-5 text-green-500" />;
      case 'ppt': return <Image className="h-5 w-5 text-orange-500" />;
      default: return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-start space-x-4 py-3 border-b last:border-b-0">
      <div className="flex-shrink-0">{getFileIcon(fileType)}</div>
      <div className="flex-grow">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-gray-500 truncate">{description}</p>
        <p className="text-xs text-gray-400 mt-1">
          Uploaded by {uploaderName} on {new Date(uploadDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};


const PopularResourceItem: React.FC<PopularResource> = ({ title, description, bookmarks, downloads, fileType }) => {
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
      <div className="flex items-center space-x-2">
        <Bookmark className="h-4 w-4 text-blue-500" />
        <span className="text-xs">{bookmarks}</span>
        <Download className="h-4 w-4 text-green-500" />
        <span className="text-xs">{downloads}</span>
      </div>
    </div>
  );
};



const DashboardContent: React.FC = () => {
  const [stats, setStats] = useState({
    totalResources: 0,
    activeUsers: 0,
    courses: 0,
    totalDownloads: 0,
  });

  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const [popularResources, setPopularResources] = useState<PopularResource[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([]);


  const fetchStats = async () => {
    try {
      const [resources, users, courses, downloads, popular] = await Promise.all([
        axios.get('/api/stats/total-resources'),
        axios.get('/api/stats/active-users'),
        axios.get('/api/stats/courses'),
        axios.get('/api/stats/downloads'),
        axios.get('/api/stats/popular-resources'),
      ]);

      console.log('Downloads response:', downloads.data); // Add this line for debugging
      console.log('Popular resources response:', popular.data); // Add this line for debugging

      setStats({
        totalResources: resources.data.totalResources,
        activeUsers: users.data.activeUsers,
        courses: courses.data.courses,
        totalDownloads: downloads.data.totalDownloads,
      });

      setPopularResources(popular.data.popularResources);
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
    const fetchActivityFeed = async () => {
      try {
        const response = await axios.get('/api/material/activity-feed');
        setActivityFeed(response.data);
      } catch (error) {
        console.error('Error fetching activity feed:', error);
      }
    };

    fetchActivityFeed();
    fetchRecentUploads();

    // Set up an interval to fetch stats every 5s
    const intervalId = setInterval(fetchStats, 5000);

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
          <div className="h-64 overflow-y-auto pr-2">
            {recentUploads.length > 0 ? (
              <div className="space-y-2">
                {recentUploads.map((upload) => (
                  <RecentUploadItem key={upload._id} {...upload} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent uploads found.</p>
            )}
          </div>
        </DashboardCard>
        <DashboardCard title="Popular Resources">
          <div className="h-64 overflow-y-auto pr-2">
            {popularResources.length > 0 ? (
              <div className="space-y-2">
                {popularResources.map((resource) => (
                  <PopularResourceItem key={resource._id} {...resource} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No popular resources found.</p>
            )}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Activity Feed">
        <div className="h-64 overflow-y-auto pr-2">
          {activityFeed.length > 0 ? (
            activityFeed.map((item) => (
              <ActivityFeedItem key={item._id} {...item} />
            ))
          ) : (
            <p className="text-gray-500">No recent activity found.</p>
          )}
        </div>
      </DashboardCard>
    </div>
  );
};
export default DashboardContent;