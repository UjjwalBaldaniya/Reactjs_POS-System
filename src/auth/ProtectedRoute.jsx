import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const ProtectedRoute = () => {
  const authUser = localStorage.getItem("authUser");
  return authUser ? <Layout /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
