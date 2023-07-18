import React, { useState, useContext } from "react";
import { Context } from "../client/App";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useContext(Context);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.clear();
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
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
        setUsername("");
        setPassword("");
        setLoggedIn(true);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("username", data.data.username);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Login</button>
        <button onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

export default Login;
