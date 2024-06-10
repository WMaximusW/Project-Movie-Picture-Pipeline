// Import necessary dependencies
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import App from './App';

// Mock the MovieList and MovieDetails components
jest.mock('../MovieList.js', () => ({ onMovieClick }) => (
  <div data-testid="movie-list" onClick={() => onMovieClick({ title: 'Test Movie' })}>
    Movie List
  </div>
));

jest.mock('../MovieDetail.js', () => ({ movie }) => (
  <div data-testid="movie-details">
    Movie Details: {movie.title}
  </div>
));

describe('App component', () => {
  it('renders Movie List without selected movie details', () => {
    // Render the App component
    const { getByText, queryByTestId } = render(<App />);

    // Assert that Movie List is rendered
    expect(getByText('Movie List')).toBeInTheDocument();

    // Assert that Movie Details is not rendered initially
    expect(queryByTestId('movie-details')).toBeNull();
  });

  it('renders Movie Details when a movie is clicked', () => {
    // Render the App component
    const { getByTestId, getByText } = render(<App />);

    // Click on a movie in the Movie List
    fireEvent.click(getByTestId('movie-list'));

    // Assert that Movie Details is rendered with the selected movie
    expect(getByText('Movie Details: Test Movie')).toBeInTheDocument();
  });
});
