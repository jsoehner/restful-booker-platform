import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();
    
    // Validate the booking data
    const errorMessages: string[] = [];
    
    if (!bookingData.firstname || bookingData.firstname.trim() === '') {
      errorMessages.push('Firstname should not be blank');
    }
    
    if (!bookingData.lastname || bookingData.lastname.trim() === '') {
      errorMessages.push('Lastname should not be blank');
    }
    
    if (!bookingData.email || bookingData.email.trim() === '') {
      errorMessages.push('Email should not be blank');
    } else if (!bookingData.email.includes('@')) {
      errorMessages.push('Email should be valid');
    }
    
    if (!bookingData.phone || bookingData.phone.trim() === '') {
      errorMessages.push('Phone should not be blank');
    }
    
    if (!bookingData.bookingdates?.checkin) {
      errorMessages.push('Check in date should not be blank');
    }
    
    if (!bookingData.bookingdates?.checkout) {
      errorMessages.push('Check out date should not be blank');
    }
    
    if (bookingData.bookingdates?.checkin && bookingData.bookingdates?.checkout) {
      const checkin = new Date(bookingData.bookingdates.checkin);
      const checkout = new Date(bookingData.bookingdates.checkout);
      
      if (checkin >= checkout) {
        errorMessages.push('Check out date should be after check in date');
      }
    }
    
    if (errorMessages.length > 0) {
      return NextResponse.json({ errorMessages }, { status: 400 });
    }
    
    // Forward the booking to the booking service
    const bookingApi = process.env.BOOKING_API || 'http://localhost:3000';
    const response = await fetch(`${bookingApi}/booking/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { errorMessages: ['An unexpected error occurred. Please try again later.'] }, 
      { status: 500 }
    );
  }
} 