import React, { useState } from 'react';
import { Room } from '@/types/room';

interface HotelRoomInfoProps {
  roomDetails: Room;
}

const translateIcon = (feature: string) => {
  feature = feature.toLowerCase();
  switch (feature.toLowerCase()) {
    case 'refreshments':
      return 'cup-hot';
    case 'radio':
      return 'speaker';
    case 'views':
      return 'eye';
    default:
      return feature;
  }
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
          <div className="card-text">
            <div className="d-flex gap-3 mb-3 flex-wrap">
              {roomDetails.features.map((feature, index) => (
              <span key={index} className="badge bg-light text-dark">
                <i className={`bi bi-${translateIcon(feature)} me-1`}></i> {feature}
              </span>
              ))}
            </div>
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