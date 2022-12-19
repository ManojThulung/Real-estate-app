import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

function PrivateRoute() {
  const { isLogged, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  return isLogged ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
