// Import useState - a React Hook that lets a component remember values between renders
import { useState, useEffect } from "react";
// Import Link - lets us navigate between pages WITHOUT reloading the whole site
import { Link } from "react-router-dom";
// Import a hamburger/close icon from react-icons for mobile menu
import { HiMenu, HiX } from "react-icons/hi";
// Import motion - lets us animate normal HTML tags like <div> by writing <motion.div>
import { motion } from "framer-motion";

const Navbar = () => {
  // scrolled = tracks whether user has scrolled down, so we can change navbar background
  const [scrolled, setScrolled] = useState(false);
  // isOpen = tracks whether mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // useEffect runs side-effects (things outside of rendering, like event listeners)
  useEffect(() => {
    // This function runs every time the user scrolls
    const handleScroll = () => {
      // window.scrollY = how many pixels the user has scrolled from the top
      // If more than 20px, we mark scrolled as true
      setScrolled(window.scrollY > 20);
    };
    // Attach the scroll listener to the window
    window.addEventListener("scroll", handleScroll);
    // Cleanup function - removes the listener when component unmounts (prevents memory leaks)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array = run this effect only once, when component first mounts

  // An array of nav links - storing as data instead of writing 4 separate <Link> tags
  const navLinks = [
    { name: "Features", path: "/#features" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Pricing", path: "/#pricing" },
  ];

  return (
    // <nav> is semantic HTML for navigation. fixed = stays at top even when scrolling
    // top-0 left-0 w-full = stick to top, full width. z-50 = stay above other content
    // transition-all duration-300 = smoothly animate any property change (like background) over 300ms
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1A1A2E]/80 backdrop-blur-md border-b border-[#2A3555]" // when scrolled: semi-transparent dark + blur + bottom border
          : "bg-transparent" // when at top: fully transparent
      }`}
    >
      {/* max-w-7xl = caps content width on large screens. mx-auto = centers it. px-6 = side padding */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-[#F9F9F9]">
          Social<span className="text-[#E94560]">Sage</span>
        </Link>

        {/* DESKTOP LINKS - hidden on mobile (hidden), shown as flex row on medium+ screens (md:flex) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            
               <a key={link.name} // React needs a unique 'key' when rendering lists, to track each item
              href={link.path}
              className="text-[#B8B8C2] hover:text-[#F9F9F9] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* DESKTOP CTA BUTTON */}
        <Link
          to="/login"
          className="hidden md:inline-block bg-[#E94560] hover:bg-[#d63a52] text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Get Started
        </Link>

        {/* MOBILE MENU BUTTON - only visible on small screens */}
        <button
          className="md:hidden text-[#F9F9F9] text-2xl"
          onClick={() => setIsOpen(!isOpen)} // toggle isOpen between true/false
        >
          {isOpen ? <HiX /> : <HiMenu />} {/* show X icon if open, hamburger if closed */}
        </button>
      </div>

      {/* MOBILE MENU - only renders when isOpen is true */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} // starting animation state
          animate={{ opacity: 1, height: "auto" }} // animate to this state
          className="md:hidden bg-[#16213E] px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.path} className="text-[#B8B8C2]">
              {link.name}
            </a>
          ))}
          <Link to="/login" className="bg-[#E94560] text-white text-center py-2 rounded-lg">
            Get Started
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; // makes this component importable elsewhere