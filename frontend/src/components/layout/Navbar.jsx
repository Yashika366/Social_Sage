import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#16213E]/80 backdrop-blur-lg border-b border-[#2A3555]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <Link
          to="/"
          className="text-3xl font-bold text-[#F9F9F9]"
        >
          Social<span className="text-[#E94560]">Sage</span>
        </Link>

        <div className="flex items-center gap-8 text-[#B8B8C2]">

          <Link to="/" className="hover:text-[#E94560] transition">
            Home
          </Link>

          <Link to="/" className="hover:text-[#E94560] transition">
            Features
          </Link>

          <Link to="/" className="hover:text-[#E94560] transition">
            About
          </Link>

          <Link
            to="/login"
            className="bg-[#E94560] hover:bg-[#d83b56] px-5 py-2.5 rounded-xl text-white transition"
          >
            Get Started
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;