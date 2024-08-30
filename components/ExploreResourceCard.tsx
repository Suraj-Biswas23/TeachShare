import React, { useState } from 'react';
import { FaDownload, FaEye, FaShare, FaStar, FaBookmark, FaInfoCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

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

interface ExploreResourceCardProps {
  resource: Resource;
}

export default function ExploreResourceCard({ resource }: ExploreResourceCardProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [dialogContent, setDialogContent] = useState<{title: string; content: string}>({title: '', content: ''});

  const handleInteraction = (action: 'download' | 'info' | 'bookmark' | 'share') => {
    setIsDialogOpen(true);
    if (isSignedIn) {
      setDialogContent(getDialogContent(action, true));
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            router.push('/dashboard/search-resources');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setDialogContent(getDialogContent(action, false));
    }
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const getDialogContent = (action: 'download' | 'info' | 'bookmark' | 'share', isSignedIn: boolean) => {
    if (isSignedIn) {
      return {
        title: 'Redirecting...',
        content: `You will be redirected to the search resources page to ${action} this resource in ${redirectCountdown} seconds...`
      };
    } else {
      return {
        title: 'Sign In Required',
        content: `Please sign in to ${action} this resource.`
      };
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => handleInteraction('download')}
              className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors duration-200"
            >
              Download
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
            </DialogHeader>
            <p>{dialogContent.content}</p>
            {!isSignedIn && <Button onClick={handleSignIn}>Sign In</Button>}
          </DialogContent>
        </Dialog>
      </div>

      <div className="absolute top-2 right-2 flex space-x-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button 
              onClick={() => handleInteraction('info')}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaInfoCircle />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
            </DialogHeader>
            {isSignedIn ? (
              <p>{resource.description || 'No description available.'}</p>
            ) : (
              <>
                <p>{dialogContent.content}</p>
                <Button onClick={handleSignIn}>Sign In</Button>
              </>
            )}
          </DialogContent>
        </Dialog>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button 
              onClick={() => handleInteraction('bookmark')}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaBookmark />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
            </DialogHeader>
            <p>{dialogContent.content}</p>
            {!isSignedIn && <Button onClick={handleSignIn}>Sign In</Button>}
          </DialogContent>
        </Dialog>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button 
              onClick={() => handleInteraction('share')}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaShare />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogContent.title}</DialogTitle>
            </DialogHeader>
            <p>{dialogContent.content}</p>
            {!isSignedIn && <Button onClick={handleSignIn}>Sign In</Button>}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}