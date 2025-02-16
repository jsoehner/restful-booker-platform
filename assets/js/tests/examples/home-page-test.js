import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoomListings from '../../src/js/components/RoomListings.js';
import axios from 'axios';
import {
  findByText,
  render
} from '@testing-library/react'

// Mock axios
jest.mock('axios');

test('Rooms list component', async () => {
    axios.get.mockResolvedValueOnce({
        data: {
            "rooms": [
                {
                    "roomid": 1,
                    "roomName": "202",
                    "type": "Single",
                    "accessible": true,
                    "image": "string",
                    "description": "string",
                    "features": [
                        "string"
                    ],
                    "roomPrice": 0
                }
            ]
        }
    });

    const {asFragment, findByText} = render(
        <BrowserRouter>
            <RoomListings />
        </BrowserRouter>
    );

    await findByText("string")

    expect(asFragment()).toMatchSnapshot();
});

// Check suggestions...
//
// Check creation of components are consistent
// Check state changes in components that use isAuthorised
// Check BookingListings populates with BookingListing components