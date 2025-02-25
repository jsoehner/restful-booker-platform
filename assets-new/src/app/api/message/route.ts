import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const messageData = await request.json();
    
    // Validate the message data
    const errorMessages: string[] = [];
    
    if (!messageData.name || messageData.name.trim() === '') {
      errorMessages.push('Name must be set');
    }
    
    if (!messageData.email || messageData.email.trim() === '') {
      errorMessages.push('Email must be set');
    } else if (!messageData.email.includes('@')) {
      errorMessages.push('Email must be valid format');
    }
    
    if (!messageData.phone || messageData.phone.trim() === '') {
      errorMessages.push('Phone must be set');
    }
    
    if (!messageData.subject || messageData.subject.trim() === '') {
      errorMessages.push('Subject must be set');
    }
    
    if (!messageData.description || messageData.description.trim() === '') {
      errorMessages.push('Message must be set');
    }
    
    if (errorMessages.length > 0) {
      return NextResponse.json({ errorMessages }, { status: 400 });
    }
    
    // Forward the message to the message service
    const messageApi = process.env.MESSAGE_API || 'http://localhost:3006';
    const response = await fetch(`${messageApi}/message/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json(
      { errorMessages: ['An unexpected error occurred. Please try again later.'] }, 
      { status: 500 }
    );
  }
} 