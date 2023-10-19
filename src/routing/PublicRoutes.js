import React from "react";
import { Navigate } from "react-router-dom";
import { Login } from "../views/Login";

const PublicRoutes = () => {
  const user = true;
  return user ? <Navigate to='/' /> : <Login/> 
};

export default PublicRoutes;
