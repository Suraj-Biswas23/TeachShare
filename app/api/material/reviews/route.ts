// api/material/reviews/route.ts
import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Review } from '@/model/Review';
import { User } from '@/model/User';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const materialId = url.searchParams.get('materialId');

    if (!materialId) {
      return NextResponse.json({ error: 'Material ID is required' }, { status: 400 });
    }

    const reviews = await Review.find({ materialId })
      .sort({ createdAt: -1 })
      .lean();

    const userIds = Array.from(new Set(reviews.map(review => review.userId)));

    const users = await User.find({ clerkId: { $in: userIds } }).lean();

    const userMap = users.reduce((acc, user) => {
      acc[user.clerkId] = user.name;
      return acc;
    }, {} as Record<string, string>);

    const reviewsWithUserDetails = reviews.map(review => ({
      ...review,
      userName: userMap[review.userId] || 'Unknown',
    }));

    return NextResponse.json({ reviews: reviewsWithUserDetails });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}