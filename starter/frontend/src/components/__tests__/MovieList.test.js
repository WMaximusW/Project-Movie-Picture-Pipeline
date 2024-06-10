import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
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
    axios.get.mockResolvedValueOnce({ data: { movies: movies } });

    render(<MovieList onMovieClick={jest.fn()} />);

    // Wait for the movies to be loaded
    expect(screen.getByText('Movie 1 - Description 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2 - Description 2')).toBeInTheDocument();
  });

  it('Call Api and return null', async () => {
    axios.get.mockResolvedValueOnce({ data: { movies: null } });

    // Wait for the movies to be loaded
    expect(screen.getByText('Empty List')).toBeInTheDocument();
  });

  it('Call Api and return empty array', async () => {
    axios.get.mockResolvedValueOnce({ data: { movies: null } });

    // Wait for the movies to be loaded
    expect(screen.queryByText('Movie 1 - Description 1')).toBeNull();
    expect(screen.queryByText('Movie 2 - Description 2')).toBeNull();
  });

  it('On Event onMovieClick when a movie is clicked, return data', async () => {
    axios.get.mockResolvedValueOnce({ data: { movies: movies } });
    const mockOnMovieClick = jest.fn();
    render(<MovieList onMovieClick={mockOnMovieClick} />);

    // Wait for the movies to be loaded
    fireEvent.click(screen.getByText('Movie 1 - Description 1'));

    // Check if onMovieClick is called with correct argument
    expect(mockOnMovieClick).toHaveBeenCalledWith(1);
  });

  it('On Event onMovieClick when a movie is clicked, return null', async () => {
    axios.get.mockResolvedValueOnce({ data: { movies: null } });
    const mockOnMovieClick = jest.fn();
    render(<MovieList onMovieClick={mockOnMovieClick} />);

    // Wait for the movies to be loaded
    fireEvent.click(screen.getByText('Empty List'));

    // Check if onMovieClick is called with correct argument
    expect(mockOnMovieClick).not.toHaveBeenCalled();
  });
});
