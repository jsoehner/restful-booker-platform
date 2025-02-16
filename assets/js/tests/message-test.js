import React from 'react';
import Message from '../src/js/components/Message';
import axios from 'axios';
import '@testing-library/jest-dom'
import {
    render,
    waitFor,
    screen,
    act
} from '@testing-library/react'

// Mock axios
jest.mock('axios');

const messageData = {
    name: "Mark Winteringham",
    email: "mark@mwtestconsultancy.co.uk",
    phone: "01821 912812",
    subject: "Subject description here",
    description: "Lorem ipsum dolores est"
};

beforeEach(() => {
    // Mock the GET request
    axios.get.mockResolvedValueOnce({
        data: messageData
    });

    // Mock the PUT request for marking as read
    axios.put.mockResolvedValueOnce({
        status: 200
    });
});

test('Message popup is populated with details', async () => {
    await act(async () => {
        render(<Message messageId={1} />);
    });

    await waitFor(() => {
        const modalComponent = screen.getByTestId(/message/);
        expect(modalComponent).toMatchSnapshot();
    });
});