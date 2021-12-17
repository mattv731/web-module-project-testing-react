import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

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


test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async ()=>{
    mockFetchShow.mockResolvedValueOnce(showTest)
    render(<Display />);

    const button = screen.queryByRole('button');

    userEvent.click(button);

    const testId = await screen.findByTestId('show-container')

    expect(testId).toBeInTheDocument();
 

});

test('Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.', async ()=>{
    mockFetchShow.mockResolvedValueOnce(showTest)
    render(<Display />);

    const button = screen.queryByRole('button');
    userEvent.click(button);

    await waitFor(()=> {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(5)
    })
});


test('renders show season options matching your data when the button is clicked', async ()=>{
    const displayFunc = jest.fn();
    mockFetchShow.mockResolvedValueOnce(showTest)
    render(<Display displayFunc={displayFunc}/>);

    const button = screen.queryByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toBeCalled();
    })
});
