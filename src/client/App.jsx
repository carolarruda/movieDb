import LoginUI from "../components/LoginUI";
import MovieList from "../components/MovieList";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterUI from "../components/RegisterUI";

import "./App.css";

export const Context = React.createContext();

const apiUrl = "http://localhost:4000";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      fetch(`http://localhost:4000/movie/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.movies);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [token]);

  return (
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginUI setMovies={setMovies} />} />
          <Route
            path="/main/:id"
            element={
              loggedIn && (
                <>
                  <MovieList movies={movies} setMovies={setMovies} />
                </>
              )
            }
          />
          <Route
            path="/user/register"
            element={<RegisterUI setMovies={setMovies} />}
          />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
