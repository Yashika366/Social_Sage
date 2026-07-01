import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* big 404 number as a decorative background text */}
        <h1 className="text-[150px] font-bold text-[#2A3555] leading-none select-none">
          404
        </h1>

        <h2 className="text-2xl font-bold text-[#F9F9F9] -mt-6 mb-4">
          Page not found
        </h2>

        <p className="text-[#B8B8C2] mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="bg-[#E94560] hover:bg-[#d63a52] text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;