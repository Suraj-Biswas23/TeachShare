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

// Schema
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

// Model
export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
