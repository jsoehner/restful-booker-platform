import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const roomId = params.roomId;
    const bookingApi = process.env.BOOKING_API || 'http://localhost:3000';
    const response = await fetch(`${bookingApi}/booking/?roomid=${roomId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch bookings: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json([], { status: 500 });
  }
} 