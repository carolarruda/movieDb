import React, { useState, useContext, useEffect } from "react";
import { Context } from "../client/App";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import { keyframes } from 'styled-components';

const LoginUI = ({ setMovies }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useContext(Context);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [red, setRed] = useState("");
  const [redTwo, setRedTwo] = useState("");
  const [shake, setShake] = useState("");
  const [shakeTwo, setShakeTwo] = useState("");

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

    async function loginUser() {
      try {
        const loginResponse = await fetch(
          "http://localhost:4000/user/login",
          opts
        );
        const data = await loginResponse.json();
        setStatus(loginResponse.status);

        if (loginResponse.status === 200) {
          setLoggedIn(true);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("username", data.data.username);
          const moviesResponse = await fetch("http://localhost:4000/movie");
          const moviesData = await moviesResponse.json();
          setMovies(moviesData.movies);
          navigate(`/main`);
        } else if (loginResponse.status === 404) {
          setFailed(true);
          setRed("red");
          setRedTwo("");
          setShake("shake 0.2s ease-in-out 0s 2");
          setShakeTwo("");
          console.log("Please use register to create a new user");
        } else if (loginResponse.status === 401) {
          setWrong(true);
          setFailed(false);
          setRedTwo("red");
          setRed("");
          setShakeTwo("shake 0.2s ease-in-out 0s 2");
          setShake("");
        }
      } catch (error) {
        console.error("Error occurred during login: ", error);
      }
    }

    loginUser();
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
             style={{
              color: `${red}`,
              animation: `${shake}`,
            }}
              type="text"
              id="username"
              placeholder="username"
              required
              value={username}
              onChange={handleUsername}
            />
            <label htmlFor="password">Password</label>
            <input
             style={{
              color: `${redTwo}`,
              animation: `${shakeTwo}`,
            }}
              type="password"
              id="password"
              placeholder="password"
              required
              value={password}
              onChange={handlePassword}
            />
            {failed && (
              <div className="error">
                The username you have entered is not associated with an account.
              </div>
            )}
            {!failed && !wrong && <div></div>}
            {!failed && wrong && (
              <div className="error">Your password is incorrect</div>
            )}

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
