import mongoose, { Document, Schema } from 'mongoose';

// Interfaces
interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  role: 'student' | 'educator';
  university: string;
  department: string;
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
  university: {
    type: String,
    required: true
  },
  department: {
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