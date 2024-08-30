// app/api/material/delete/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Material } from '@/model/Material'; // Ensure this path is correct
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
    // Find the material by ID and check if it belongs to the current user
    const material = await Material.findOne({ _id: id, uploaderId: userId });
    if (!material) {
      return NextResponse.json({ message: 'Material not found or you do not have permission to delete it' }, { status: 404 });
    }

    // Remove associated bookmarks
    await mongoose.model('Bookmark').deleteMany({ materialId: id });

    // Remove associated reviews
    await mongoose.model('Review').deleteMany({ materialId: id });

    // Remove associated user interactions
    await mongoose.model('UserInteraction').deleteMany({ materialId: id });

    // Delete the material itself
    await Material.deleteOne({ _id: id });

    return NextResponse.json({ message: 'Material deleted successfully' }, { status: 200 });
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
