import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

interface BookingListingProps {
  booking: {
    bookingid: number;
    roomid: number;
    firstname: string;
    lastname: string;
    depositpaid: boolean;
    bookingdates: {
      checkin: string;
      checkout: string;
    };
  };
  getBookings: () => void;
  roomPrice?: string;
}

interface EditBooking {
  bookingid?: number;
  roomid?: number;
  firstname?: string;
  lastname?: string;
  depositpaid?: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
}

const BookingListing: React.FC<BookingListingProps> = ({ booking, getBookings, roomPrice }) => {
  const [allowEdit, toggleEdit] = useState(false);
  const [editBooking, setEditBooking] = useState<EditBooking>({
    bookingdates: { checkin: '', checkout: '' }
  });

  useEffect(() => {
    setEditBooking(booking);
  }, [booking]);

  const doDelete = async () => {
    try {
      const response = await fetch(`/api/admin/booking/${editBooking.bookingid}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        getBookings();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const doEdit = async () => {
    try {
      const response = await fetch(`/api/admin/booking/${editBooking.bookingid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editBooking)
      });
      
      if (response.ok) {
        toggleEdit(false);
        getBookings();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleDateChange = (date: Date | null, target: 'checkin' | 'checkout') => {
    if (date) {
      setEditBooking(prevState => ({
        ...prevState,
        bookingdates: {
          ...prevState.bookingdates,
          [target]: moment(date.toUTCString()).format("YYYY-MM-DD")
        }
      }));
    }
  };

  const updateState = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEditBooking(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calculatedPrice = roomPrice && booking.bookingdates
    ? parseFloat(roomPrice) * Math.round(Math.abs(
        (new Date(booking.bookingdates.checkin).getTime() - 
         new Date(booking.bookingdates.checkout).getTime()) / (24 * 60 * 60 * 1000)
      ))
    : 0;

  if (allowEdit) {
    return (
      <div className={`detail booking-${booking.roomid}`}>
        <div className="row">
          <div className="col-sm-2">
            <input 
              type="text" 
              className="form-control" 
              name="firstname" 
              defaultValue={booking.firstname} 
              onChange={updateState} 
            />
          </div>
          <div className="col-sm-2">
            <input 
              type="text" 
              className="form-control" 
              name="lastname" 
              defaultValue={booking.lastname} 
              onChange={updateState} 
            />
          </div>
          <div className="col-sm-1">
            <p>{roomPrice}</p>
          </div>
          <div className="col-sm-2">
            <select 
              className="form-control" 
              defaultValue={booking.depositpaid.toString()} 
              name="depositpaid" 
              onChange={updateState}
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>
          <div className="col-sm-2">
            <DatePicker 
              className="form-control" 
              selected={moment(booking.bookingdates.checkin).utc(true).toDate()} 
              onChange={(date) => handleDateChange(date, 'checkin')} 
              dateFormat="yyyy-MM-dd" 
            />
          </div>
          <div className="col-sm-2">
            <DatePicker 
              className="form-control" 
              selected={moment(booking.bookingdates.checkout).utc(true).toDate()} 
              onChange={(date) => handleDateChange(date, 'checkout')} 
              dateFormat="yyyy-MM-dd" 
            />
          </div>
          <div className="col-sm-1">
            <span 
              className="fa fa-check confirmBookingEdit" 
              onClick={doEdit} 
              style={{paddingRight: "10px"}}
            ></span>
            <span 
              className="fa fa-remove exitBookingEdit" 
              onClick={() => toggleEdit(false)}
            ></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`detail booking-${booking.roomid}`}>
      <div className="row">
        <div className="col-sm-2">
          <p>{booking.firstname}</p>
        </div>
        <div className="col-sm-2">
          <p>{booking.lastname}</p>
        </div>
        <div className="col-sm-1">
          <p>{calculatedPrice}</p>
        </div>
        <div className="col-sm-2">
          <p>{String(booking.depositpaid)}</p>
        </div>
        <div className="col-sm-2">
          <p>{booking.bookingdates.checkin.split('T')[0]}</p>
        </div>
        <div className="col-sm-2">
          <p>{booking.bookingdates.checkout.split('T')[0]}</p>
        </div>
        <div className="col-sm-1">
          <span 
            className="fa fa-pencil bookingEdit" 
            onClick={() => toggleEdit(true)} 
            style={{paddingRight: "10px"}}
          ></span>
          <span 
            className="fa fa-trash bookingDelete" 
            onClick={doDelete}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default BookingListing; 