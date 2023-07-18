import React, { useState, useContext, useEffect } from "react";
import { Context } from "../client/App";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";

const LoginUI = ({ setMovies }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(false);
    localStorage.clear();
  }, []);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    navigate(`/user/register`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetch("http://localhost:4000/user/login", opts)
      .then((res) => res.json())
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.username);
        fetch("http://localhost:4000/movie")
          .then((res) => res.json())
          .then((data) => {
            navigate(`/main`);
            setMovies(data.movies);
          });
      });
  };

  return (
    <div className="main">
      <div className="box-content">
        <div className="form">
          <h1>Login</h1>
          <div className="login">
            <p className="undertext">Don't have an account?</p>
            <button className="sign" onClick={handleRegister}>
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="formy">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              required
              value={username}
              onChange={handleUsername}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              required
              value={password}
              onChange={handlePassword}
            />
            <div></div>
            <button className="log-but" type="submit">
              LOGIN
            </button>
          </form>
        </div>
        <div className="login-image"></div>
      </div>
    </div>
  );
};

export default LoginUI;
