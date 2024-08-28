"use client";

import React, { useState, useEffect } from "react";
import { UploadButton } from "@/utils/uploadthing";

interface PDFViewerProps {
  pdfUrl: string | null;
  onUploadComplete: (url: string, textContent: string) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, onUploadComplete }) => {
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(pdfUrl);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleUploadComplete = async (res: any) => {
    console.log('Upload complete response:', res);
  
    if (Array.isArray(res) && res.length > 0) {
      const fileUrl = res[0].serverData.fileUrl;
      const fileName = res[0].name;
      console.log('Uploaded file URL:', fileUrl);
      setUploadedPdfUrl(fileUrl);
      setUploadedFileName(fileName);
      setIsLoading(true);
      setRetryCount(0);
  
      try {
        console.log('Calling PDF parsing API...');
        const response = await fetch('/api/pdf-parser/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pdfUrl: fileUrl }),
        });
      
        if (response.ok) {
          const data = await response.json();
          console.log('PDF parsing response:', data);
          const textContent = data.textContent;
          onUploadComplete(fileUrl, textContent);
        } else {
          console.error('Error parsing PDF:', response.status, response.statusText);
          onUploadComplete(fileUrl, '');
        }
      } catch (error) {
        console.error("Error parsing PDF:", error);
        onUploadComplete(fileUrl, '');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Response format is not as expected.");
    }
  };

  const handleRemoveFile = () => {
    setUploadedPdfUrl(null);
    setUploadedFileName(null);
    onUploadComplete('', '');
  };

  useEffect(() => {
    if (uploadedPdfUrl && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prevCount => prevCount + 1);
      }, 2000); // Retry after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [uploadedPdfUrl, retryCount]);

  return (
    <div className="relative h-full flex flex-col items-center p-4">
      <div className="mb-4">
        {uploadedFileName ? (
          <div className="flex items-center space-x-2">
            <span>{uploadedFileName}</span>
            <button 
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700"
              type="button"
            >
              ✕
            </button>
          </div>
        ) : (
          <UploadButton
            endpoint="pdfUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
      </div>
      {isLoading ? (
        <p className="text-center">Loading PDF...</p>
      ) : uploadedPdfUrl ? (
        <iframe
          key={`${uploadedPdfUrl}-${retryCount}`}
          src={`https://docs.google.com/gview?url=${encodeURIComponent(uploadedPdfUrl)}&embedded=true`}
          className="flex-1 w-full"
          title="PDF Viewer"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-center">No PDF to display</p>
      )}
    </div>
  );
};

export default PDFViewer;