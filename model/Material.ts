// import mongoose, { Document, Schema } from 'mongoose';

// // Interfaces
// interface IMaterial extends Document {
//   title: string;
//   description: string;
//   fileUrl: string;
//   fileType: 'pdf' | 'docx' | 'xlsx' | 'ppt' | 'other';
//   subject: string;
//   course: string;
//   specificCourse?: string;
//   tags: string[];
//   uploaderId: string;      // User's Clerk ID
//   uploaderName: string;    // User's name
//   uploadDate: Date;
//   downloads: number;
//   views: number;
//   shares: number;
//   rating: number;
//   reviews: number;
//   bookmarks: number;
// }

// // Schema
// const materialSchema = new Schema<IMaterial>({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   fileUrl: {
//     type: String,
//     required: true
//   },
//   fileType: {
//     type: String,
//     enum: ['pdf', 'docx', 'xlsx', 'ppt', 'other'],
//     required: true
//   },
//   subject: {
//     type: String,
//     required: true
//   },
//   course: {
//     type: String,
//     required: true
//   },
//   specificCourse: {
//     type: String,
//     default: null // Optional field if the dropdown doesn't cover the course
//   },
//   tags: [{
//     type: String
//   }],
//   uploaderId: {
//     type: String,
//     required: true
//   },
//   uploaderName: {
//     type: String,
//     required: true
//   },
//   uploadDate: {
//     type: Date,
//     default: Date.now
//   },
//   downloads: {
//     type: Number,
//     default: 0
//   },
//   views: {
//     type: Number,
//     default: 0
//   },
//   shares: {
//     type: Number,
//     default: 0
//   },
//   rating: {
//     type: Number,
//     default: 0
//   },
//   reviews: {
//     type: Number,
//     default: 0
//   },
//   bookmarks: {
//     type: Number,
//     default: 0
//   }
// });

// // Model
// export const Material = mongoose.models.Material || mongoose.model<IMaterial>('Material', materialSchema);

import mongoose, { Document, Schema, Model } from 'mongoose';

// Interfaces
interface IMaterial extends Document {
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'ppt' | 'other';
  subject: string;
  course: string;
  specificCourse?: string;
  tags: string[];
  uploaderId: string;      // User's Clerk ID
  uploaderName: string;    // User's name
  uploadDate: Date;
  downloads: number;
  views: number;
  shares: number;
  rating: number;
  reviews: number;
  bookmarks: number;
}

interface IMaterialModel extends Model<IMaterial> {
  deleteMaterial(materialId: string, userId: string): Promise<{ message: string }>;
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
    enum: ['pdf', 'docx', 'xlsx', 'ppt', 'other'],
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
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  bookmarks: {
    type: Number,
    default: 0
  }
});

// Static method for deleting a material
materialSchema.statics.deleteMaterial = async function(materialId: string, userId: string) {
  const material = await this.findOne({ _id: materialId, uploaderId: userId });
  if (!material) {
    throw new Error('Material not found or you do not have permission to delete it');
  }

  // Remove associated bookmarks
  await mongoose.model('Bookmark').deleteMany({ materialId: materialId });

  // Remove associated reviews
  await mongoose.model('Review').deleteMany({ materialId: materialId });

  // Remove associated user interactions
  await mongoose.model('UserInteraction').deleteMany({ materialId: materialId });

  // Delete the material itself
  await material.remove();

  return { message: 'Material deleted successfully' };
};

// Model
export const Material = (mongoose.models.Material || mongoose.model<IMaterial, IMaterialModel>('Material', materialSchema)) as IMaterialModel;