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
  
  interface Review {
    _id: string;
    userId: string;
    userName: string;
    rating: number;
    text: string;
    createdAt: string;
  }
  
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
    const [isReviewsDialogOpen, setIsReviewsDialogOpen] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [hasUserReviewed, setHasUserReviewed] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
  
    useEffect(() => {
      checkUserReview();
    }, []);
  
    const checkUserReview = async () => {
      try {
        const response = await fetch(`/api/material/hasReviewed?materialId=${resource._id}`);
        if (response.ok) {
          const data = await response.json();
          setHasUserReviewed(data.hasReviewed);
        } else {
          toast.error('Failed to check review status.');
        }
      } catch (error) {
        console.error('Error checking user review:', error);
        toast.error('Error checking review status.');
      }
    };
  
    const handleInteraction = async (interactionType: 'views' | 'downloads' | 'shares' | 'bookmarks') => {
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
      onBookmark(resource._id);
    };
  
    const handleCopyLink = () => {
      navigator.clipboard.writeText(resource.fileUrl);
      toast.success('Link copied to clipboard');
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
  
    const handleReviewClick = async () => {
      try {
        const response = await fetch(`/api/material/reviews?materialId=${resource._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.reviews);
        setIsReviewsDialogOpen(true);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to fetch reviews');
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
          <div className="flex items-center cursor-pointer" onClick={handleReviewClick}>
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
            onClick={() => setIsReviewDialogOpen(true)}
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
  
        <Dialog open={isReviewsDialogOpen} onOpenChange={setIsReviewsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reviews for {resource.title}</DialogTitle>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="mb-4 border-b pb-2">
                    <p className="font-semibold">{review.userName}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                    <p>{review.text}</p>
                    <p className="text-sm text-gray-500">{format(new Date(review.createdAt), 'MM/dd/yyyy')}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available for this resource.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  