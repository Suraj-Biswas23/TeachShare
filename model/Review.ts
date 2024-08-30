import mongoose, { Document, Schema } from 'mongoose';

interface IReview extends Document {
  userId: string;
  materialId: mongoose.Schema.Types.ObjectId;
  rating: number;
  text: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  userId: {
    type: String,
    required: true
  },
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
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
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.index({ userId: 1, materialId: 1 }, { unique: true });

export const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);