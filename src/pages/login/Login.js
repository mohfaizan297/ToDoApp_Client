import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
import { Context, server } from "../..";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${server}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (e) {
      toast.error(e.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="Login">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            required
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={loading} className="login-btn" type="submit">
            Login
          </button>
        </form>
        <p className="dont-account">
          Do not have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
