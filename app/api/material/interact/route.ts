// api/material/interact/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';
import { UserInteraction } from '@/model/UserInteraction';

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    await dbConnect();

    const { materialId, interactionType } = await request.json();

    // Handle rating separately
    if (interactionType === 'rating') {
      return NextResponse.json({ error: 'Ratings should be submitted through the review endpoint' }, { status: 400 });
    }

    // Check if the interaction already exists
    let interaction = await UserInteraction.findOne({
      userId,
      materialId,
      interactionType
    });

    if (!interaction) {
      // If the interaction doesn't exist, create it and update the material
      interaction = new UserInteraction({
        userId,
        materialId,
        interactionType
      });
      await interaction.save();

      // Update the material's count
      await Material.findByIdAndUpdate(materialId, {
        $inc: { [interactionType]: 1 }
      });

      return NextResponse.json({ message: 'Interaction recorded successfully' });
    } else {
      return NextResponse.json({ message: 'Interaction already recorded' });
    }
  } catch (error) {
    console.error('Error recording interaction:', error);
    return NextResponse.json({ error: 'Failed to record interaction' }, { status: 500 });
  }
}