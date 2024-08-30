// File: app/api/stats/popular-resources/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

export async function GET() {
  try {
    await dbConnect();

    const popularResources = await Material.aggregate([
      {
        $sort: {
          bookmarks: -1,
          downloads: -1
        }
      },
      {
        $limit: 5
      },
      {
        $project: {
          title: 1,
          description: 1,
          bookmarks: 1,
          downloads: 1,
          fileType: 1
        }
      }
    ]);

    console.log('Popular resources:', popularResources); // For debugging

    return NextResponse.json({ popularResources });
  } catch (error) {
    console.error('Error fetching popular resources:', error);
    return NextResponse.json({ error: 'Failed to fetch popular resources' }, { status: 500 });
  }
}