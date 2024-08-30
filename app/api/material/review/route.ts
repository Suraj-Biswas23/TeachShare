// api/material/review/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';
import { Review } from '@/model/Review'; // You'll need to create this model

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    await dbConnect();

    const { materialId, rating, text } = await request.json();

    // Check if the user has already reviewed this material
    let existingReview = await Review.findOne({ userId, materialId });

    if (existingReview) {
      return NextResponse.json({ message: 'You have already reviewed this material' }, { status: 400 });
    }

    // Create a new review
    const newReview = new Review({
      userId,
      materialId,
      rating,
      text
    });
    await newReview.save();

    // Update the material's rating and review count
    const material = await Material.findById(materialId);
    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    const allReviews = await Review.find({ materialId });
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const newAverageRating = totalRating / allReviews.length;

    material.rating = newAverageRating;
    material.reviews = allReviews.length;
    await material.save();

    return NextResponse.json({ 
      message: 'Review submitted successfully',
      newRating: newAverageRating,
      totalReviews: allReviews.length
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}