import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import BookingConfirmation from './BookingConfirmation';

interface RoomBookingFormProps {
  roomid: number;
  roomPrice: number;
  toggleBooking: () => void;
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
  depositpaid: boolean;
  roomid: number;
}

interface Event {
  start: Date;
  end: Date;
  title: string;
}

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({ roomid, roomPrice, toggleBooking }) => {
  const [completed, setComplete] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [booking, setBooking] = useState<BookingDetails>({
    bookingdates: {
      checkin: '',
      checkout: ''
    },
    depositpaid: false,
    firstname: '',
    lastname: '',
    roomid: roomid,
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Fetch existing bookings for this room
    const fetchRoomReport = async () => {
      try {
        const response = await fetch(`/api/report/room/${roomid}`);
        if (response.ok) {
          const data = await response.json();
          
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching room report:', error);
      }
    };

    fetchRoomReport();
  }, [roomid]);

  const updateState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    // Handle nested properties for bookingdates
    if (name === 'firstname') {
      setBooking(prev => ({ ...prev, firstname: value }));
    } else if (name === 'lastname') {
      setBooking(prev => ({ ...prev, lastname: value }));
    } else if (name === 'email') {
      setBooking(prev => ({ ...prev, email: value }));
    } else if (name === 'phone') {
      setBooking(prev => ({ ...prev, phone: value }));
    } else if (name.startsWith('bookingdates.')) {
      const dateField = name.split('.')[1];
      setBooking(prev => ({
        ...prev,
        bookingdates: {
          ...prev.bookingdates,
          [dateField]: value
        }
      }));
    }
  };

  const handleSelect = (result: { start: Date; end: Date; slots: Date[] }) => {
    if (result.slots.length > 1) {
      const currentBookingDates = booking.bookingdates;
      
      currentBookingDates.checkin = moment(result.start).format("YYYY-MM-DD");
      currentBookingDates.checkout = moment(result.end).format("YYYY-MM-DD");
      
      setBooking(prevState => ({
        ...prevState,
        bookingdates: currentBookingDates
      }));

      setNewEvent([
        {
          start: moment(result.start).toDate(),
          end: moment(result.end).toDate(),
          title: `${result.slots.length - 1} night(s) - £${(result.slots.length - 1) * roomPrice}`
        }
      ]);
    }
  };

  const submitForm = async () => {
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setErrors(data.errorMessages || ['An error occurred while submitting your booking']);
        return;
      }

      setComplete(true);
      setErrors([]);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrors(['An unexpected error occurred. Please try again later.']);
    }
  };

  const closeConfirmation = () => {
    setComplete(false);
    toggleBooking();
  };

  let renderErrors = null;
  if (errors.length > 0) {
    renderErrors = (
      <div className="alert alert-danger" style={{ marginTop: "5rem" }}>
        {errors.map((value, id) => (
          <p key={id}>{value}</p>
        ))}
      </div>
    );
  }

  const localizer = momentLocalizer(moment);

  if (completed) {
    return <BookingConfirmation booking={booking} closeConfirmation={closeConfirmation} />;
  } else {
    return (
      <div className="row hotel-room-info">
        <div className="col-sm-1"></div>
        <div className="col-sm-6">
          <Calendar
            localizer={localizer}
            onSelectSlot={handleSelect}
            defaultView="month"
            selectable
            popup={true}
            events={newEvent.concat(events)}
            style={{ height: "60vh" }}
            views={['month']}
          />
        </div>
        <div className="col-sm-4">
          <div className="input-group mb-3 room-booking-form">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1"><span className="fa fa-id-card"></span></span>
            </div>
            <input 
              type="text" 
              className="form-control room-firstname" 
              placeholder="Firstname" 
              aria-label="Firstname" 
              name="firstname" 
              aria-describedby="basic-addon1" 
              value={booking.firstname} 
              onChange={updateState} 
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1"><span className="fa fa-id-card"></span></span>
            </div>
            <input 
              type="text" 
              className="form-control room-lastname" 
              placeholder="Lastname" 
              aria-label="Lastname" 
              name="lastname" 
              aria-describedby="basic-addon1" 
              value={booking.lastname} 
              onChange={updateState} 
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1"><span className="fa fa-envelope"></span></span>
            </div>
            <input 
              type="text" 
              className="form-control room-email" 
              placeholder="Email" 
              aria-label="Email" 
              aria-describedby="basic-addon1" 
              name="email" 
              value={booking.email} 
              onChange={updateState} 
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1"><span className="fa fa-phone"></span></span>
            </div>
            <input 
              type="text" 
              className="form-control room-phone" 
              placeholder="Phone" 
              aria-label="Phone" 
              aria-describedby="basic-addon1" 
              name="phone" 
              value={booking.phone} 
              onChange={updateState} 
            />
          </div>
          <button 
            type='button' 
            className='btn btn-outline-danger float-right book-room' 
            onClick={toggleBooking}
          >
            Cancel
          </button>
          <button 
            type='button' 
            className='btn btn-outline-primary float-right book-room' 
            style={{ marginRight: '10px' }} 
            onClick={submitForm}
          >
            Book
          </button>
          {renderErrors}
        </div>
        <div className="col-sm-1"></div>
      </div>
    );
  }
};

export default RoomBookingForm; 