// app/api/material/my-resources/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const userMaterials = await Material.find({ uploaderId: userId }).exec();

    return NextResponse.json(userMaterials);
  } catch (error) {
    console.error('Error retrieving user materials:', error);
    return NextResponse.json({ error: 'Failed to retrieve materials' }, { status: 500 });
  }
}