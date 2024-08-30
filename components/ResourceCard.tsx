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

  import React, { useState, useEffect } from 'react';
  import { FaDownload, FaEye, FaShare, FaStar, FaBookmark, FaInfoCircle, FaEdit } from 'react-icons/fa';
  import { format } from 'date-fns';
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  import { toast } from 'react-toastify';
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
  
  type InteractionType = 'views' | 'downloads' | 'shares' | 'bookmarks';
  
  interface ResourceCardProps {
    resource: Resource;
    onDownload: (fileUrl: string) => void;
    onShare: (fileUrl: string) => void;
    onBookmark: (resourceId: string) => void;
  }
  
  export default function ResourceCard({ 
    resource: initialResource, 
    onDownload, 
    onShare,
    onBookmark
  }: ResourceCardProps) {
    const [resource, setResource] = useState<Resource>(initialResource);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [hasUserReviewed, setHasUserReviewed] = useState(false);
  
    useEffect(() => {
      checkUserReview();
    }, []);
  
    const checkUserReview = async () => {
      try {
        // Fetching the user's review status from your backend API
        const response = await fetch(`/api/material/hasReviewed?materialId=${resource._id}`);
        if (response.ok) {
          const data = await response.json();
          setHasUserReviewed(data.hasReviewed); // Update state with the review status
        } else {
          toast.error('Failed to check review status.');
        }
      } catch (error) {
        console.error('Error checking user review:', error);
        toast.error('Error checking review status.');
      }
    };
    
  
    const handleInteraction = async (interactionType: InteractionType) => {
      try {
        const response = await fetch('/api/material/interact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            materialId: resource._id,
            interactionType
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to record interaction');
        }
        const data = await response.json();
        if (data.message === 'Interaction recorded successfully') {
          setResource(prevResource => ({
            ...prevResource,
            [interactionType]: prevResource[interactionType] + 1
          }));
        } else {
          // toast.info('You have already interacted with this resource.');
        }
      } catch (error) {
        console.error('Error recording interaction:', error);
        toast.error('Failed to record interaction');
      }
    };
  
    const handleDownload = async () => {
      await handleInteraction('downloads');
      onDownload(resource.fileUrl);
    };
  
    const handleView = async () => {
      await handleInteraction('views');
      setIsInfoDialogOpen(true);
    };
  
    const handleShare = async () => {
      await handleInteraction('shares');
      setIsShareDialogOpen(true);
    };
  
    const handleBookmark = async () => {
      await handleInteraction('bookmarks');
      if (typeof onBookmark === 'function') {
        onBookmark(resource._id);
      } else {
        console.error('onBookmark is not a function');
      }
    };
  
    const handleCopyLink = () => {
      navigator.clipboard.writeText(resource.fileUrl);
      toast.success('Link copied to clipboard');
    };
  
    const handleReviewClick = () => {
      if (hasUserReviewed) {
        toast.info('You have already submitted a review for this resource.');
      } else {
        setIsReviewDialogOpen(true);
      }
    };
  
    const handleReviewSubmit = async () => {
      try {
        const response = await fetch('/api/material/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            materialId: resource._id,
            rating: reviewRating,
            text: reviewText
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to submit review');
        }
        const data = await response.json();
        if (data.message === 'Review submitted successfully') {
          setResource(prevResource => ({
            ...prevResource,
            rating: data.newRating,
            reviews: data.totalReviews
          }));
          setIsReviewDialogOpen(false);
          setReviewRating(0);
          setReviewText('');
          setHasUserReviewed(true);
          toast.success('Review submitted successfully');
        } else {
          toast.error(data.message || 'Failed to submit review');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        toast.error('Failed to submit review');
      }
    };
  
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
            <span>
              {resource.rating !== undefined ? resource.rating.toFixed(1) : '0.0'} 
              ({resource.reviews} reviews)
            </span>
          </div>
          <button 
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors duration-200"
          >
            Download
          </button>
        </div>
  
        <div className="absolute top-2 right-2 flex space-x-2">
          <button 
            onClick={handleView}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaInfoCircle />
          </button>
          <button 
            onClick={handleBookmark}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBookmark />
          </button>
          <button 
            onClick={handleShare}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaShare />
          </button>
          <button 
            onClick={handleReviewClick}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaEdit />
          </button>
        </div>
  
        <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Resource Description</DialogTitle>
            </DialogHeader>
            <p>{resource.description || 'No description available.'}</p>
            <Button onClick={() => setIsInfoDialogOpen(false)} className="mt-2">Close</Button>
          </DialogContent>
        </Dialog>
  
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Resource</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input 
                value={resource.fileUrl} 
                readOnly 
                onClick={handleCopyLink}
                className="flex-grow"
              />
              <Button onClick={() => onShare(resource.fileUrl)}>
                Share
              </Button>
            </div>
          </DialogContent>
        </Dialog>
  
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leave a Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setReviewRating(star)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Write your review (optional)"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={handleReviewSubmit}>Submit Review</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  