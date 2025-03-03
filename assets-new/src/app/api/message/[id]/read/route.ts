import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const messageApi = process.env.MESSAGE_API || 'http://localhost:3006';
    const response = await fetch(`${messageApi}/message/${id}/read`, {
      method: 'PUT',
      headers: {
        'Cookie': `token=${token.value}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to mark message as read: ${response.status}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking message as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark message as read' },
      { status: 500 }
    );
  }
} 