"use client";

import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

interface PDFViewerProps {
  pdfUrl: string | null;
  onUploadComplete: (url: string, textContent: string) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, onUploadComplete }) => {
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(pdfUrl);

  const handleUploadComplete = async (res: any) => {
    console.log('Upload complete response:', res);
  
    if (Array.isArray(res) && res.length > 0) {
      const fileUrl = res[0].serverData.fileUrl;
      console.log('Uploaded file URL:', fileUrl);
      setUploadedPdfUrl(fileUrl);
  
      try {
        console.log('Calling PDF parsing API...');
        // const hardcodedPdfUrl = 'https://utfs.io/f/5f86daa7-9a26-4fcc-89e9-caa8ef97df07-5ybjyg.pdf';
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
      }
    } else {
      console.error("Response format is not as expected.");
    }
  };

  return (
    <div className="relative h-full flex flex-col items-center p-4">
      <div className="mb-4">
        <UploadButton
          endpoint="pdfUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      {uploadedPdfUrl ? (
        <iframe
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
