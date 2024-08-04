// app/api/check-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect'; // Adjust the import path as necessary
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  const { clerkId } = await req.json();

  try {
    await dbConnect();
    const db = mongoose.connection.db;
    const users = db.collection('users');

    const user = await users.findOne({ clerkId });

    if (user) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
