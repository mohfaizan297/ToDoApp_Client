import React, { useContext, useState } from "react";
import "./Signup.css";
import { Link, Navigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { Context, server } from "../../index";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${server}/auth/signup`,
        {
          name,
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
      // console.log(response.data);
    } catch (e) {
      // console.log(e);
      toast.error(e.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }
  if (isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="Signup">
      <div className="signup-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            required
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button disabled={loading} className="signup-sub-btn" type="submit">
            Sign Up
          </button>
        </form>
        <p className="alredy-account">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
