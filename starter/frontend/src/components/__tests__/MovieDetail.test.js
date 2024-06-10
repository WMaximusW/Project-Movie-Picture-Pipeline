import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import axios from 'axios';
import MovieDetail from './MovieDetail';

// Mock axios.get to return a promise with mocked data
jest.mock('axios');

describe('On click Detail', () => {
  it('Get data of the movie, return data', async () => {
    const mockMovieId = 1;
    const mockMovieData = {
      movie: {
        id: mockMovieId,
        title: 'Movie 1',
        description: 'Description 1',
      },
    };

    axios.get.mockResolvedValue({ data: mockMovieData });

    render(<MovieDetail movieId={mockMovieId} />);

    // Wait for the movie details to be loaded
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
    });
  });

  it('Data is empty', async () => {
    const mockMovieId = 1;

    axios.get.mockResolvedValue({ data: null });

    render(<MovieDetail movieId={mockMovieId} />);

    // Wait for the movie details to be loaded
    await waitFor(() => {
      expect(screen.getByText('Data not found')).toBeInTheDocument();
    });
  });
});
