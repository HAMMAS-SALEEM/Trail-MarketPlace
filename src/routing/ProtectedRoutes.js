import React from "react";
import { Navigate } from "react-router-dom";
import { Home } from '../views/Home'


const ProtectedRoutes = () => {
  const user = true;
  return user ? <Home/> : <Navigate to='/login' />
};

export default ProtectedRoutes;
