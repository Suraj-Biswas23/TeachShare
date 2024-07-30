import React, { useState, useEffect } from 'react';
import { MoreVertical, ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';
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

interface MaterialCardProps {
  material: {
    id: number;
    title: string;
    preview: string;
    likes: number;
    bookmarked: boolean;
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
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/sign-in';
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg border">
      <h2 className="text-lg font-semibold mb-2">{material.title}</h2>
      <p className="text-gray-600 mb-4">{material.preview}</p>
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            className={`flex items-center ${liked ? 'text-blue-500' : 'text-gray-700'} hover:text-blue-700`}
            onClick={toggleLike}
          >
            <ThumbsUp size={16} className="mr-1" fill={liked ? '#03adfc' : 'none'} />
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
            <MoreVertical size={20} />
          </button>
          {showShareOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Share via Facebook
              </a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Share via Twitter
              </a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Share via LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}