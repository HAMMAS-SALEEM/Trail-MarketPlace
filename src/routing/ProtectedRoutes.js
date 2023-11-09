import React from "react";
import { Navigate } from "react-router-dom";
import { Home } from '../views/Home'
import Error from "../views/Error";


const ProtectedRoutes = ({session}) => {
  return session == true ? <Home/> : session == null ? <Error /> : <Navigate to='/login' />
};

export default ProtectedRoutes;
