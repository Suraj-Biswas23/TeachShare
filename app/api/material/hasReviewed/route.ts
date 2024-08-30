// api/material/hasReviewed/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import { Review } from '@/model/Review';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const materialId = searchParams.get('materialId');

    if (!materialId) {
      return NextResponse.json({ error: 'Material ID is required' }, { status: 400 });
    }

    const existingReview = await Review.findOne({ userId, materialId });

    return NextResponse.json({ hasReviewed: !!existingReview });
  } catch (error) {
    console.error('Error checking user review:', error);
    return NextResponse.json({ error: 'Failed to check user review' }, { status: 500 });
  }
}