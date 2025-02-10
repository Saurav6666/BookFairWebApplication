import React from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  role: "buyer" | "seller";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const storedUser = localStorage.getItem("user");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!storedUser || !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(storedUser);

  if (user.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
