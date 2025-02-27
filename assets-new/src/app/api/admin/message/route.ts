import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Forward the request to the message service
    const messageApi = process.env.MESSAGE_API || 'http://localhost:3006';
    const response = await fetch(`${messageApi}/messages`, {
      next: { revalidate: 10 } // Cache for 10 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data.messages || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json([], { status: 500 });
  }
} 