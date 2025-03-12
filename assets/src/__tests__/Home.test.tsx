import React from 'react';
import Home from '../components/Home';
import { render, waitFor } from '@testing-library/react';

const homeState = {
  rooms: [{
    roomid: 1,
    roomName: "101",
    type: 'Standard Room',
    accessible: false,
    image: 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
    description: 'Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.',
    features: [
      'Internet/Wi-fi',
      'Jacuzzi Bathroom',
      'Air conditioning',
      'High Definition TV',
      'Mini-bar'
    ],
    roomPrice: 100
  },{
    roomid: 2,
    roomName: "102",
    type: 'Single',
    accessible: true,
    image: 'https://www.mwtestconsultancy.co.uk/img/room2.jpg',
    description: 'Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.',
    features: [
      'Internet/Wi-fi',
      'Air conditioning',
      'Mini-bar'
    ],
    roomPrice: 80
  }]
};

const brandingState = {
  name: 'A new name',
  map: {
    latitude: 88.123,
    longitude: 11.123
  },
  logoUrl: 'https://www.mwtestconsultancy.co.uk/url/update.png',
  description: 'Updated description',
  contact: {
    name: 'Another B&B',
    address: 'Somewhere else',
    phone: '99999999999',
    email: 'another@fakeemail.com'
  }
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Home page renders', async () => {
    // Mock the API calls
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(homeState)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(brandingState)
      }));

    const { getByText, asFragment } = render(
      <Home />
    );

    await waitFor(() => expect(getByText(/Updated description/)).toBeInTheDocument());
    expect(asFragment()).toMatchSnapshot();
  });
});
