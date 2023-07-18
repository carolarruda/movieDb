import { useState } from "react";

const Movie = ({ movies, setMovies }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [runtimeMins, setRuntimeMins] = useState("");
  const token = localStorage.getItem("token");


  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleRuntime = (e) => {
    setRuntimeMins(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      description,
      runtimeMins,
    };
    const opts = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    };
    fetch("http://localhost:4000/movie", opts)
      .then((res) => res.json())
      .then(() => {
        setTitle("");
        setDescription("");
        setRuntimeMins("");
        setMovies(movies);
        fetch("http://localhost:4000/movie", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setMovies(data));
      });
  };

  return (
    <div>
      <h1>Create Movie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={handleTitle}
        />
        <label htmlFor="password"></label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={handleDescription}
        />
        <label htmlFor="runtime"></label>
        <input
          type="number"
          id="runtimeMins"
          placeholder="Runtime"
          value={runtimeMins}
          onChange={handleRuntime}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default Movie;
