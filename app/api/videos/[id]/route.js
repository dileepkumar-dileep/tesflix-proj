import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const video = await prisma.video.findUnique({
      where: { id }
    });
    
    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    
    return NextResponse.json(video);
  } catch (error) {
    console.error('Fetch video error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
