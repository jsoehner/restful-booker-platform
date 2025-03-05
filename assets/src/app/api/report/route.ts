import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const bookingApi = process.env.BOOKING_API || 'http://localhost:3005';
    const response = await fetch(`${bookingApi}/report`, {
      headers: {
        'Cookie': `token=${token.value}`
      }
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