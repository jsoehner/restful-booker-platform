import { NextResponse } from 'next/server';
import { RoomResponse } from '@/libs/Api';

// Server-side API route that proxies requests to the room service
export async function GET() {
  try {
    const roomApi = process.env.ROOM_API || 'http://localhost:3001';
    const response = await fetch(`${roomApi}/room/`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rooms: ${response.status}`);
    }
    
    const data: RoomResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ rooms: [] }, { status: 500 });
  }
} 