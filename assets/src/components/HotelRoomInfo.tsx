import React, { useState } from 'react';
import Image from 'next/image';
import RoomBookingForm from './RoomBookingForm';

interface RoomDetails {
  roomid: number;
  roomName: string;
  type: string;
  accessible: boolean;
  image: string;
  description: string;
  features: string[];
  roomPrice: number;
}

interface HotelRoomInfoProps {
  roomDetails: RoomDetails;
}

const HotelRoomInfo: React.FC<HotelRoomInfoProps> = ({ roomDetails }) => {
  const [book, toggleBook] = useState(false);

  const toggleBooking = () => {
    toggleBook(!book);
  };

  let bookRoomView;
  let button;

  if (book) {
    bookRoomView = <RoomBookingForm roomid={roomDetails.roomid} roomPrice={roomDetails.roomPrice} toggleBooking={toggleBooking} />;
  } else {
    button = (
      <button 
        type='button' 
        className='btn btn-outline-primary float-right openBooking' 
        onClick={toggleBooking}
      >
        Book this room
      </button>
    );
  }

  return (
    <div>
      <div className="row hotel-room-info">
        <div className="col-sm-1"></div>
        <div className="col-sm-3">
          <img 
            className="img-responsive hotel-img" 
            src={roomDetails.image} 
            alt={`Preview image of room ${roomDetails.roomName}`} 
          />
        </div>
        <div className="col-sm-7">
          {roomDetails.accessible && <span className="fa fa-wheelchair wheelchair"></span>}
          <h3>{roomDetails.type}</h3>
          <p>{roomDetails.description}</p>
          <ul>
            {roomDetails.features.map((feature, index) => {
              return <li key={index}>{feature}</li>;
            })}
          </ul>
          {button}
        </div>
        <div className="col-sm-1"></div>
      </div>
      {bookRoomView}
    </div>
  );
};

export default HotelRoomInfo; 