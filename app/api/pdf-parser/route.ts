import { NextRequest, NextResponse } from 'next/server';
import * as pdfParse from "pdf-parse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pdfUrl } = body;

    if (!pdfUrl) {
      return NextResponse.json({ message: 'PDF URL is required' }, { status: 400 });
    }

    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const data = await pdfParse.default(buffer);
    const textContent = data.text;

    return NextResponse.json({ textContent }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error parsing PDF:', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Error parsing PDF', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;