import { useState } from 'react';
import { FaDownload, FaEye, FaShare, FaStar, FaBookmark, FaEllipsisV, FaEdit, FaTrash, FaArchive } from 'react-icons/fa';
import { format } from 'date-fns';

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    type: string;
    date: string;
    views: number;
    downloads: number;
    shares: number;
    rating: number;
    reviews: number;
    fileSize: number;
    author: string;
    contentType: string;
    bookmarks: number;
    course: string;
    subject: string;
    tags: string[];
  };
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onShare?: () => void;
}

export default function ResourceCard({ resource, onEdit, onDelete, onArchive, onShare }: ResourceCardProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 relative">
      {/* ... other JSX ... */}
      <div className="text-sm text-gray-600 mb-2">
        <p>By: {resource.author} | {resource.contentType}</p>
        <p>Course: {resource.course} | Subject: {resource.subject}</p>
        <p>Type: {resource.type} | Size: {resource.fileSize.toFixed(1)} MB</p>
        <p>Uploaded: {format(new Date(resource.date), 'MM/dd/yyyy')}</p>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {resource.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center">
          <FaEye className="mr-1" /> {resource.views}
        </span>
        <span className="flex items-center">
          <FaDownload className="mr-1" /> {resource.downloads}
        </span>
        <span className="flex items-center">
          <FaShare className="mr-1" /> {resource.shares}
        </span>
        <span className="flex items-center">
          <FaBookmark className="mr-1" /> {resource.bookmarks}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{resource.rating.toFixed(1)} ({resource.reviews} reviews)</span>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors duration-200">
          Download
        </button>
      </div>
      
      {(onEdit || onDelete || onArchive || onShare) && (
        <div className="absolute top-2 right-2">
          <button onClick={() => setShowActions(!showActions)} className="p-1">
            <FaEllipsisV />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              {onEdit && (
                <button onClick={onEdit} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  <FaEdit className="inline mr-2" /> Edit
                </button>
              )}
              {onDelete && (
                <button onClick={onDelete} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                  <FaTrash className="inline mr-2" /> Delete
                </button>
              )}
              {onArchive && (
                <button onClick={onArchive} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  <FaArchive className="inline mr-2" /> Archive
                </button>
              )}
              {onShare && (
                <button onClick={onShare} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  <FaShare className="inline mr-2" /> Share
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}