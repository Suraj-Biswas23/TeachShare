// app/api/material/bookmark/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import { Bookmark } from '@/model/Bookmark';

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    const { materialId } = await request.json();

    await dbConnect();

    const existingBookmark = await Bookmark.findOne({ userId, materialId });
    if (existingBookmark) {
      await Bookmark.deleteOne({ userId, materialId });
      return NextResponse.json({ message: 'Bookmark removed successfully' });
    } else {
      await Bookmark.create({ userId, materialId });
      return NextResponse.json({ message: 'Bookmark added successfully' });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return NextResponse.json({ error: 'Failed to toggle bookmark' }, { status: 500 });
  }
}