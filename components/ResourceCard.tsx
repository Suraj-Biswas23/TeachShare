  // import { useState } from 'react';
  // import { FaDownload, FaEye, FaShare, FaStar, FaBookmark, FaEllipsisV, FaEdit, FaTrash, FaArchive, FaFolderPlus, FaFolderMinus } from 'react-icons/fa';
  // import { format } from 'date-fns';
  // import { toast } from 'react-toastify';

  // interface Collection {
  //   id: number;
  //   name: string;
  //   resourceIds: number[];
  // }

  // interface ResourceCardProps {
  //   resource: {
  //     id: number;
  //     title: string;
  //     type: string;
  //     date: string;
  //     views: number;
  //     downloads: number;
  //     shares: number;
  //     rating: number;
  //     reviews: number;
  //     fileSize: number;
  //     author: string;
  //     contentType: string;
  //     bookmarks: number;
  //     course: string;
  //     subject: string;
  //     tags: string[];
  //     fileUrl?: string;
  //   };
  //   onEdit?: (id: number) => void;
  //   onDelete?: (id: number) => void;
  //   onArchive?: (id: number) => void;
  //   onShare?: (id: number) => void;
  //   onDownload?: (id: number) => void;
  //   onAddToCollection?: (resourceId: number, collectionId: number) => void;
  //   onRemoveFromCollection?: (resourceId: number, collectionId: number) => void;
  //   collections?: Collection[];
  //   showDeleteButton?: boolean; // New prop to control the visibility of the delete button
  // }

  // export default function ResourceCard({ 
  //   resource, 
  //   onEdit, 
  //   onDelete, 
  //   onArchive, 
  //   onShare, 
  //   onDownload,
  //   onAddToCollection,
  //   onRemoveFromCollection,
  //   collections = [],
  //   showDeleteButton = false // Default to false if not provided
  // }: ResourceCardProps) {
  //   const [showActions, setShowActions] = useState(false);
  //   const [showCollections, setShowCollections] = useState(false);

  //   const handleDownload = () => {
  //     if (resource.fileUrl) {
  //       onDownload && onDownload(resource.id);
  //     } else {
  //       toast.error("No files found for download.");
  //     }
  //   };

  //   return (
  //     <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 relative">
  //       <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
  //       <div className="text-sm text-gray-600 mb-2">
  //         <p>By: {resource.author} | {resource.contentType}</p>
  //         <p>Course: {resource.course} | Subject: {resource.subject}</p>
  //         <p>Type: {resource.type} | Size: {resource.fileSize.toFixed(1)} MB</p>
  //         <p>Uploaded: {format(new Date(resource.date), 'MM/dd/yyyy')}</p>
  //       </div>
  //       <div className="flex flex-wrap gap-1 mb-2">
  //         {resource.tags.map((tag, index) => (
  //           <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
  //             {tag}
  //           </span>
  //         ))}
  //       </div>
  //       <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
  //         <span className="flex items-center">
  //           <FaEye className="mr-1" /> {resource.views}
  //         </span>
  //         <span className="flex items-center">
  //           <FaDownload className="mr-1" /> {resource.downloads}
  //         </span>
  //         <span className="flex items-center">
  //           <FaShare className="mr-1" /> {resource.shares}
  //         </span>
  //         <span className="flex items-center">
  //           <FaBookmark className="mr-1" /> {resource.bookmarks}
  //         </span>
  //       </div>
  //       <div className="flex justify-between items-center">
  //         <div className="flex items-center">
  //           <FaStar className="text-yellow-400 mr-1" />
  //           <span>{resource.rating.toFixed(1)} ({resource.reviews} reviews)</span>
  //         </div>
  //         <button 
  //           onClick={handleDownload}
  //           className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors duration-200"
  //         >
  //           Download
  //         </button>
  //       </div>
        
  //       {(onEdit || onDelete || onArchive || onShare || onAddToCollection) && (
  //         <div className="absolute top-2 right-2">
  //           <button onClick={() => setShowActions(!showActions)} className="p-1">
  //             <FaEllipsisV />
  //           </button>
  //           {showActions && (
  //             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
  //               {onEdit && (
  //                 <button onClick={() => onEdit(resource.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
  //                   <FaEdit className="inline mr-2" /> Edit
  //                 </button>
  //               )}
  //               {showDeleteButton && onDelete && (
  //                 <button onClick={() => onDelete(resource.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
  //                   <FaTrash className="inline mr-2" /> Delete
  //                 </button>
  //               )}
  //               {onArchive && (
  //                 <button onClick={() => onArchive(resource.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
  //                   <FaArchive className="inline mr-2" /> Archive
  //                 </button>
  //               )}
  //               {onShare && (
  //                 <button onClick={() => onShare(resource.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
  //                   <FaShare className="inline mr-2" /> Share
  //                 </button>
  //               )}
  //               {onAddToCollection && (
  //                 <button onClick={() => setShowCollections(!showCollections)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
  //                   <FaFolderPlus className="inline mr-2" /> Manage Collections
  //                 </button>
  //               )}
  //             </div>
  //           )}
  //           {showCollections && onAddToCollection && onRemoveFromCollection && (
  //             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
  //               {collections.map(collection => (
  //                 <button 
  //                   key={collection.id}
  //                   onClick={() => {
  //                     if (collection.resourceIds.includes(resource.id)) {
  //                       onRemoveFromCollection(resource.id, collection.id);
  //                     } else {
  //                       onAddToCollection(resource.id, collection.id);
  //                     }
  //                     setShowCollections(false);
  //                   }}
  //                   className="block w-full text-left px-4 py-2 hover:bg-gray-100"
  //                 >
  //                   {collection.resourceIds.includes(resource.id) ? (
  //                     <FaFolderMinus className="inline mr-2" />
  //                   ) : (
  //                     <FaFolderPlus className="inline mr-2" />
  //                   )}
  //                   {collection.name}
  //                 </button>
  //               ))}
  //             </div>
  //           )}
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

import { FaDownload, FaShare } from 'react-icons/fa';
import { format } from 'date-fns';

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
}

interface ResourceCardProps {
  resource: Resource;
  onDownload: (fileUrl: string) => void;
  onShare: (fileUrl: string) => void;
}

export default function ResourceCard({ 
  resource, 
  onDownload, 
  onShare,
}: ResourceCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 relative">
      <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
      <div className="text-sm text-gray-600 mb-2">
        <p>By: {resource.uploaderName}</p>
        <p>Course: {resource.course} | Subject: {resource.subject}</p>
        <p>Type: {resource.fileType}</p>
        <p>Uploaded: {format(new Date(resource.uploadDate), 'MM/dd/yyyy')}</p>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {resource.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button 
          onClick={() => onDownload(resource.fileUrl)}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors duration-200"
        >
          <FaDownload className="inline mr-2" /> Download
        </button>
        <button 
          onClick={() => onShare(resource.fileUrl)}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors duration-200"
        >
          <FaShare className="inline mr-2" /> Share
        </button>
      </div>
    </div>
  );
}