import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
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
        setUsername("");
        setPassword("");
        setUsers(users);
        fetch("http://localhost:4000/user/register")
          .then((res) => res.json())
          .then((data) => setUsers(data));
      });
  };
  return (
    <div>
      <h1>Register</h1>
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
