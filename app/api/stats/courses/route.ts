import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import { Material } from '@/model/Material';

export async function GET() {
  try {
    await dbConnect();

    const courses = await Material.distinct('course').then(courses => courses.length);

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}