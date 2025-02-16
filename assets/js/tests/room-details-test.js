import React from 'react';
import RoomDetails from '../src/js/components/RoomDetails.js';
import { Routes, Route, Router } from 'react-router-dom';
import {createMemoryHistory} from 'history'
import axios from 'axios';
import {
    render, waitFor, fireEvent
} from '@testing-library/react'

// Mock axios
jest.mock('axios');

const roomObject = {
    roomid: 1,
    roomName: "101",
    type: "Single",
    accessible: true,
    image: "https://www.mwtestconsultancy.co.uk/img/testim/room2.jpg",
    description: "Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.",
    features: [
        "TV, WiFi, Safe"
    ],
    roomPrice: 100
}

const history = createMemoryHistory()
history.push('/admin/room/1')

beforeEach(() => {
    jest.clearAllMocks();
    // Mock the bookings endpoint by default
    axios.get.mockImplementation((url) => {
        if (url.includes('/booking/')) {
            return Promise.resolve({
                data: {
                    bookings: []
                }
            });
        }
        return Promise.resolve({
            data: roomObject
        });
    });
});

test('Room details component renders', async () => {
    const {asFragment, getByText} = render(
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route path="/admin/room/:id" element={<RoomDetails />} />
            </Routes>
        </Router>
    )

    await waitFor(() => expect(getByText(/101/)).toBeInTheDocument());
    
    expect(asFragment()).toMatchSnapshot();
});

test('Room details switches into edit mode', async () => {
    const {asFragment, getByText} = render(
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route path="/admin/room/:id" element={<RoomDetails />} />
            </Routes>
        </Router>
    )

    await waitFor(() => expect(getByText(/101/)).toBeInTheDocument());
    
    fireEvent.click(getByText(/Edit/));

    await waitFor(() => expect(getByText(/Update/)).toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
});

test('Room details can be switched out of edit mode', async () => {
    const {asFragment, getByText} = render(
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route path="/admin/room/:id" element={<RoomDetails />} />
            </Routes>
        </Router>
    )

    await waitFor(() => expect(getByText(/101/)).toBeInTheDocument());
    
    fireEvent.click(getByText(/Edit/));
    fireEvent.click(getByText(/Cancel/));

    expect(asFragment()).toMatchSnapshot();
});

test('Room details can render validation errors', async () => {
    axios.put.mockRejectedValueOnce({
        response: {
            status: 400,
            data: {
                errorCode: 400,
                error: "BAD_REQUEST",
                errorMessage: "Validation failed for argument [0] in public org.springframework.http.ResponseEntity<com.automationintesting.model.db.Room> com.automationintesting.api.RoomController.updateRoom(com.automationintesting.model.db.Room,int,java.lang.String) throws java.sql.SQLException: [Field error in object 'room' on field 'type': rejected value [single]; codes [Pattern.room.type,Pattern.type,Pattern.java.lang.String,Pattern]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [room.type,type]; arguments []; default message [type],[Ljavax.validation.constraints.Pattern$Flag;@21a98ac5,Single|Double|Twin|Family|Suite]; default message [Type can only contain the room options Single, Double, Twin, Family or Suite]] ",
                fieldErrors: ["Type can only contain the room options Single, Double, Twin, Family or Suite"]
            }
        }
    });

    const {asFragment, getByText} = render(
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route path="/admin/room/:id" element={<RoomDetails />} />
            </Routes>
        </Router>
    )

    await waitFor(() => expect(getByText(/101/)).toBeInTheDocument());

    fireEvent.click(getByText(/Edit/));
    fireEvent.click(getByText(/Update/));

    await waitFor(() => expect(getByText(/Type can only contain the room options/)).toBeInTheDocument());
    
    expect(asFragment()).toMatchSnapshot();
});

test('Room details can be submitted', async () => {
    axios.put.mockResolvedValueOnce({ status: 202 });

    const {getByText} = render(
        <Router location={history.location} navigator={history}>
            <Routes>
                <Route path="/admin/room/:id" element={<RoomDetails />} />
            </Routes>
        </Router>
    )

    await waitFor(() => expect(getByText(/101/)).toBeInTheDocument());

    fireEvent.click(getByText(/Edit/));
    fireEvent.click(getByText(/Update/));

    await waitFor(() => expect(axios.put).toHaveBeenCalledWith(
        'http://localhost/room/1',
        JSON.stringify({
            "roomid": 1,
            "roomName": "101",
            "type": "Single",
            "accessible": true,
            "image": "https://www.mwtestconsultancy.co.uk/img/testim/room2.jpg",
            "description": "Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.",
            "features": ["TV, WiFi, Safe"],
            "roomPrice": 100,
            "featuresObject": {
                "WiFi": false,
                "TV": false,
                "Radio": false,
                "Refreshments": false,
                "Safe": false,
                "Views": false,
                "TV, WiFi, Safe": true
            }
        }),
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
    ));
});
