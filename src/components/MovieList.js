import React, { useEffect, useState } from "react";

const MovieList = ({ movies, setMovies }) => {
  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.length > 0 &&
          movies.map((movie) => (
            <li key={movie.id}>
              <h4>  {movie.title}</h4>
              description: {movie.description}
              <br />
              runtime: {movie.runtimeMins}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieList;
