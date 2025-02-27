import React, { useState } from 'react';

interface AdminBookingProps {
  closeBooking: () => void;
  dates: {
    slots: Date[];
    start: Date;
    end: Date;
  } | null;
}

interface BookingDetails {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
}

const AdminBooking: React.FC<AdminBookingProps> = ({ closeBooking, dates }) => {
  const [booking, setBooking] = useState<BookingDetails>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    bookingdates: {
      checkin: dates?.start.toISOString().split('T')[0] || '',
      checkout: dates?.end.toISOString().split('T')[0] || ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });
      
      if (response.ok) {
        closeBooking();
      } else {
        console.error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('bookingdates.')) {
      const dateField = name.split('.')[1];
      setBooking(prev => ({
        ...prev,
        bookingdates: {
          ...prev.bookingdates,
          [dateField]: value
        }
      }));
    } else {
      setBooking(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="row">
      <div className="col-sm-2"></div>
      <div className="col-sm-8">
        <div className="card">
          <div className="card-header">
            <h2>Book a room</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstname">First name:</label>
                <input 
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={booking.firstname}
                  onChange={updateField}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last name:</label>
                <input 
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={booking.lastname}
                  onChange={updateField}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email"
                  className="form-control"
                  name="email"
                  value={booking.email}
                  onChange={updateField}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input 
                  type="text"
                  className="form-control"
                  name="phone"
                  value={booking.phone}
                  onChange={updateField}
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkin">Check in:</label>
                <input 
                  type="date"
                  className="form-control"
                  name="bookingdates.checkin"
                  value={booking.bookingdates.checkin}
                  onChange={updateField}
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkout">Check out:</label>
                <input 
                  type="date"
                  className="form-control"
                  name="bookingdates.checkout"
                  value={booking.bookingdates.checkout}
                  onChange={updateField}
                />
              </div>
              <div className="form-group">
                <button 
                  type="button" 
                  className="btn btn-outline-danger" 
                  onClick={closeBooking}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-outline-primary float-right"
                >
                  Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-sm-2"></div>
    </div>
  );
};

export default AdminBooking; 