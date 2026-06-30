import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <>
      {/* Navbar renders above EVERY route, since it's outside the <Routes> block */}
      <Navbar />

      {/* Routes/Route define which page component shows for which URL path */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* path="*" catches any URL that doesn't match the above - shows 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer renders below EVERY route too, same reasoning as Navbar */}
      <Footer />
    </>
  );
};

export default AppRoutes;