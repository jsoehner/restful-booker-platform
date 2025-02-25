'use client';

import React, { useState, useEffect } from 'react';
import HotelRoomInfo from '@/components/HotelRoomInfo';
import HotelMap from '@/components/HotelMap';
import HotelLogo from '@/components/HotelLogo';
import HotelContact from '@/components/HotelContact';
import Footer from '@/components/Footer';
import { fetchBranding, fetchRooms, BrandingResponse, Room } from '@/libs/Api';

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [branding, setBranding] = useState<BrandingResponse>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [brandingData, roomsData] = await Promise.all([
          fetchBranding(),
          fetchRooms()
        ]);
        
        setBranding(brandingData);
        setRooms(roomsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className='col-sm-12 text-center'>
              <HotelLogo logoDetails={branding.logoUrl} />
            </div>
          </div>
          <div className="row hotel-description">
            <div className='col-sm-1'></div>
            <div className='col-sm-10'>
              <p>{branding.description}</p>
            </div>
            <div className='col-sm-1'></div>
          </div>
          <div className="row room-header">
            <div className='col-sm-1'></div>
            <div className='col-sm-10'>
              <h2>Rooms</h2>
            </div>
            <div className='col-sm-1'></div>
          </div>
          {rooms.map((roomDetails) => {
            return <div key={roomDetails.roomid}><HotelRoomInfo roomDetails={roomDetails} /></div>
          })}
          <HotelContact contactDetails={branding.contact} />
          <div className="row">
            <div className='col-sm-12'>
              <HotelMap name={branding.name} mapDetails={branding.map} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
