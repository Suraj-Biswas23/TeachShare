import mongoose, { Document, Schema } from 'mongoose';

// Interfaces
interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  role: 'student' | 'educator';
  purpose: string;
  bio?: string;
  uploadedMaterials: mongoose.Types.ObjectId[];
  savedMaterials: mongoose.Types.ObjectId[];
  joinedAt: Date;
}

interface IMaterial extends Document {
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'ppt' | 'video' | 'other';
  subject: string;
  course: string;  // Dropdown-selected course
  specificCourse?: string; // Optional field if the course is not available in the dropdown
  tags: string[];
  uploader: mongoose.Types.ObjectId;
  uploadDate: Date;
  likes: number;
  downloads: number;
}

// Schemas
const userSchema = new Schema<IUser>({
  clerkId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: {
    type: String,
    enum: ['student', 'educator'],
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  uploadedMaterials: [{
    type: Schema.Types.ObjectId,
    ref: 'Material'
  }],
  savedMaterials: [{
    type: Schema.Types.ObjectId,
    ref: 'Material'
  }],
  joinedAt: { 
    type: Date, 
    default: Date.now 
  },
});

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
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

// Models
export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export const Material = mongoose.models.Material || mongoose.model<IMaterial>('Material', materialSchema);
