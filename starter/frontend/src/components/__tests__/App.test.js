// Import necessary dependencies
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import App from '../../App';

// Mock the MovieList and MovieDetail components with display names
jest.mock('../MovieList.js', () => {
  const MockMovieList = ({ onMovieClick }) => (
    <div data-testid="movie-list" onClick={() => onMovieClick({ id: 1, title: 'Test Movie' })}>
      Movie List
    </div>
  );
  MockMovieList.displayName = 'MockMovieList';
  return MockMovieList;
});

jest.mock('../MovieDetail.js', () => {
  const MockMovieDetail = ({ movie }) => (
    <div data-testid="movie-details">Movie Details: {movie.title}</div>
  );
  MockMovieDetail.displayName = 'MockMovieDetail';
  return MockMovieDetail;
});

describe('App component', () => {
  it('renders Movie List without selected movie details', () => {
    // Render the App component
    const { findByText, queryByTestId } = render(<App />);

    // Assert that Movie List is rendered
    expect(findByText('Movie List')).toBeInTheDocument();

    // Assert that Movie Details is not rendered initially
    expect(queryByTestId('movie-details')).toBeNull();
  });

  it('renders Movie Details when a movie is clicked', () => {
    // Render the App component
    const { getByTestId, findByText } = render(<App />);

    // Click on a movie in the Movie List
    fireEvent.click(getByTestId('movie-list'));

    // Assert that Movie Details is rendered with the selected movie
    expect(findByText('Movie Details: Test Movie')).toBeInTheDocument();
  });
});
