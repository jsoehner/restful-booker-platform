import React from 'react';
import HotelContact from '../src/js/components/HotelContact.js';
import axios from 'axios';
import '@testing-library/jest-dom'
import {
    render,
    fireEvent,
    waitFor,
    act
} from '@testing-library/react'

// Mock axios
jest.mock('axios');

const message = {
    name: 'Mark',
    email: 'email@test.com',
    phone: '018392391183',
    subject: 'I want to book a room',
    description: 'And I want a bottle of wine with the booking',
}

const contactDetails = {
    name: 'Another B&B',
    address: 'Somewhere else',
    phone: '99999999999',
    email: 'another@fakeemail.com'
}

test('Contact form sends request to message API', async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });

    const {getByPlaceholderText, getByText, getByTestId} = render(
        <HotelContact contactDetails={contactDetails} />
    )
 
    await waitFor(() => getByPlaceholderText(/Name/));
    
    await act(async () => {
        fireEvent.change(getByTestId(/ContactName/), { target: { value: message.name } });
        fireEvent.change(getByTestId(/ContactEmail/), { target: { value: message.email } });
        fireEvent.change(getByTestId(/ContactPhone/), { target: { value: message.phone } });
        fireEvent.change(getByTestId(/ContactSubject/), { target: { value: message.subject } });
        fireEvent.change(getByTestId(/ContactDescription/), { target: { value: message.description } });
    });

    await act(async () => {
        fireEvent.click(getByText("Submit"));
    });

    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost/message/',
            JSON.stringify(message),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        );
    });
});
