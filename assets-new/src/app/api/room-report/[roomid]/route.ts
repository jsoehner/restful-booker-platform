import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { roomid: string } }
) {
  try {
    const roomid = params.roomid;
    
    // Forward the request to the booking service
    const bookingApi = process.env.BOOKING_API || 'http://localhost:3000';
    const response = await fetch(`${bookingApi}/booking/?roomid=${roomid}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch room report: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching room report:', error);
    return NextResponse.json([], { status: 500 });
  }
} 