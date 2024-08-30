import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const materialId = params.id;

    // Find the material and increment its download count
    const updatedMaterial = await Material.findByIdAndUpdate(
      materialId,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!updatedMaterial) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    // Here, you would typically send the file for download
    // For this example, we'll just return a success message
    return NextResponse.json({ message: 'Download successful', downloads: updatedMaterial.downloads });
  } catch (error) {
    console.error('Error processing download:', error);
    return NextResponse.json({ error: 'Failed to process download' }, { status: 500 });
  }
}