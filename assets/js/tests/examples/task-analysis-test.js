import React from 'react';
import LoginComponent from '../../src/js/components/Login.js';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// We first declare our test by using Jests test function and provide it
// with a name and then an anonymous function which will run our test
test('Login component is created', () => {
    // Next we create our component that we want to check. By using
    // React Testing Libraries' render function and passing it the React
    // component we want to create, RTL will create a headless DOM and 
    // render the React component inside.
    const { asFragment } = render(<LoginComponent />);

    // We then compare what the component has done to a previously saved
    // state that lives in the __snapshots__ folder. If anything has changed
    // it will raise an alert.
    expect(asFragment()).toMatchSnapshot();
});

// We first declare our test by using Jests test function and provide it
// with a name and then an anonymous function which will run our test
test('Login component sends correct payload', async () => {
    // Mock the axios POST response
    axios.post.mockResolvedValueOnce({
        status: 200,
        data: { token: '123ABC' }
    });

    // Next we create our component that we want to check. By using
    // React Testing Libraries' render function and passing it the React
    // component we want to create, RTL will create a headless DOM and render
    // the React component inside.
    const {getByTestId} = render(
        <LoginComponent setAuthenticate={()=>{}} />
    );

    // We next fill in the LoginComponent form fields and submit it
    fireEvent.change(getByTestId('username'), { target: { value: 'admin' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'password' } });
    fireEvent.click(getByTestId('submit'));

    // Finally, we check if axios was called with the correct payload
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
        'http://localhost/auth/login',
        JSON.stringify({
            "username": "admin",
            "password": "password"
        }),
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    ));
});
