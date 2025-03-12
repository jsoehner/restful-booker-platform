import React from 'react';
import Image from 'next/image';

interface HotelLogoProps {
  logoDetails?: string;
}

const HotelLogo: React.FC<HotelLogoProps> = ({ logoDetails }) => {
  if (!logoDetails) {
    return <div className="hotel-logoUrl"></div>;
  }

  return (
    <div>
      <img src={logoDetails} className='hotel-logoUrl' alt='Hotel logoUrl' />
    </div>
  );
};

export default HotelLogo;