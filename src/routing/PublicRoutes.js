import React from "react";
import { Navigate } from "react-router-dom";
import { Login } from "../views/Login";

const PublicRoutes = ({session}) => {
  return session ? <Navigate to='/' /> : <Login/> 
};

export default PublicRoutes;
