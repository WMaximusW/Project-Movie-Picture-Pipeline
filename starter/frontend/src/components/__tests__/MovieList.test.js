import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import axios from 'axios';
import MovieList from '../MovieList';

// Mock axios.get to return a promise with mocked data
jest.mock('axios');

const movies = [
  { id: 1, title: 'Movie 1', description: 'Description 1' },
  { id: 2, title: 'Movie 2', description: 'Description 2' },
];

describe('Initial', () => {
  it('Call Api and return data', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: { movies: movies } }));

    render(<MovieList onMovieClick={jest.fn()} />);
    
    // Wait for the movie details to be loaded
    expect(await screen.getByText('Movie 1 - Description 1')).toBeInTheDocument();
    expect(await screen.getByText('Movie 2 - Description 2')).toBeInTheDocument();
  });

  it('Call Api and return null', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: { movies: null } }));

    render(<MovieList onMovieClick={jest.fn()} />);

    // Wait for the movies to be loaded
    expect(await screen.getByText('Empty List')).toBeInTheDocument();
  });

  it('On Event onMovieClick when a movie is clicked, return data', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: { movies: movies } }));

    const mockOnMovieClick = jest.fn();

    render(<MovieList onMovieClick={mockOnMovieClick} />);

    // Wait for the movies to be loaded
    fireEvent.click(await screen.getByText('Movie 1 - Description 1'));

    // Check if onMovieClick is called with correct argument
    expect(mockOnMovieClick).toHaveBeenCalledWith(1);
  });
});
