import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const showTest = {
    name: 'Hello everyone',
    summary: 'this is a test',
    seasons: [
    {
        id: 0,
        name: 'season 1',
        episode: []
    },
    {
        id: 1,
        name: 'season 2',
        episode: []
    },
    {
        id: 2,
        name: 'season 3',
        episode: []
    },
    {
        id: 3,
        name: 'season 4',
        episode: []
    }, 
    {
        id: 4,
        name: 'season 5',
        episode: []
    },
    ]
}


test('renders without errors', ()=>{
    render(<Show shows={showTest} selectedSeason={"none"}/>)
});



test('renders Loading component when prop show is null', () => {
    render(<Show shows={null} />)

    const loading = screen.queryByText(/Fetching data.../i)

    expect(loading).toBeInTheDocument();


});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show shows={showTest} selectedSeason={"none"}/>);

    const missions = screen.queryAllByTestId('season-option');

    expect(missions).toHaveLength(5)
});

test('handleSelect is called when an season is selected', () => {
    render(<Show shows={showTest} selectedSeason={'none'} />)

    const selected = screen.queryByRole
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {});
