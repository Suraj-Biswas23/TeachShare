import React, { useState, useEffect } from 'react';
import { MoreVertical, ThumbsUp, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'react-toastify';
// Import the format function from date-fns
import { format } from 'date-fns';

interface MaterialCardProps {
  material: {
    id: number;
    title: string;
    preview: string;
    likes: number;
    views: number;
    date: string;
    format: string;
    author?: string; // Optional
    bookmarked?: boolean; // Optional
  };
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const [bookmarked, setBookmarked] = useState(material.bookmarked);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(material.likes);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? 'Bookmark removed' : 'Bookmark added');
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
    toast.success(liked ? 'Like removed' : 'Like added');
  };

  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/sign-in';
    }
  };

  const handleShare = (platform: string) => {
    // Implement sharing logic here
    toast.success(`Shared on ${platform}`);
    setShowShareOptions(false);
  };

  // Format the date using date-fns to ensure consistency
  const formattedDate = format(new Date(material.date), 'MM/dd/yyyy');

  return (
    <div className="bg-white p-4 shadow-md rounded-lg border">
      <h2 className="text-lg font-semibold mb-2">{material.title}</h2>
      <p className="text-gray-600 mb-4">{material.preview}</p>
      <div className="text-sm text-gray-500 mb-2">
        <span>{material.author} • </span>
        <span>{formattedDate} • </span> {/* Use the consistently formatted date here */}
        <span>{material.format} • </span>
        <span>{material.views} views</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            className={`flex items-center ${liked ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-700`}
            onClick={toggleLike}
          >
            <ThumbsUp size={16} className="mr-1" />
            {likes}
          </button>
          <button className="flex items-center text-gray-700 hover:text-gray-900">
            <MessageSquare size={16} className="mr-1" />
            Chat
          </button>
          {isClient && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className={`flex items-center ${bookmarked ? 'text-yellow-500' : 'text-gray-700'} hover:text-yellow-500`}
                >
                  <Bookmark size={16} className="mr-1" />
                  Bookmark
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Login Required</AlertDialogTitle>
                  <AlertDialogDescription>
                    You need to be logged in to bookmark this content. Would you like to log in now?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogin}>
                    Log In
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <div className="relative">
          <button 
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <Share2 size={20} />
          </button>
          {showShareOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button 
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleShare('Facebook')}
              >
                Share via Facebook
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleShare('Twitter')}
              >
                Share via Twitter
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => handleShare('LinkedIn')}
              >
                Share via LinkedIn
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
