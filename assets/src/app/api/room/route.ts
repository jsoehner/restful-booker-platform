import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Server-side API route that proxies requests to the room service
export async function GET() {
  try {
    const roomApi = process.env.ROOM_API || 'http://localhost:3001';
    const response = await fetch(`${roomApi}/room/`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rooms: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json([], { status: 500 });
  }
} 

export async function POST(
  request: Request,
) {
  try {
    const roomApi = process.env.ROOM_API || 'http://localhost:3001';
    const body = await request.json();

    const token = cookies().get('token');
    if (!token) {
      return NextResponse.json(
        { errors: ['Authentication required'] },
        { status: 401 }
      );
    }
    
    const response = await fetch(`${roomApi}/room/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token.value}`
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { errors: errorData.fieldErrors || ['Failed to create room'] },
        { status: response.status }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { errors: ['An unexpected error occurred'] },
      { status: 500 }
    );
  }
}
