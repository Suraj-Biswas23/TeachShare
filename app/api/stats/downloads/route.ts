import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

export async function GET() {
  try {
    await dbConnect();

    const result = await Material.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: "$downloads" } } }
    ]);

    const totalDownloads = result[0]?.totalDownloads || 0;

    console.log('Total downloads:', totalDownloads); // Add this line for debugging

    return NextResponse.json({ totalDownloads });
  } catch (error) {
    console.error('Error fetching total downloads:', error);
    return NextResponse.json({ error: 'Failed to fetch total downloads' }, { status: 500 });
  }
}