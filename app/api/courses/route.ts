import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Course } from '@/model/Course'; // Adjust the import path as needed

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Ensure the database connection is established
    await dbConnect();
    console.log('Successfully connected to MongoDB');
    
    // Fetch only the `name` field of all courses
    console.log('Fetching course names...');
    const courseNames = await Course.find({}, { name: 1, _id: 0 });
    console.log('Course names fetched successfully:', courseNames);

    return NextResponse.json(courseNames);
  } catch (error) {
    console.error('Error retrieving course names:', error);
    return NextResponse.json({ error: 'Failed to retrieve course names' }, { status: 500 });
  }
}
