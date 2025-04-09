import React, { useState } from 'react';
import { Room } from '@/types/room';

interface HotelRoomInfoProps {
  roomDetails: Room;
}

const HotelRoomInfo: React.FC<HotelRoomInfoProps> = ({ roomDetails }) => {
  return (
    <div className="card h-100 shadow-sm room-card">
        <div className="room-image">
          <img src={roomDetails.image} className="card-img-top" alt="Single Room" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{roomDetails.type}</h5>
          <p className="card-text">{roomDetails.description}</p>
          <div className="d-flex gap-3 mb-3">
              <span className="badge bg-light text-dark"><i className="bi bi-tv me-1"></i> TV</span>
              <span className="badge bg-light text-dark"><i className="bi bi-wifi me-1"></i> WiFi</span>
              <span className="badge bg-light text-dark"><i className="bi bi-safe me-1"></i> Safe</span>
          </div>
        </div>
        <div className="card-footer bg-white d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-5">£{roomDetails.roomPrice} <small className="text-muted fw-normal">per night</small></div>
          <button className="btn btn-primary">Book Now</button>
        </div>
    </div>
  );
};

export default HotelRoomInfo; 