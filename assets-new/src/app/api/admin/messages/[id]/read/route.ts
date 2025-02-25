import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Forward the request to the message service
    const messageApi = process.env.MESSAGE_API || 'http://localhost:3006';
    const response = await fetch(`${messageApi}/message/${id}/read`, {
      method: 'PUT',
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