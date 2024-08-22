import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect'; // Adjust the import path as needed
import { Material } from '@/model/Material'; // Adjust the import path as needed

export async function GET() {
  try {
    // Connect to MongoDB using the cached connection
    await dbConnect();
    
    // Retrieve all materials using Mongoose model
    const allMaterials = await Material.find({}).exec();

    return NextResponse.json(allMaterials);
  } catch (error) {
    console.error('Error retrieving materials:', error);
    return NextResponse.json({ error: 'Failed to retrieve materials' }, { status: 500 });
  }
}
