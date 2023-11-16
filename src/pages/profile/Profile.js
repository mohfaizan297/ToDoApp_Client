import React, { useContext } from "react";
import "./Profile.css";
import { Context } from "../..";
import Loader from "../../components/loader/Loader";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user, isAuthenticated, loading } = useContext(Context);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return loading ? (
    <Loader />
  ) : (
    <div className="profile">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
