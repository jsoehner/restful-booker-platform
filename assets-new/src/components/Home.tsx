import React, { useState, useEffect } from 'react';
import HotelRoomInfo from './HotelRoomInfo';
import HotelMap from './HotelMap';
import HotelLogo from './HotelLogo';
import HotelContact from './HotelContact';

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

interface MapDetails {
  latitude: number;
  longitude: number;
}

interface ContactDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface BrandingDetails {
  name: string;
  map: MapDetails;
  logoUrl: string;
  description: string;
  contact: ContactDetails;
}

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<RoomDetails[]>([]);
  const [branding, setBranding] = useState<BrandingDetails>({} as BrandingDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsResponse, brandingResponse] = await Promise.all([
          fetch('/api/room'),
          fetch('/api/branding')
        ]);

        if (roomsResponse.ok && brandingResponse.ok) {
          const roomsData = await roomsResponse.json();
          const brandingData = await brandingResponse.json();
          setRooms(roomsData.rooms || []);
          setBranding(brandingData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
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
  );
};

export default Home;
