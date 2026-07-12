import { Navigate } from "react-router-dom";

// PublicRoute wraps pages that logged-in users shouldn't see
// e.g. Login page - if already logged in, redirect to dashboard
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Already logged in - send to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Not logged in - show the page normally
  return children;
};

export default PublicRoute;