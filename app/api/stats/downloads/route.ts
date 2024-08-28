import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

export async function GET() {
  try {
    await dbConnect();

    const totalDownloads = await Material.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: "$downloadCount" } } }
    ]);

    return NextResponse.json({ totalDownloads: totalDownloads[0]?.totalDownloads || 0 });
  } catch (error) {
    console.error('Error fetching total downloads:', error);
    return NextResponse.json({ error: 'Failed to fetch total downloads' }, { status: 500 });
  }
}