import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import axios from 'axios';
import MovieDetail from '../MovieDetail';

const mockMovieData = {
  movie: {
    id: 1,
    title: 'Movie 1',
    description: 'Description 1',
  },
};

jest.mock('axios', () => {
  const expectedResponse = JSON.stringify(mockMovieData);
  return () => new Promise((resolve) => resolve(expectedResponse));
});

describe('On click Detail', () => {
  it('Get data of the movie, return data', async () => {
    const mockMovieId = 1;

    render(<MovieDetail movieId={mockMovieId} />);

    axios.get.mockResolvedValueOnce({ data: mockMovieData });

    // Wait for the movie details to be loaded
    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
    expect(await screen.findByText('Description 1')).toBeInTheDocument();
  });
});
