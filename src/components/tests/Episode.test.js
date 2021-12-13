import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id: '', 
    image: '', 
    name: '', 
    season: '',
    number: '',
    summary: 'This is a very cool episode!', 
    runtime: ''
}

const testEpisode2 = {
    id: '', 
    image: null, 
    name: '', 
    season: '',
    number: '',
    summary: 'This is a very cool episode!', 
    runtime: ''
}

test("renders without error", () => {
    render(<Episode episode={testEpisode} />)
});

test("renders the summary test passed as prop", ()=>{
    //Arrange
    render(<Episode episode={testEpisode} />)

    //Act
    const message = screen.queryByText(/this is a very cool episode!/i)

    //Assert
    expect(message).toBeInTheDocument();
    expect(message).toBeTruthy();
    expect(message).not.toBeFalsy();

});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisode2} /> )

    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');

    expect(image).toBeInTheDocument();
});
