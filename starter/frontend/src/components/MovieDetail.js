import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieDetail({ movieId }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_MOVIE_API_URL}/movies/${movieId}`).then((response) => {
      setDetail(response.data);
    });
  }, null);

  return (
    <div>
      {detail != null ? (
        <>
          <h2>{detail?.movie.title}</h2>
          <p>{detail?.movie.description}</p>
        </>
      ) : (
        <>
          <strong className="notfound">Data not found</strong>
        </>
      )}
    </div>
  );
}
