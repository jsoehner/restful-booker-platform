import React from 'react';
import HotelContact from '../components/HotelContact';
import { render, fireEvent, waitFor, act } from '@testing-library/react';

const message = {
  name: 'Mark',
  email: 'email@test.com',
  phone: '018392391183',
  subject: 'I want to book a room',
  description: 'And I want a bottle of wine with the booking',
};

const contactDetails = {
  name: 'Another B&B',
  address: 'Somewhere else',
  phone: '99999999999',
  email: 'another@fakeemail.com'
};

describe('HotelContact Component', () => {
  test('Contact form sends request to message API', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        status: 201
      }));

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <HotelContact contactDetails={contactDetails} />
    );
  
    await waitFor(() => getByTestId(/ContactName/));
    
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
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/message',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
        }
      );
    });
  });
});
