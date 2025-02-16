import React from 'react';
import Report from '../src/js/components/Report.js';
import axios from 'axios';
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { render, waitFor } from '@testing-library/react'

// Mock axios
jest.mock('axios');

test('Multiple reports can be created in the Report component', async () => {
    // Setup mock response
    axios.get.mockResolvedValueOnce({
        data: {
            report: [
                {
                    start: "2019-04-01",
                    end: "2019-04-03",
                    title: "101"
                },
                {
                    start: "2019-04-02",
                    end: "2019-04-04",
                    title: "102"
                },
                {
                    start: "2019-04-02",
                    end: "2019-04-04",
                    title: "103"
                }
            ]
        }
    });

    const { asFragment } = render(
        <Report defaultDate={new Date("2019-04-02")} />
    );

    // Wait for axios mock to be called
    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost/report/');
    });

    const items = await screen.findAllByText(/103/);
    expect(items).toHaveLength(1);
});
