import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { User } from '@/model/User';

export async function GET() {
  try {
    await dbConnect();

    const activeUsers = await User.countDocuments();

    return NextResponse.json({ activeUsers });
  } catch (error) {
    console.error('Error fetching active users:', error);
    return NextResponse.json({ error: 'Failed to fetch active users' }, { status: 500 });
  }
}