import React, { useState, useContext, useEffect } from "react";
import { Context } from "../client/App";
import "./styles/style.css";
import { useNavigate } from "react-router-dom";
import { keyframes } from "styled-components";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import classes from "./Sign.module.css";



const Login = ({ setMovies, movies }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useContext(Context);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [red, setRed] = useState("");
  const [redTwo, setRedTwo] = useState("");
  const [shake, setShake] = useState("");
  const [shakeTwo, setShakeTwo] = useState("");

  const sk = "shake 0.2s ease-in-out 0s 2";

  const navigate = useNavigate();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="http://localhost:3000/">
          Carls
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    );
  }

  useEffect(() => {
    setLoggedIn(false);
    localStorage.clear();
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    navigate(`/register`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
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
          "https://rich-wasp-capris.cyclic.app/login",
          opts
        );
        const data = await loginResponse.json();
        setStatus(loginResponse.status);

        if (loginResponse.status === 200) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          const token = localStorage.getItem('token')
          localStorage.setItem("userId", data.user.userId);

          let userId = data.user.userId;
          const moviesResponse = await fetch(
            `https://rich-wasp-capris.cyclic.app/movie`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          const moviesData = await moviesResponse.json();
          setMovies(moviesData);
          navigate(`/main`);
        } else if (loginResponse.status === 404) {
          setFailed(true);
          setRed("red");
          setRedTwo("red");
          setShake(sk);
          setShakeTwo(sk);
          console.log("Please use register to create a new user");
        } else if (loginResponse.status === 401) {
          setWrong(true);
          setFailed(false);
          setRedTwo("red");
          setRed("red");
          setShakeTwo(sk);
          setShake(sk);
        }
      } catch (error) {
        console.error("Error occurred during login: ", error);
      }
    }

    loginUser();
  };

  return (
    <div className={classes.background}>
      <div className={classes.formContainer}>
        <h1>Sign in</h1>
        <div className={classes.register}>
          <p className={classes.undertext}>Don't have an account?</p>
          <button className={classes.sign} onClick={handleRegister}>
            Sign up
          </button>
        </div>

        <form className={`${classes.formy} ${classes.log}`} onSubmit={handleSubmit}>
          <label htmlFor="username">Email</label>
          <input
            style={{
              color: `${red}`,
              animation: `${shake}`,
            }}
            type="text"
            id="username"
            placeholder="email"
            required
            value={email}
            onChange={handleEmail}
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
          {!failed && !wrong && <div></div>}
          {failed && wrong && (
            <div className={classes.error}>Invalid email and/or password provided</div>
          )}
          <button className={classes.logBut} type="submit">
            Sign In
          </button>
          <Copyright sx={{ mt: 5 }} />
        </form>
      </div>
    </div>
  );
};

export default Login;
