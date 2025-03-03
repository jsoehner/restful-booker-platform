import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const roomApi = process.env.ROOM_API || 'http://localhost:3001';
    const response = await fetch(`${roomApi}/room/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch room: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const roomApi = process.env.ROOM_API || 'http://localhost:3001';
    const body = await request.json();
    
    const response = await fetch(`${roomApi}/room/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { errors: errorData.errors || ['Failed to update room'] },
        { status: response.status }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json(
      { errors: ['An unexpected error occurred'] },
      { status: 500 }
    );
  }
} 