import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Forward the request to the message service
    const messageApi = process.env.MESSAGE_API || 'http://localhost:3006';
    const response = await fetch(`${messageApi}/message/count`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch notification count: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching notification count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
} 