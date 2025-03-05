import React from 'react';
import { Map, Marker } from 'pigeon-maps';

interface MapDetails {
  latitude: number;
  longitude: number;
}

interface HotelMapProps {
  name?: string;
  mapDetails?: MapDetails;
}

const getProvider = (x: number, y: number, z: number) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

const HotelMap: React.FC<HotelMapProps> = ({ name, mapDetails }) => {
  if (!mapDetails) {
    return <div className="hotel-map"></div>;
  }

  const marker = [
    <Marker 
      key={`marker_${name}`} 
      anchor={[mapDetails.latitude, mapDetails.longitude]} 
      payload={name} />
  ]


  return (
    <div className="map">
        <Map
          width={window.innerWidth}
          height={600}
          defaultCenter={[mapDetails.latitude, mapDetails.longitude]}
          defaultZoom={17}
          provider={getProvider}
          mouseEvents={false}
        >
        
        {marker}
        </Map>
    </div>
  );
};

export default HotelMap; 