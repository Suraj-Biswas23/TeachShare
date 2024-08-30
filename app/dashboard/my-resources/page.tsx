'use client';

import { useState, useEffect } from 'react';
import ResourceCard from '@/components/ResourceCard';
import BookmarkedResources from '@/components/BookmarkedResources';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Resource {
  _id: string;
  title: string;
  uploaderName: string;
  course: string;
  subject: string;
  fileType: string;
  uploadDate: string;
  tags: string[];
  fileUrl: string;
  views: number;
  downloads: number;
  shares: number;
  rating: number;
  reviews: number;
  bookmarks: number;
  description?: string;
}

export default function MyResourcesPage() {
  const [myResources, setMyResources] = useState<Resource[]>([]);
  const [bookmarkedResources, setBookmarkedResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchMyResources();
    fetchBookmarkedResources();
  }, []);

  const fetchMyResources = async () => {
    try {
      const response = await fetch('/api/material/my-resources', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authentication headers here
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();
      setMyResources(Array.isArray(data) ? data : data.resources || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
    }
  };

  const fetchBookmarkedResources = async () => {
    try {
      const response = await fetch('/api/material/bookmarked', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bookmarked resources');
      }
      const data = await response.json();
      setBookmarkedResources(data.resources);
    } catch (error) {
      console.error('Error fetching bookmarked resources:', error);
      toast.error('Failed to fetch bookmarked resources');
    }
  };

  const handleDownload = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileUrl.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleShare = (fileUrl: string) => {
    navigator.clipboard.writeText(fileUrl).then(() => {
      toast.success('Link copied to clipboard');
    }, () => {
      toast.error('Failed to copy link');
    });
  };

  const handleBookmark = async (resourceId: string) => {
    try {
      const response = await fetch('/api/material/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ materialId: resourceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle bookmark');
      }

      const data = await response.json();
      toast.success(data.message);

      // Refresh bookmarked resources after toggling
      fetchBookmarkedResources();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to toggle bookmark');
    }
  };

  const handleDelete = async (resourceId: string) => {
    try {
      const response = await fetch(`/api/material/delete/${resourceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }

      const data = await response.json();
      toast.success(data.message);

      // Remove the deleted resource from the state
      setMyResources(prevResources => prevResources.filter(resource => resource._id !== resourceId));
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Resources</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myResources.map(resource => (
          <ResourceCard 
            key={resource._id} 
            resource={resource}
            onDownload={handleDownload}
            onShare={handleShare}
            onBookmark={handleBookmark}
            onDelete={handleDelete}
            showDeleteButton={true}
          />
        ))}
      </div>

      <BookmarkedResources 
        resources={bookmarkedResources}
        onDownload={handleDownload}
        onShare={handleShare}
        onBookmark={handleBookmark}
      />

      <ToastContainer position="bottom-right" />
    </div>
  );
}