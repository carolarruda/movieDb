import React, { useState, useContext , useEffect} from "react";
import { Context } from "../client/App";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";

const RegisterUI = ({ setMovies }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");
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
    navigate(`/`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    fetch("http://localhost:4000/user/register", opts)
      .then((res) => res.json())
      .then(() => {
        setUsers(users);
        fetch("http://localhost:4000/user/register")
          .then((res) => res.json())
          .then((data) => setUsers(data));
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
      });
  };

  return (
    <div className="main">
      <div className="box-content">
        <div className="form">
          <h1>Register</h1>
          <div className="register">
            <p className="undertext">Already have an account?</p>
            <button className="sign" onClick={handleRegister}>
              Login
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
              REGISTER
            </button>
          </form>
        </div>
        <div className="login-image"></div>
      </div>
    </div>
  );
};

export default RegisterUI;
