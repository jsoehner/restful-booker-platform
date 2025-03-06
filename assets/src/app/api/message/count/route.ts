import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const messageApi = process.env.MESSAGE_API || 'http://localhost:3006';
    const response = await fetch(`${messageApi}/message/count`);
    
    console.log(response);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch message count' },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching message count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch message count' },
      { status: 500 }
    );
  }
}