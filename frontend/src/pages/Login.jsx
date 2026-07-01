import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Icons for the input fields
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
// Brand icons for OAuth buttons
import { FcGoogle } from "react-icons/fc";
import { HiOutlineSparkles } from "react-icons/hi2";

const Login = () => {
  // Tracks which tab is active - "login" or "signup"
  // This way we only need ONE page component instead of two separate pages
  const [activeTab, setActiveTab] = useState("login");

  // Controlled inputs - React owns the input values, not the browser
  // This is called "controlled components" - the standard React way to handle forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // only used on signup tab

  // Tracks whether password is visible or hidden
  const [showPassword, setShowPassword] = useState(false);

  // Tracks loading state when form is submitted (for the button animation)
  const [loading, setLoading] = useState(false);

  // Fake submit handler - we'll wire this to the real backend later
  // For now it just simulates a loading state so the UI feels real
  const handleSubmit = () => {
    setLoading(true);
    // setTimeout simulates a network request delay (1.5 seconds)
    // In real code this becomes: const response = await axios.post('/api/auth/login', { email, password })
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    // min-h-screen = full viewport height
    // flex items-center justify-center = centers the card both vertically and horizontally
    // relative overflow-hidden = needed for the background glow blobs to not spill out
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center relative overflow-hidden px-4">

      {/* BACKGROUND GLOW BLOBS - same decorative technique as Hero */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E94560] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0F3460] opacity-20 rounded-full blur-3xl pointer-events-none" />

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        // animate (not whileInView) because this IS the page - it should play immediately on load, not on scroll
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-[#16213E] border border-[#2A3555] rounded-2xl shadow-2xl p-8"
      >
        {/* LOGO LINK - clicking it goes back to home */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <HiOutlineSparkles className="text-[#E94560] text-xl" />
          <span className="text-xl font-bold text-[#F9F9F9]">
            Social<span className="text-[#E94560]">Sage</span>
          </span>
        </Link>

        {/* TAB SWITCHER - Login vs Sign Up */}
        {/* bg-[#1A1A2E] = slightly darker background than the card, creates a "sunken" tab bar look */}
        <div className="flex bg-[#1A1A2E] rounded-xl p-1 mb-8">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              // w-1/2 = each tab takes exactly half the width
              // transition-all = smoothly animates between active/inactive styles
              className={`w-1/2 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#E94560] text-white shadow-md"       // active tab: solid accent background
                  : "text-[#B8B8C2] hover:text-[#F9F9F9]"    // inactive: muted, brightens on hover
              }`}
            >
              {/* Capitalize first letter of each tab name for display */}
              {tab === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* GOOGLE OAUTH BUTTON */}
        {/* This is currently a UI-only button - we'll wire it to real OAuth later */}
        <button className="w-full flex items-center justify-center gap-3 bg-[#1A1A2E] border border-[#2A3555] hover:border-[#F9F9F9]/30 text-[#F9F9F9] py-3 rounded-xl mb-6 transition-colors duration-200 text-sm font-medium">
          {/* FcGoogle is a full-color Google icon from react-icons/fc (fc = flat color) */}
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* DIVIDER - "or" separator between OAuth and email/password form */}
        <div className="flex items-center gap-3 mb-6">
          {/* flex-1 divider lines stretch to fill remaining space on either side of the text */}
          <div className="flex-1 h-px bg-[#2A3555]" />
          <span className="text-[#B8B8C2] text-xs">or continue with email</span>
          <div className="flex-1 h-px bg-[#2A3555]" />
        </div>

        {/* FORM FIELDS */}
        <div className="flex flex-col gap-4 mb-6">

          {/* NAME FIELD - only shows on signup tab */}
          {/* This conditional render pattern is the React way to show/hide content based on state */}
          {activeTab === "signup" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-[#B8B8C2] text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                // onChange fires every time the user types a character
                // e.target.value is the current full value of the input
                // setName updates our state to match, keeping React in control
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                // outline-none removes the browser's default blue focus ring (we replace it with our own border color change)
                // focus:border-[#E94560] = border turns accent color when the field is focused
              />
            </motion.div>
          )}

          {/* EMAIL FIELD */}
          <div>
            <label className="block text-[#B8B8C2] text-sm mb-2">Email Address</label>
            {/* relative + absolute icon inside = positions the icon INSIDE the input box */}
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8C2] text-lg" />
              {/* pl-11 = left padding large enough that text starts AFTER the icon, so they don't overlap */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200"
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-[#B8B8C2] text-sm mb-2">Password</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8C2] text-lg" />
              {/* type changes between "password" (dots) and "text" (visible) based on showPassword state */}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-11 pr-11 py-3 text-sm outline-none transition-colors duration-200"
              />
              {/* EYE TOGGLE BUTTON - sits inside the input on the right side */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8B8C2] hover:text-[#F9F9F9] transition-colors"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>
          </div>
        </div>

        {/* FORGOT PASSWORD - only relevant on login tab */}
        {activeTab === "login" && (
          <div className="text-right mb-6">
            <a href="#" className="text-[#E94560] text-sm hover:underline">
              Forgot password?
            </a>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          // disabled:opacity-50 = button visually dims when loading is true
          // disabled:cursor-not-allowed = cursor changes to show the button isn't clickable
          className="w-full bg-[#E94560] hover:bg-[#d63a52] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-all duration-200 mb-6"
        >
          {/* Button text changes based on loading state AND which tab is active */}
          {loading
            ? "Please wait..."
            : activeTab === "login"
            ? "Log In"
            : "Create Account"}
        </button>

        {/* BOTTOM SWITCH TEXT - "don't have an account? Sign up" */}
        <p className="text-center text-[#B8B8C2] text-sm">
          {activeTab === "login" ? "Don't have an account?" : "Already have an account?"}
          {" "}
          <button
            onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
            className="text-[#E94560] font-medium hover:underline"
          >
            {activeTab === "login" ? "Sign up free" : "Log in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;