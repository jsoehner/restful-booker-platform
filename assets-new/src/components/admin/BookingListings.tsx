import React, { useEffect, useState } from 'react';
import BookingListing from './BookingListing';

interface BookingListingsProps {
  roomid: string;
  roomPrice?: string;
}

interface Booking {
  bookingid: number;
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
}

const BookingListings: React.FC<BookingListingsProps> = ({ roomid, roomPrice }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    getBookings();
  }, [roomid]);

  const getBookings = async () => {
    try {
      const response = await fetch(`/api/booking/?roomid=${roomid}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div>
      {bookings.map((booking, id) => (
        <div key={id}>
          <BookingListing 
            booking={booking} 
            getBookings={getBookings} 
            roomPrice={roomPrice} 
          />
        </div>
      ))}
    </div>
  );
};

export default BookingListings; 