import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import axios from 'axios';
import MovieDetail from '../MovieDetail';

jest.mock('axios');

describe('On click Detail', () => {
  it('Get data of the movie, return data', async () => {
    const mockMovieId = 1;
    const mockMovieData = {
      movie: {
        id: 1,
        title: 'Movie 1',
        description: 'Description 1',
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(mockMovieData));

    render(<MovieDetail movieId={mockMovieId} />);

    // Wait for the movie details to be loaded
    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
    expect(await screen.findByText('Description 1')).toBeInTheDocument();
  });
});
