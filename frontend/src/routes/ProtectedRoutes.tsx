import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  // @ts-ignore: Property '...' does not exist on type 'void'
  const { loggedIn } = useSelector((state) => state.user);
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
