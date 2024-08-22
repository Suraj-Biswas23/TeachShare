import mongoose from 'mongoose';

// Define the schema for the Course
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Course name, required and unique
  description: { type: String, required: false }, // Optional description for the course
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the course was created
  updatedAt: { type: Date, default: Date.now } // Timestamp for when the course was last updated
});

// Add a pre-save hook to update the `updatedAt` field
courseSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the model
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export { Course };
