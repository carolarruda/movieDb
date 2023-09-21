import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../client/App";

const MovieList = ({ movies, setMovies }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [runtimeMins, setRuntimeMins] = useState("");
  const [url, setUrl] = useState("");
  const [loggedIn, setLoggedIn] = useContext(Context);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleRuntime = (e) => {
    if (e.target.value >= 0) {
      setRuntimeMins(e.target.value);
    }
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleLogout = () => {
    navigate(`/`);
    setLoggedIn(false);
    localStorage.clear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      description,
      runtimeMins,
      url,
      userId,
    };
    const opts = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    };

    fetch(`http://localhost:4000/movie`, opts)
      .then((res) => res.json())
      .then((data) => {
        setTitle("");
        setDescription("");
        setRuntimeMins("");
        setUrl("");
        setMovies(movies);
        fetch(`http://localhost:4000/movie/${userId}`)
          .then((res) => res.json())
          .then((data) => setMovies(data.movies));
      });
  };
  return (
    <section className="main">
      <div className="box-content">
        <div className="form">
          <h1>Add Movie</h1>
          <form onSubmit={handleSubmit} className="formy two">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={handleTitle}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={description}
              onChange={handleDescription}
            />
            <label htmlFor="runtime">Runtime</label>
            <input
              type="number"
              id="runtimeMins"
              placeholder="Runtime"
              value={runtimeMins}
              onChange={handleRuntime}
            />
            <label htmlFor="poster">Poster</label>
            <input
              type="url"
              id="poster"
              placeholder="Poster"
              value={url}
              onChange={handleUrl}
              style={{ height: "50px" }}
            />
            <div></div>
            <button type="submit" className="log-but">
              Add Now
            </button>
          </form>
        </div>
        <div className="griddy">
          <div className="logout">
            <button onClick={handleLogout}>Logout</button>
          </div>
          <h1>Movie List</h1>
          <div className="movie-grid">
            {movies.length > 0 &&
              movies.map((movie) => {
                const style = {
                  backgroundImage: movie.url
                    ? `url(${movie.url})`
                    : "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeDP37vMYgkI-FLO2_vGo9qGp1SltyyuRSiaYQI7yVBaLKoNXJ6LDD7wGxTrrZBPkSwV0&usqp=CAU)",
                };
                return (
                  <div key={movie.id} className="box">
                    <h3> {movie.title}</h3>
                    <p> description: {movie.description}</p>
                    <p> runtime: {movie.runtimeMins}</p>

                    <div className="poster" style={style}></div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieList;
