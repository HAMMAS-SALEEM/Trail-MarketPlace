import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentuser } from "../controllers/authContoller";
import Loader from "../components/ui/Loader";


const ProtectedRoutes = () => {
  const user = useCurrentuser();
  return user ? <Suspense fallback={<Loader/>}>
    <Outlet />
  </Suspense> : <Navigate to={`/`} />;
};

export default ProtectedRoutes;
