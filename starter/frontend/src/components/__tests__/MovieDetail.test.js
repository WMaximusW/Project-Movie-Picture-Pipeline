import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import axios from 'axios';
import MovieDetail from '../MovieDetail';

jest.mock('axios');

describe('On click Detail', () => {
  it('Get data of the movie, return data', async () => {
    const mockMovieData = {
      data: {
        movie: {
          id: 1,
          title: 'Movie 1',
          description: 'Description 1',
        },
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockMovieData));

    render(<MovieDetail movie={mockMovieData.data.movie} />);

    // Wait for the movie details to be loaded
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
    });
  });
});
