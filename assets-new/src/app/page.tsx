'use client';

import React, { useState, useEffect } from 'react';
import HotelRoomInfo from '@/components/HotelRoomInfo';
import HotelMap from '@/components/HotelMap';
import HotelLogo from '@/components/HotelLogo';
import HotelContact from '@/components/HotelContact';
import Footer from '@/components/Footer';

interface Room {
  roomid: number;
  roomName: string;
  type: string;
  accessible: boolean;
  image: string;
  description: string;
  features: string[];
  roomPrice: number;
}

interface BrandingResponse {
  name: string;
  map: {
    latitude: number;
    longitude: number;
  };
  logoUrl: string;
  description: string;
  contact: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [branding, setBranding] = useState<BrandingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Fetch branding data
        const brandingResponse = await fetch('/api/branding');
        if (!brandingResponse.ok) {
          throw new Error('Failed to fetch branding data');
        }
        const brandingData = await brandingResponse.json();

        // Fetch rooms data
        const roomsResponse = await fetch('/api/room');
        if (!roomsResponse.ok) {
          throw new Error('Failed to fetch rooms data');
        }
        const roomsData = await roomsResponse.json();
        
        setBranding(brandingData);
        setRooms(roomsData.rooms || []);
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
