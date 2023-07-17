import Register from "../components/Register";
import Login from "../components/Login";
import Movie from "../components/Movie";
import MovieList from "../components/MovieList";
import React, { useState } from "react";

import "./App.css";

export const Context = React.createContext();

const apiUrl = "http://localhost:4000";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState("");

  return (
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App">
        <Register />
        <Login />
        {loggedIn && <Movie movies={movies} setMovies={setMovies}/>}
        {loggedIn && <MovieList movies={movies} setMovies={setMovies}/>}

      </div>
    </Context.Provider>
  );
}

export default App;
