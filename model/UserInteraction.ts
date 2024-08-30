// model/UserInteraction.ts
import mongoose from 'mongoose';

const UserInteractionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
    required: true,
  },
  interactionType: {
    type: String,
    enum: ['views', 'downloads', 'shares', 'bookmarks'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create a compound index to ensure uniqueness
UserInteractionSchema.index({ userId: 1, materialId: 1, interactionType: 1 }, { unique: true });

export const UserInteraction = mongoose.models.UserInteraction || mongoose.model('UserInteraction', UserInteractionSchema);