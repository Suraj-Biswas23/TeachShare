// app/api/material/bookmarked/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import { Bookmark } from '@/model/Bookmark';
import { Material } from '@/model/Material';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    await dbConnect();

    const bookmarks = await Bookmark.find({ userId }).lean();
    const materialIds = bookmarks.map(bookmark => bookmark.materialId);

    const resources = await Material.find({ _id: { $in: materialIds } }).lean();

    return NextResponse.json({ resources });
  } catch (error) {
    console.error('Error fetching bookmarked resources:', error);
    return NextResponse.json({ error: 'Failed to fetch bookmarked resources' }, { status: 500 });
  }
}