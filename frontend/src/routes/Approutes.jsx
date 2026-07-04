import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  const location = useLocation();

  // toLowerCase() handles both /dashboard and /Dashboard
  const shouldHideLayout = location.pathname.toLowerCase() === "/dashboard";

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default AppRoutes;