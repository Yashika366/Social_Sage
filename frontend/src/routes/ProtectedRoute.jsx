import { Navigate } from "react-router-dom";

// ProtectedRoute wraps any page that requires login
// If user is not logged in, redirect them to /login
// If user is logged in, show the page normally
const ProtectedRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // replace=true means the login page REPLACES the current history entry
    // so pressing back button doesn't take them back to dashboard
    return <Navigate to="/login" replace />;
  }

  // Token exists - render the actual page
  return children;
};

export default ProtectedRoute;