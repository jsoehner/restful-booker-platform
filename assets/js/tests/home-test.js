import React from 'react';
import Home from '../src/js/components/Home.js';
import axios from 'axios';
import '@testing-library/jest-dom'
import {
    render,
    waitFor
  } from '@testing-library/react'

// Mock axios
jest.mock('axios');

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
        ]
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
        ]
    }]
}

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
}

beforeEach(() => {
    jest.clearAllMocks();
});

test('Home page renders', async () => {
    // Mock the room API call
    axios.get.mockImplementation((url) => {
        if (url === 'http://localhost/room/') {
            return Promise.resolve({
                data: homeState
            });
        } else if (url === 'http://localhost/branding/') {
            return Promise.resolve({
                data: brandingState
            });
        }
    });

    const {getByText, asFragment} = render(
        <Home />
    )

    await waitFor(() => expect(getByText(/Updated description/)).toBeInTheDocument());
    expect(asFragment()).toMatchSnapshot();
});
