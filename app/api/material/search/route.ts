import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';
import { SortOrder } from 'mongoose';

interface QueryFilters {
    fileType?: string;
    course?: string;
    subject?: string;
    tags?: { $in: string[] };
    uploaderName?: { $regex: string, $options: 'i' };
  }

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { query, filters, sortBy, page } = await request.json();
    
    const limit = 10; // Number of items per page
    const skip = (page - 1) * limit;
    
    let searchQuery: any = {};
    if (query) {
      searchQuery = {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
          { uploaderName: { $regex: query, $options: 'i' } } // Add this line to search by author name
        ]
      };
    }
    
    let queryFilters: QueryFilters = {};
    if (filters.type) queryFilters.fileType = filters.type;
    if (filters.course) queryFilters.course = filters.course;
    if (filters.subject) queryFilters.subject = filters.subject;
    if (filters.tag) queryFilters.tags = { $in: [filters.tag] };
    
    let sort: { [key: string]: SortOrder } = {};
    switch (sortBy) {
      case 'mostViewed':
        sort = { views: -1 };
        break;
      case 'mostDownloaded':
        sort = { downloads: -1 };
        break;
      case 'mostShared':
        sort = { shares: -1 };
        break;
      case 'highestRated':
        sort = { rating: -1 };
        break;
      case 'mostReviewed':
        sort = { reviews: -1 };
        break;
      case 'aToZ':
        sort = { title: 1 };
        break;
      case 'zToA':
        sort = { title: -1 };
        break;
      case 'largestFirst':
        sort = { fileSize: -1 };
        break;
      case 'smallestFirst':
        sort = { fileSize: 1 };
        break;
      case 'authorAZ':
        sort = { uploaderName: 1 };
        break;
      case 'mostBookmarked':
        sort = { bookmarks: -1 };
        break;
      default:
        sort = { uploadDate: -1 }; // Default to most recent
    }
    
    const resources = await Material.find({ ...searchQuery, ...queryFilters })
      .sort(sort)
      .skip(skip)
      .limit(limit + 1)
      .lean();
    
    const hasMore = resources.length > limit;
    if (hasMore) resources.pop();

    return NextResponse.json({ resources, hasMore });
  } catch (error) {
    console.error('Error searching materials:', error);
    return NextResponse.json({ error: 'Failed to search materials' }, { status: 500 });
  }
}