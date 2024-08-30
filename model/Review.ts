// model/Review.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interfaces
interface IReview extends Document {
  userId: string; // User's Clerk ID
  materialId: mongoose.Schema.Types.ObjectId; // Reference to the Material
  rating: number; // Rating value (1-5)
  text: string; // Optional review text
  createdAt: Date; // Timestamp for when the review was created
}

// Schema
const reviewSchema = new Schema<IReview>({
  userId: {
    type: String,
    required: true
  },
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material', // Reference to the Material model
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    default: '' // Optional field, defaults to an empty string
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index to ensure a user can only review a material once
reviewSchema.index({ userId: 1, materialId: 1 }, { unique: true });

// Model
export const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
