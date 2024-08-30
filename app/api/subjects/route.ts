import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material'; // Adjust the import path as needed

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Ensure the database connection is established
    await dbConnect();
    console.log('Successfully connected to MongoDB');
    
    // Fetch unique subject names from the materials collection
    console.log('Fetching unique subject names...');
    const subjects = await Material.distinct('subject');
    console.log('Subject names fetched successfully:', subjects);

    // Sort the subjects alphabetically
    subjects.sort((a, b) => a.localeCompare(b));

    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Error retrieving subject names:', error);
    return NextResponse.json({ error: 'Failed to retrieve subject names' }, { status: 500 });
  }
}