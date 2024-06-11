import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieList({ onMovieClick }) {
  const [responseData, setMovies] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_MOVIE_API_URL}/movies`).then((response) => {
      setMovies(response.data);
    });
  }, null);

  return (
    <>
      <ul>
        {responseData != null ? (
          responseData.movies.map((item) => {
            <li className="movieItem" key={item.id} onClick={() => onMovieClick(item.id)}>
              <a href="javascript:void(0)">{item.title}</a> - <span>{item.description}</span>
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
