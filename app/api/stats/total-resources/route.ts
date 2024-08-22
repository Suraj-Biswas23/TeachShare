import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

export async function GET() {
  try {
    await dbConnect();

    const totalResources = await Material.countDocuments();

    return NextResponse.json({ totalResources });
  } catch (error) {
    console.error('Error fetching total resources:', error);
    return NextResponse.json({ error: 'Failed to fetch total resources' }, { status: 500 });
  }
}