import Login from "../components/Login";
import MovieList from "../components/MovieList";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterUI from "../components/RegisterUI";

import "./App.css";

export const Context = React.createContext();

const apiUrl = "http://localhost:4000";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      fetch(`https://rich-wasp-capris.cyclic.app/movie`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [token]);

  return (
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setMovies={setMovies} />} />
          <Route
            path="/main"
            element={
              loggedIn && (
                <>
                  <MovieList movies={movies} setMovies={setMovies} />
                </>
              )
            }
          />
          <Route
            path="/register"
            element={<RegisterUI setMovies={setMovies} />}
          />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
