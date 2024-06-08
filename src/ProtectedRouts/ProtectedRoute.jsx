// src/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return  <Outlet />
};

export default ProtectedRoute;
