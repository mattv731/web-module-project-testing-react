import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';
import Episodes from '../Episodes';

const showTest = {
    name: 'Hello everyone',
    summary: 'this is a test',
    seasons: [
    {
        id: 0,
        name: 'season 1',
        episodes: ['test1',]
    },
    {
        id: 1,
        name: 'season 2',
        episodes: []
    },
    {
        id: 2,
        name: 'season 3',
        episodes: []
    },
    {
        id: 3,
        name: 'season 4',
        episode: []
    }, 
    {
        id: 4,
        name: 'season 5',
        episodes: []
    },
    ]
}


test('renders without errors', ()=>{
    render(<Show show={showTest} selectedSeason={"none"}/>)
});



test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />)

    const loading = screen.queryByText(/Fetching data.../i)

    expect(loading).toBeInTheDocument();


});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={showTest} selectedSeason={"none"}/>);

    const show = screen.queryAllByTestId('season-option');

    expect(show).toHaveLength(5)
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={showTest} selectedSeason={'none'} handleSelect={handleSelect} />)
    const select = screen.getByLabelText(/select a season/i)
    userEvent.selectOptions(select, ['1']);

    expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={showTest} selectedSeason={'none'} />)

    let season = screen.queryByTestId("episodes-container");

    expect(season).not.toBeInTheDocument();

    rerender(<Show show={showTest} selectedSeason={1} />)

    season = screen.queryByTestId("episodes-container");

    expect(season).toBeInTheDocument();
    

});
