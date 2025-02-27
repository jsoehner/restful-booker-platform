import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Forward the request to the booking service
    const bookingApi = process.env.BOOKING_API || 'http://localhost:3000';
    const response = await fetch(`${bookingApi}/report`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch report: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json([], { status: 500 });
  }
} 