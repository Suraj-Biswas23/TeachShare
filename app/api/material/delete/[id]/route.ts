import { NextRequest, NextResponse } from 'next/server';
import { Material } from '@/model/Material';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ message: 'Invalid resource ID' }, { status: 400 });
  }

  await dbConnect();

  try {
    const result = await Material.deleteMaterial(id, userId);
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting resource:', error);
    if (error instanceof Error) {
      const status = error.message.includes('not found') ? 404 : 500;
      return NextResponse.json({ message: error.message }, { status });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}