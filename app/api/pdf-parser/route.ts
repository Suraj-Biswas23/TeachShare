import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
  try {
    console.log('Received POST request for PDF parsing');

    const { pdfUrl } = await req.json();
    console.log('PDF URL received:', pdfUrl);

    const response = await fetch(pdfUrl);
    console.log('Fetch response:', response);

    if (response.ok) {
      const buffer = await response.buffer();
      console.log('PDF buffer:', buffer);

      const data = await pdfParse(buffer);
      console.log('PDF parsing result:', data);

      return NextResponse.json({ textContent: data.text });
    } else {
      console.error('Error fetching PDF:', response.status, response.statusText);
      return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: response.status });
    }
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}