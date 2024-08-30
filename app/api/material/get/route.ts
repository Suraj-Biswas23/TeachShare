import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';
import { SortOrder } from 'mongoose';

interface QueryFilters {
  fileType?: string;
  course?: string;
  subject?: string;
  tags?: { $in: string[] };
  uploadDate?: { $gte: Date };
  $and?: Array<{
    $or?: Array<{
      title?: { $regex: string, $options: string };
      description?: { $regex: string, $options: string };
      tags?: { $in: string[] };
      uploaderName?: { $regex: string, $options: string };
    }>;
    uploadDate?: { $gte: Date };
  }>;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { query, filters, sortBy, page } = await request.json();
    
    const limit = 10; // Number of items per page
    const skip = (page - 1) * limit;
    
    let queryFilters: QueryFilters = {};
    if (filters.type) queryFilters.fileType = filters.type;
    if (filters.course) queryFilters.course = filters.course;
    if (filters.subject) queryFilters.subject = filters.subject;
    if (filters.tag) queryFilters.tags = { $in: [filters.tag] };

    // Handle date filtering
    if (filters.dateRange) {
      const startDate = new Date(filters.dateRange);
      startDate.setHours(0, 0, 0, 0); // Set to beginning of the day
      queryFilters.uploadDate = { $gte: startDate };
    }

    // Combine search query with date filter
    if (query) {
      queryFilters.$and = [
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { tags: { $in: [query] } },
            { uploaderName: { $regex: query, $options: 'i' } }
          ]
        }
      ];
      
      // Add date filter to the $and array if it exists
      if (queryFilters.uploadDate) {
        queryFilters.$and.push({ uploadDate: queryFilters.uploadDate });
        delete queryFilters.uploadDate; // Remove the top-level uploadDate filter
      }
    }
    
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
    
    console.log('Query Filters:', JSON.stringify(queryFilters, null, 2));
    
    const resources = await Material.find(queryFilters)
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