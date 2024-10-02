import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const authToken = Cookies.get("authToken");
  return authToken ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: ReactNode }) {
  const role = Cookies.get("role");
  const authToken = Cookies.get("authToken");

  if (authToken) {
    // if authenticated, redirect to appropriate page based on role
    if (role === "USER") {
      return <Navigate to="/main" replace />;
    } else {
    }
  }

  // if not authenticated, show the public page
  return <>{children}</>;
}

export { PrivateRoute, PublicRoute };
