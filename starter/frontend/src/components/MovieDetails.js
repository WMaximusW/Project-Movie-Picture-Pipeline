import React, { useState, useEffect } from "react";
import axios from "axios";
import { url_movies } from "../route";

export default function MovieDetail({ movieId }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    axios.get(`${url_movies}/${movieId}`).then((response) => {
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
