// import { NextResponse } from 'next/server';
// import dbConnect from '@/utils/dbConnect'; // Adjust the import path as needed
// import { Material } from '@/model/Material'; // Adjust the import path as needed

// export async function GET() {
//   try {
//     // Connect to MongoDB using the cached connection
//     await dbConnect();
    
//     // Retrieve all materials using Mongoose model
//     const allMaterials = await Material.find({}).exec();

//     return NextResponse.json(allMaterials);
//   } catch (error) {
//     console.error('Error retrieving materials:', error);
//     return NextResponse.json({ error: 'Failed to retrieve materials' }, { status: 500 });
//   }
// }


import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';
import { SortOrder } from 'mongoose';

interface QueryFilters {
  fileType?: string;
  course?: string;
  subject?: string;
  tags?: string;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { filters, sortBy, page } = await request.json();
    
    const limit = 10; // Number of items per page
    const skip = (page - 1) * limit;
    
    let query: QueryFilters = {};
    if (filters.type) query.fileType = filters.type;
    if (filters.course) query.course = filters.course;
    if (filters.subject) query.subject = filters.subject;
    if (filters.tag) query.tags = filters.tag;
    
    let sort: { [key: string]: SortOrder } = {};
    if (sortBy === 'date') {
      sort = { uploadDate: -1 };
    } else if (sortBy === 'popularity') {
      sort = { downloads: -1 };
    }
    
    const resources = await Material.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit + 1)
      .lean();
    
    const hasMore = resources.length > limit;
    if (hasMore) resources.pop();

    return NextResponse.json({ resources, hasMore });
  } catch (error) {
    console.error('Error retrieving materials:', error);
    return NextResponse.json({ error: 'Failed to retrieve materials' }, { status: 500 });
  }
}