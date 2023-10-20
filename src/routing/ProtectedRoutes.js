import React from "react";
import { Navigate } from "react-router-dom";
import { Home } from '../views/Home'


const ProtectedRoutes = ({session}) => {
  return session ? <Home/> : <Navigate to='/login' />
};

export default ProtectedRoutes;
