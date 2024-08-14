import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from "@clerk/nextjs/server";
import { User } from "@/model/User";  // Assuming you've exported User from your model file
import dbConnect from '@/utils/dbConnect';

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { name, email, role, purpose, bio } = await request.json();

    let user = await User.findOne({ clerkId: userId });

    if (user) {
      // Update existing user
      user.name = name;
      user.email = email;
      // Optionally update other fields if they're provided
      if (role) user.role = role;
      if (purpose) user.purpose = purpose;
      if (bio) user.bio = bio;
      await user.save();
    } else {
      // Create new user
      user = new User({
        clerkId: userId,
        name,
        email,
        role: role || 'student',  // Default to 'student' if not provided
        purpose: purpose || '',
        bio: bio || '',
      });
      await user.save();
    }

    return NextResponse.json({ message: 'User saved successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ error: 'Error saving user' }, { status: 500 });
  }
}
