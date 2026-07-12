import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineUser,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineSparkles } from "react-icons/hi2";
import useAuth from "../hooks/useAuth";

const Login = () => {
  // useSearchParams reads URL query parameters
  // e.g. /login?tab=signup gives us searchParams.get("tab") = "signup"
  const [searchParams] = useSearchParams();

  // Set initial tab based on URL parameter
  // If ?tab=signup → open signup tab
  // If ?tab=login or nothing → open login tab
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") === "signup" ? "signup" : "login"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, loading, error } = useAuth();

  // If URL parameter changes, update the active tab
  // This handles browser back/forward navigation
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "signup" || tab === "login") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    if (activeTab === "login") {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
  };

  // Allow submitting with Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center relative overflow-hidden px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E94560] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0F3460] opacity-20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#16213E] border border-[#2A3555] rounded-2xl shadow-2xl p-8"
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-2">
          <HiOutlineSparkles className="text-[#E94560] text-xl" />
          <span className="text-xl font-bold text-[#F9F9F9]">
            Social<span className="text-[#E94560]">Sage</span>
          </span>
        </Link>

        {/* HEADLINE - changes based on active tab */}
        <p className="text-center text-[#B8B8C2] text-sm mb-8">
          {activeTab === "login"
            ? "Welcome back! Log in to your account"
            : "Create your free account and start growing"}
        </p>

        {/* TAB SWITCHER */}
        <div className="flex bg-[#1A1A2E] rounded-xl p-1 mb-8">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setEmail("");
                setPassword("");
                setName("");
              }}
              className={`w-1/2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#E94560] text-white shadow-md"
                  : "text-[#B8B8C2] hover:text-[#F9F9F9]"
              }`}
            >
              {tab === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* GOOGLE BUTTON */}
        <button className="w-full flex items-center justify-center gap-3 bg-[#1A1A2E] border border-[#2A3555] hover:border-[#F9F9F9]/30 text-[#F9F9F9] py-3 rounded-xl mb-6 transition-colors duration-200 text-sm font-medium">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#2A3555]" />
          <span className="text-[#B8B8C2] text-xs">or continue with email</span>
          <div className="flex-1 h-px bg-[#2A3555]" />
        </div>

        {/* FORM FIELDS */}
        <div className="flex flex-col gap-4 mb-6">

          {/* NAME - signup only */}
          {activeTab === "signup" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-[#B8B8C2] text-sm mb-2">
                Full Name
              </label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8C2] text-lg" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Your full name"
                  className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200"
                />
              </div>
            </motion.div>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-[#B8B8C2] text-sm mb-2">
              Email Address
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8C2] text-lg" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="you@example.com"
                className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-[#B8B8C2] text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8C2] text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-11 pr-11 py-3 text-sm outline-none transition-colors duration-200"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8B8C2] hover:text-[#F9F9F9]"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>
          </div>
        </div>

        {/* FORGOT PASSWORD - login only */}
        {activeTab === "login" && (
          <div className="text-right mb-6">
            <a href="#" className="text-[#E94560] text-sm hover:underline">
              Forgot password?
            </a>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#E94560] hover:bg-[#d63a52] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 mb-6"
        >
          {loading
            ? "Please wait..."
            : activeTab === "login"
            ? "Log In to Dashboard"
            : "Create Free Account"}
        </button>

        {/* SWITCH TAB */}
        <p className="text-center text-[#B8B8C2] text-sm">
          {activeTab === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          {" "}
          <button
            onClick={() =>
              setActiveTab(activeTab === "login" ? "signup" : "login")
            }
            className="text-[#E94560] font-medium hover:underline"
          >
            {activeTab === "login" ? "Sign up free" : "Log in"}
          </button>
        </p>

        {/* TERMS - only on signup */}
        {activeTab === "signup" && (
          <p className="text-center text-[#B8B8C2] text-xs mt-4">
            By signing up you agree to our{" "}
            <a href="#" className="text-[#E94560] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#E94560] hover:underline">
              Privacy Policy
            </a>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;