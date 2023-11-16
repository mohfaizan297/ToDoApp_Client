import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Context, server } from "../../index";
import axios from "axios";
import toast from 'react-hot-toast'

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  async function logoutHandler() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${server}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (e) {
      toast.error(e.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  }

  return (
    <nav className="header">
      <div>
        <h2>To-Do App</h2>
      </div>
      <article className="nav-right">
        <Link className="links" to="/">
          Home
        </Link>
        <Link className="links" to="/profile">
          Profile
        </Link>

        {isAuthenticated ? (
          <button
            disabled={loading}
            className="logout-btn"
            onClick={logoutHandler}
          >
            Logout
          </button>
        ) : (
          <Link className="links" to="/login">
            Login
          </Link>
        )}
      </article>
    </nav>
  );
}
