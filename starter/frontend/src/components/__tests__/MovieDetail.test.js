import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import axios from 'axios';
import MovieDetail from '../MovieDetail';

// Mock axios.get to return a promise with mocked data


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

    jest.mock("axios", () => {
      const expectedResponse = JSON.stringify(mockMovieData);
      return () => new Promise((resolve) => resolve(expectedResponse));
    })

    axios.get.mockResolvedValueOnce({ data: mockMovieData });

    render(<MovieDetail movieId={mockMovieId} />);

    // Wait for the movie details to be loaded
    expect(await screen.findByText('Movie 1')).toBeInTheDocument();
    expect(await screen.findByText('Description 1')).toBeInTheDocument();
  });

  it('Data is empty', async () => {
    const mockMovieId = 1;

    jest.mock("axios", () => {
      const expectedResponse = JSON.stringify(null);
      return () => new Promise((resolve) => resolve(expectedResponse));
    })
    axios.get.mockResolvedValueOnce({ data: null });

    render(<MovieDetail movieId={mockMovieId} />);

    // Wait for the movie details to be loaded
    expect(await screen.findByText('Data not found')).toBeInTheDocument();
  });
});
