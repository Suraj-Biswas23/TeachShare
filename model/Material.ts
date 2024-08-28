import mongoose, { Document, Schema } from 'mongoose';

// Interfaces
interface IMaterial extends Document {
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'ppt' | 'video' | 'other';
  subject: string;
  course: string;
  specificCourse?: string;
  tags: string[];
  uploaderId: string;      // User's Clerk ID
  uploaderName: string;    // User's name
  uploadDate: Date;
  likes: number;
  downloads: number;
}

// Schema
const materialSchema = new Schema<IMaterial>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['pdf', 'doc', 'ppt', 'video', 'other'],
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  specificCourse: {
    type: String,
    default: null // Optional field if the dropdown doesn't cover the course
  },
  tags: [{
    type: String
  }],
  uploaderId: {
    type: String,
    required: true
  },
  uploaderName: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  }
});

// Model
export const Material = mongoose.models.Material || mongoose.model<IMaterial>('Material', materialSchema);