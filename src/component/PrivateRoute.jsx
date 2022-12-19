import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

function PrivateRoute() {
  const { isLogged, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <div>Loading...</div>;
  }
  return isLogged ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
