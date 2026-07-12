import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineX,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineCheck,
} from "react-icons/hi";
import useAuth from "../../hooks/useAuth";

const ProfileDropdown = () => {
  // Controls whether dropdown is open
  const [isOpen, setIsOpen] = useState(false);

  // Controls which view is showing inside the dropdown
  // "main" = profile overview, "changePassword" = password form
  const [activeView, setActiveView] = useState("main");

  // Password change form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const { logout, getUser } = useAuth();
  const user = getUser();

  // useRef creates a reference to the dropdown DOM element
  // We use this to detect clicks OUTSIDE the dropdown to close it
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // dropdownRef.current = the actual DOM element
      // contains() checks if the click target is inside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveView("main"); // reset to main view when closing
      }
    };

    // Add listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove listener when component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fake password change handler - wire to real API later
  const handlePasswordChange = async () => {
    setPasswordError("");
    setPasswordSuccess(false);

    // Client-side validation before hitting the API
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    setPasswordLoading(true);

    // Simulate API call - replace with real backend call later:
    // await authAPI.changePassword({ currentPassword, newPassword })
    setTimeout(() => {
      setPasswordLoading(false);
      setPasswordSuccess(true);
      // Clear form after success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      // Go back to main view after 2 seconds
      setTimeout(() => {
        setPasswordSuccess(false);
        setActiveView("main");
      }, 2000);
    }, 1500);
  };

  // Get initials from full name for avatar
  // "Yashika Keshari" -> "YK"
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2); // max 2 characters
  };

  return (
    // relative = needed so the dropdown positions correctly below the avatar
    <div className="relative" ref={dropdownRef}>

      {/* AVATAR BUTTON - clicking this toggles the dropdown */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveView("main"); // always open on main view
        }}
        className="w-9 h-9 rounded-full bg-[#E94560] flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:bg-[#d63a52] transition-colors duration-200"
      >
        {getInitials(user?.name)}
      </button>

      {/* DROPDOWN PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            // absolute right-0 = aligns dropdown to the right edge of the avatar
            // top-12 = appears just below the avatar
            // w-80 = fixed width so it doesn't shrink to content
            // z-50 = stays above all other content
            className="absolute right-0 top-12 w-80 bg-[#16213E] border border-[#2A3555] rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* ============ MAIN VIEW ============ */}
            {activeView === "main" && (
              <div>
                {/* PROFILE HEADER */}
                <div className="p-5 border-b border-[#2A3555]">
                  <div className="flex items-center gap-3 mb-4">
                    {/* Large avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E94560] to-[#0F3460] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {getInitials(user?.name)}
                    </div>
                    <div>
                      <p className="text-[#F9F9F9] font-semibold">
                        {user?.name || "User"}
                      </p>
                      <p className="text-[#B8B8C2] text-sm">
                        {user?.email || ""}
                      </p>
                      {/* Plan badge */}
                      <span className="inline-block bg-[#E94560]/20 text-[#E94560] text-xs font-medium px-2 py-0.5 rounded-full mt-1">
                        Free Plan
                      </span>
                    </div>
                  </div>

                  {/* INFO ROWS */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-[#B8B8C2]">
                      <HiOutlineUser className="text-[#E94560] flex-shrink-0" />
                      <span>{user?.name || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#B8B8C2]">
                      <HiOutlineMail className="text-[#E94560] flex-shrink-0" />
                      <span className="truncate">{user?.email || "—"}</span>
                    </div>
                  </div>
                </div>

                {/* MENU OPTIONS */}
                <div className="p-2">
                  {/* Change Password */}
                  <button
                    onClick={() => setActiveView("changePassword")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#B8B8C2] hover:bg-[#1A1A2E] hover:text-[#F9F9F9] transition-all duration-200 text-left"
                  >
                    <HiOutlineLockClosed className="text-[#E94560] text-lg flex-shrink-0" />
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-xs text-[#B8B8C2]/70">
                        Update your account password
                      </p>
                    </div>
                  </button>

                  {/* Account Settings */}
                  <button
                    onClick={() => setActiveView("settings")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#B8B8C2] hover:bg-[#1A1A2E] hover:text-[#F9F9F9] transition-all duration-200 text-left"
                  >
                    <HiOutlineCog className="text-[#E94560] text-lg flex-shrink-0" />
                    <div>
                      <p className="font-medium">Account Settings</p>
                      <p className="text-xs text-[#B8B8C2]/70">
                        Manage your preferences
                      </p>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="h-px bg-[#2A3555] my-2" />

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200 text-left"
                  >
                    <HiOutlineLogout className="text-lg flex-shrink-0" />
                    <p className="font-medium">Log Out</p>
                  </button>
                </div>
              </div>
            )}

            {/* ============ CHANGE PASSWORD VIEW ============ */}
            {activeView === "changePassword" && (
              <div>
                {/* HEADER with back button */}
                <div className="flex items-center gap-3 p-4 border-b border-[#2A3555]">
                  <button
                    onClick={() => {
                      setActiveView("main");
                      setPasswordError("");
                      setPasswordSuccess(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="text-[#B8B8C2] hover:text-[#F9F9F9] transition-colors"
                  >
                    ← 
                  </button>
                  <h3 className="text-[#F9F9F9] font-semibold">
                    Change Password
                  </h3>
                </div>

                <div className="p-4 flex flex-col gap-3">

                  {/* SUCCESS MESSAGE */}
                  {passwordSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3"
                    >
                      <HiOutlineCheck className="text-green-400 text-lg flex-shrink-0" />
                      <p className="text-green-400 text-sm">
                        Password changed successfully!
                      </p>
                    </motion.div>
                  )}

                  {/* ERROR MESSAGE */}
                  {passwordError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                      <p className="text-red-400 text-sm">{passwordError}</p>
                    </div>
                  )}

                  {/* CURRENT PASSWORD */}
                  <div>
                    <label className="block text-[#B8B8C2] text-xs mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8B8C2] text-sm" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none transition-colors"
                      />
                      <button
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8B8C2] hover:text-[#F9F9F9]"
                      >
                        {showCurrentPassword ? <HiOutlineEyeOff className="text-sm" /> : <HiOutlineEye className="text-sm" />}
                      </button>
                    </div>
                  </div>

                  {/* NEW PASSWORD */}
                  <div>
                    <label className="block text-[#B8B8C2] text-xs mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8B8C2] text-sm" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none transition-colors"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8B8C2] hover:text-[#F9F9F9]"
                      >
                        {showNewPassword ? <HiOutlineEyeOff className="text-sm" /> : <HiOutlineEye className="text-sm" />}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <label className="block text-[#B8B8C2] text-xs mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8B8C2] text-sm" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    onClick={handlePasswordChange}
                    disabled={passwordLoading}
                    className="w-full bg-[#E94560] hover:bg-[#d63a52] disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-sm font-semibold transition-colors mt-1"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            )}

            {/* ============ SETTINGS VIEW ============ */}
            {activeView === "settings" && (
              <div>
                {/* HEADER */}
                <div className="flex items-center gap-3 p-4 border-b border-[#2A3555]">
                  <button
                    onClick={() => setActiveView("main")}
                    className="text-[#B8B8C2] hover:text-[#F9F9F9] transition-colors"
                  >
                    ←
                  </button>
                  <h3 className="text-[#F9F9F9] font-semibold">
                    Account Settings
                  </h3>
                </div>

                <div className="p-4 flex flex-col gap-3">

                  {/* NOTIFICATION TOGGLE */}
                  <div className="flex items-center justify-between p-3 bg-[#1A1A2E] rounded-xl">
                    <div>
                      <p className="text-[#F9F9F9] text-sm font-medium">
                        Email Notifications
                      </p>
                      <p className="text-[#B8B8C2] text-xs">
                        Weekly growth reports
                      </p>
                    </div>
                    {/* Simple toggle - UI only for now */}
                    <div className="w-10 h-5 bg-[#E94560] rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                    </div>
                  </div>

                  {/* AI INSIGHTS TOGGLE */}
                  <div className="flex items-center justify-between p-3 bg-[#1A1A2E] rounded-xl">
                    <div>
                      <p className="text-[#F9F9F9] text-sm font-medium">
                        AI Insights
                      </p>
                      <p className="text-[#B8B8C2] text-xs">
                        Auto-analyze on login
                      </p>
                    </div>
                    <div className="w-10 h-5 bg-[#2A3555] rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5" />
                    </div>
                  </div>

                  {/* PLAN INFO */}
                  <div className="p-3 bg-[#E94560]/10 border border-[#E94560]/30 rounded-xl">
                    <p className="text-[#E94560] text-sm font-medium mb-1">
                      Free Plan
                    </p>
                    <p className="text-[#B8B8C2] text-xs mb-3">
                      1 channel · Basic AI analysis · 10 video insights
                    </p>
                    <button className="w-full bg-[#E94560] hover:bg-[#d63a52] text-white py-2 rounded-lg text-xs font-semibold transition-colors">
                      Upgrade to Pro
                    </button>
                  </div>

                  {/* DANGER ZONE */}
                  <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-sm font-medium mb-1">
                      Danger Zone
                    </p>
                    <p className="text-[#B8B8C2] text-xs mb-3">
                      Permanently delete your account and all data
                    </p>
                    <button className="w-full border border-red-500/50 text-red-400 hover:bg-red-500/10 py-2 rounded-lg text-xs font-semibold transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;