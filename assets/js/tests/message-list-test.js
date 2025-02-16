import React from 'react';
import MessageList from '../src/js/components/MessageList.js';
import axios from 'axios';
import '@testing-library/jest-dom'
import {
    render,
    waitFor,
    asFragment,
    fireEvent
  } from '@testing-library/react'

// Mock axios
jest.mock('axios');

beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValueOnce({
        data: {
            messages: [
                {
                    "id": 1,
                    "name": "Mark Winteringham",
                    "subject": "Subject description here",
                    "read": true
                }, {
                    "id": 2,
                    "name": "James Dean",
                    "subject": "Another description here",
                    "read": false
                }, {
                    "id": 3,
                    "name": "Janet Samson",
                    "subject": "Lorem ipsum dolores est",
                    "read": true
                }
            ]
        }
    });
});

test('Renders the list of messages correctly', async () => {
    const {asFragment, getByTestId} = render(<MessageList setCount={() => {}} />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getByTestId(/messageDescription0/)).toBeInTheDocument());
    await waitFor(() => expect(asFragment()).toMatchSnapshot());
});

test('Deletes message when selected to delete', async () => {
    axios.delete.mockResolvedValueOnce({ status: 202 });
    axios.get.mockResolvedValueOnce({
        data: {
            messages: [
                {
                    "id": 2,
                    "name": "James Dean",
                    "subject": "Another description here",
                    "read": false
                }, {
                    "id": 3,
                    "name": "Janet Samson",
                    "subject": "Lorem ipsum dolores est",
                    "read": true
                }
            ]
        }
    });
    
    const {getByTestId} = render(<MessageList setCount={() => {}} />);
    
    await waitFor(() => fireEvent.click(getByTestId(/DeleteMessage0/)))

    await waitFor(() => {
        expect(axios.delete).toHaveBeenCalledWith('http://localhost/message/1', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    });
});

test('Clicking message shows message popup', async () => {
    axios.put.mockResolvedValueOnce({ status: 202 });
    axios.get.mockResolvedValueOnce({
        data: {
            name: "Mark Winteringham",
            email: "mark@email.com",
            phone: "01234556789",
            subject: "Subject here",
            description: "Lorem ipsum"
        }
    });

    const {asFragment, getByTestId} = render(<MessageList setCount={() => {}} />);

    await waitFor(() => { fireEvent.click(getByTestId(/message0/))});

    expect(asFragment()).toMatchSnapshot();
});
