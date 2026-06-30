import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#16213E] border-t border-[#2A3555] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Social<span className="text-[#E94560]">Sage</span>
          </h2>

          <p className="text-[#B8B8C2] mt-2">
            AI-powered creator growth platform.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-[#B8B8C2]">
          <Link to="/" className="hover:text-[#E94560] transition">
            Home
          </Link>

          <Link to="/" className="hover:text-[#E94560] transition">
            Features
          </Link>

          <Link to="/" className="hover:text-[#E94560] transition">
            About
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-[#B8B8C2] text-sm">
        © {new Date().getFullYear()} SocialSage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;