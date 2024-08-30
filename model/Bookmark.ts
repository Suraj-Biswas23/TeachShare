import mongoose, { Document, Schema } from 'mongoose';

interface IBookmark extends Document {
  userId: string;
  materialId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>({
  userId: { type: String, required: true },
  materialId: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
  createdAt: { type: Date, default: Date.now },
});

bookmarkSchema.index({ userId: 1, materialId: 1 }, { unique: true });

export const Bookmark = mongoose.models.Bookmark || mongoose.model<IBookmark>('Bookmark', bookmarkSchema);