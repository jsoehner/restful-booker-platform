import React from 'react';
import ReactModal from 'react-modal';
interface BookingConfirmationProps {
  booking: {
    firstname: string;
    lastname: string;
    email: string;
    bookingdates: {
      checkin: string;
      checkout: string;
    };
  };
  closeConfirmation: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, closeConfirmation }) => {
  return (
    <ReactModal 
        isOpen={true}
        contentLabel="onRequestClose Example"
        className="confirmation-modal"
        >
        
        <div className="form-row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 text-center">
                <br />
                <h3>Booking Successful!</h3>
                <p>Congratulations! Your booking has been confirmed for:</p>
                <p>{booking.bookingdates.checkin} - {booking.bookingdates.checkout}</p>
            </div>
            <div className="col-sm-3"></div>
        </div>
        <div className="form-row">
            <div className="col-sm-12 text-center">
                <button className="btn btn-outline-primary" onClick={() => closeConfirmation()}>Close</button>
            </div>
        </div>
    </ReactModal>
  );
};

export default BookingConfirmation; 