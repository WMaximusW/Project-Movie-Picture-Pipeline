import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import axios from 'axios';
import MovieList from '../MovieList';

// Mock axios.get to return a promise with mocked data
jest.mock('axios');

describe('Initial', () => {
  it('Call Api and return data', async () => {
    const mockMovieData = {
      data: {
        movies: [
          { id: 1, title: 'Movie 1', description: 'Description 1' },
          { id: 2, title: 'Movie 2', description: 'Description 2' },
        ],
      },
    };

    // Mock the axios response
    axios.get.mockImplementation(() => Promise.resolve(mockMovieData));

    await act(async () => {
      render(<MovieList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });
});
