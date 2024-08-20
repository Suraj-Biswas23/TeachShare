"use client";

import React, { useState } from "react";
import ChatInterface from '@/components/ChatInterface';
import PDFViewer from '@/components/PDFViewer';

export default function ChatWithPDFPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string>('');

  const handlePdfUpload = (url: string, text: string) => {
    setPdfUrl(url);
    setTextContent(text);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 border-r border-gray-300">
        <PDFViewer pdfUrl={pdfUrl} onUploadComplete={handlePdfUpload} />
      </div>
      <div className="w-1/2">
        <ChatInterface textContent={textContent} />
      </div>
    </div>
  );
}
