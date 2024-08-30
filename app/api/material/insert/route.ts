// import { NextResponse, NextRequest } from 'next/server';
// import { getAuth } from '@clerk/nextjs/server';
// import dbConnect from '@/utils/dbConnect';
// import { Material } from '@/model/Material';

// // Define an interface for the material data
// interface MaterialData {
//   title: string;
//   description: string;
//   course: string;
//   subject: string;
//   fileType: string;
//   tags: string[];
//   fileUrl: string;
//   uploaderId: string;
//   uploaderName: string;
//   uploadDate: Date;
//   specificCourse?: string;  // Make this optional
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = getAuth(request);
//     if (!userId) {
//       return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
//     }

//     const { 
//       title, 
//       description, 
//       course, 
//       specificCourse,
//       subject, 
//       fileType, 
//       tags, 
//       fileUrl 
//     } = await request.json();

//     await dbConnect();

//     const user = await Material.db.collection('users').findOne({ clerkId: userId });
//     if (!user) {
//       return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
//     }

//     // Create the material data object with the defined interface
//     const materialData: MaterialData = {
//       title,
//       description,
//       course,
//       subject,
//       fileType: fileType.toLowerCase(),
//       tags,
//       fileUrl,
//       uploaderId: userId,
//       uploaderName: user.name,
//       uploadDate: new Date(),
//     };

//     // Add specificCourse only if it's provided
//     if (specificCourse) {
//       materialData.specificCourse = specificCourse;
//     }

//     const result = await Material.create(materialData);

//     return NextResponse.json({ message: 'Material inserted successfully', materialId: result._id });
//   } catch (error) {
//     console.error('Error inserting material:', error);
//     return NextResponse.json({ error: 'Failed to insert material' }, { status: 500 });
//   }
// }


import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

interface MaterialData {
  title: string;
  description: string;
  course: string;
  subject: string;
  fileType: string;
  tags: string[];
  fileUrl: string;
  uploaderId: string;
  uploaderName: string;
  uploadDate: Date;
  specificCourse?: string;
  views: number;
  downloads: number;
  shares: number;
  rating: number;
  reviews: number;
  bookmarks: number;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    const { 
      title, 
      description, 
      course, 
      specificCourse,
      subject, 
      fileType, 
      tags, 
      fileUrl 
    } = await request.json();

    await dbConnect();

    const user = await Material.db.collection('users').findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    const materialData: MaterialData = {
      title,
      description,
      course,
      subject,
      fileType: fileType.toLowerCase(),
      tags,
      fileUrl,
      uploaderId: userId,
      uploaderName: user.name,
      uploadDate: new Date(),
      views: 0,
      downloads: 0,
      shares: 0,
      rating: 0,
      reviews: 0,
      bookmarks: 0,
    };

    if (specificCourse) {
      materialData.specificCourse = specificCourse;
    }

    const result = await Material.create(materialData);

    return NextResponse.json({ message: 'Material inserted successfully', materialId: result._id });
  } catch (error) {
    console.error('Error inserting material:', error);
    return NextResponse.json({ error: 'Failed to insert material' }, { status: 500 });
  }
}