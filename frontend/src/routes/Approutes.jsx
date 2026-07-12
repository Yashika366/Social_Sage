import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  const location = useLocation();

  // Pages that should NOT show Navbar and Footer
  const shouldHideLayout =
  location.pathname.toLowerCase() === "/dashboard" ||
  location.pathname.toLowerCase() === "/login";

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Routes>
        {/* Public pages - anyone can access */}
        <Route path="/" element={<Home />} />

        {/* Public only - logged in users get redirected to dashboard */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected - only logged in users can access */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default AppRoutes;