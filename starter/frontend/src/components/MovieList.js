import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url_movies } from '../route';

export default function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    axios.get(url_movies).then((response) => {
      setMovies(response.data.movies);
    });
  }, null);

  return (
    <>
      <ul>
        {movies != null ? (
          movies.map((item) => {
            <li className="movieItem" key={item.id} onClick={() => onMovieClick(item.id)}>
              <a href="javascript:void(0)">
                {item.title} - <span>{item.description}</span>
              </a>
            </li>;
          })
        ) : (
          <li className="movieItem" key="0">
            Empty List
          </li>
        )}
      </ul>
    </>
  );
}
