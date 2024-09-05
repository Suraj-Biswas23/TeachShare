import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    await dbConnect();

    const recentUploads = await Material.find({ uploaderId: userId })
      .sort({ uploadDate: -1 })
      .limit(5)
      .select('title description uploadDate fileType');

    return NextResponse.json(recentUploads);
  } catch (error) {
    console.error('Error fetching recent uploads:', error);
    return NextResponse.json({ error: 'Failed to fetch recent uploads' }, { status: 500 });
  }
}