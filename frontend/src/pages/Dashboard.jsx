import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineTrendingUp,
  HiOutlineEye,
  HiOutlineClock,
} from "react-icons/hi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // activePage tracks which sidebar item is selected
  const [activePage, setActivePage] = useState("overview");

  // Sidebar navigation items stored as data - same array+map pattern used throughout
  const sidebarLinks = [
    { id: "overview", icon: <HiOutlineHome />, label: "Overview" },
    { id: "analytics", icon: <HiOutlineChartBar />, label: "Analytics" },
    { id: "audience", icon: <HiOutlineUsers />, label: "Audience" },
    { id: "settings", icon: <HiOutlineCog />, label: "Settings" },
  ];

  // Fake stat cards shown at the top of the dashboard content area
  const stats = [
    {
      label: "Total Subscribers",
      value: "12,400",
      change: "+8.2%",
      positive: true,
      icon: <HiOutlineUsers />,
    },
    {
      label: "Total Views",
      value: "284,000",
      change: "+12.5%",
      positive: true,
      icon: <HiOutlineEye />,
    },
    {
      label: "Avg. Watch Time",
      value: "4m 32s",
      change: "-2.1%",
      positive: false, // negative change - we'll style this differently (red vs green)
      icon: <HiOutlineClock />,
    },
    {
      label: "Growth Score",
      value: "74/100",
      change: "+5pts",
      positive: true,
      icon: <HiOutlineTrendingUp />,
    },
  ];

  // Fake AI recommendations shown in the right panel
  const recommendations = [
    {
      priority: "High",
      title: "Improve Upload Consistency",
      description: "You haven't uploaded in 12 days. Channels that post weekly grow 3x faster.",
      color: "#E94560",
    },
    {
      priority: "Medium",
      title: "Add End Screens",
      description: "Only 2 of your last 10 videos have end screens. This is losing you subscribers.",
      color: "#FBBF24",
    },
    {
      priority: "Low",
      title: "Optimize Thumbnails",
      description: "Your click-through rate is 3.2% — adding faces to thumbnails could push it to 6%+.",
      color: "#4ADE80",
    },
  ];

  // Fake chart bars for the analytics preview
  const chartData = [
    { day: "Mon", views: 60 },
    { day: "Tue", views: 80 },
    { day: "Wed", views: 45 },
    { day: "Thu", views: 90 },
    { day: "Fri", views: 70 },
    { day: "Sat", views: 95 },
    { day: "Sun", views: 75 },
  ];

  return (
    // h-screen = full viewport height, no scrolling on the outer shell
    // overflow-hidden = the scroll happens INSIDE panels, not on the page itself
    // This is the standard layout for app dashboards (not marketing pages)
    <div className="h-screen bg-[#1A1A2E] flex overflow-hidden">

      {/* ============ SIDEBAR ============ */}
      {/* h-full = stretches full height of the parent (h-screen div) */}
      {/* flex-shrink-0 = sidebar never shrinks when main content needs more space */}
      <div className="w-64 h-full bg-[#0F1729] border-r border-[#2A3555] flex flex-col flex-shrink-0">

        {/* LOGO AREA */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-[#2A3555]">
          <HiOutlineSparkles className="text-[#E94560] text-xl" />
          <Link to="/" className="text-xl font-bold text-[#F9F9F9]">
            Social<span className="text-[#E94560]">Sage</span>
          </Link>
        </div>

        {/* CHANNEL INFO CARD - shows which channel is connected */}
        <div className="mx-4 mt-4 p-3 bg-[#16213E] border border-[#2A3555] rounded-xl">
          {/* Avatar circle with initials */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E94560] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              A
            </div>
            <div className="overflow-hidden">
              {/* truncate = cuts long channel names with ... instead of wrapping */}
              <p className="text-[#F9F9F9] text-sm font-medium truncate">Alex's Channel</p>
              <p className="text-[#B8B8C2] text-xs">12.4K subscribers</p>
            </div>
          </div>
        </div>

        {/* NAV LINKS */}
        {/* mt-6 pushes nav down from the channel card */}
        {/* flex-1 makes this section grow to fill all remaining space, pushing logout to the bottom */}
        <nav className="flex-1 px-4 mt-6 flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              // w-full text-left = makes button fill width and left-align text (buttons center by default)
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activePage === link.id
                  ? "bg-[#E94560]/15 text-[#E94560] border border-[#E94560]/30" // active: tinted bg + accent text + accent border
                  : "text-[#B8B8C2] hover:bg-[#16213E] hover:text-[#F9F9F9]"   // inactive: muted, subtle hover
              }`}
            >
              {/* Icon size controlled by text-lg on the parent span */}
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </button>
          ))}
        </nav>

        {/* LOGOUT BUTTON - pinned to the bottom because sidebar uses flex flex-col and nav has flex-1 */}
        <div className="px-4 py-4 border-t border-[#2A3555]">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#B8B8C2] hover:text-[#E94560] hover:bg-[#E94560]/10 transition-all duration-200"
          >
            <HiOutlineLogout className="text-lg" />
            Log Out
          </Link>
        </div>
      </div>

      {/* ============ MAIN CONTENT AREA ============ */}
      {/* flex-1 = takes all remaining horizontal space after sidebar */}
      {/* overflow-y-auto = only THIS panel scrolls, not the whole page */}
      {/* This keeps the sidebar fixed while content scrolls — standard dashboard UX */}
      <div className="flex-1 overflow-y-auto">

        {/* TOP NAVBAR / HEADER */}
        <div className="sticky top-0 z-10 bg-[#1A1A2E]/80 backdrop-blur-md border-b border-[#2A3555] px-8 py-4 flex items-center justify-between">
          {/* sticky top-0 = this header sticks to top of the scrollable content area (not the page) */}
          <div>
            <h1 className="text-[#F9F9F9] font-bold text-xl">Dashboard Overview</h1>
            <p className="text-[#B8B8C2] text-sm">Last updated: Today at 2:00 PM</p>
          </div>

          {/* RIGHT SIDE: notification bell + avatar */}
          <div className="flex items-center gap-4">
            {/* NOTIFICATION BELL with a red dot badge */}
            <button className="relative text-[#B8B8C2] hover:text-[#F9F9F9] text-xl transition-colors">
              <HiOutlineBell />
              {/* absolute positioned dot - sits on top-right corner of the bell icon */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E94560] rounded-full" />
            </button>

            {/* USER AVATAR */}
            <div className="w-9 h-9 rounded-full bg-[#E94560] flex items-center justify-center text-white text-sm font-bold cursor-pointer">
              A
            </div>
          </div>
        </div>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="p-8">

          {/* WELCOME BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // animate not whileInView because this is a full page, not a landing section
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-[#F9F9F9] mb-1">
              Welcome back, Alex 👋
            </h2>
            <p className="text-[#B8B8C2]">
              Here's what's happening with your channel this week.
            </p>
          </motion.div>

          {/* STAT CARDS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }} // staggered entrance
                className="bg-[#16213E] border border-[#2A3555] rounded-2xl p-5"
              >
                {/* TOP ROW: label + icon */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[#B8B8C2] text-sm">{stat.label}</p>
                  <span className="text-[#E94560] text-lg">{stat.icon}</span>
                </div>

                {/* VALUE - large bold number */}
                <p className="text-[#F9F9F9] text-2xl font-bold mb-1">{stat.value}</p>

                {/* CHANGE BADGE - green if positive, red if negative */}
                <span className={`text-xs font-medium ${
                  stat.positive ? "text-green-400" : "text-red-400"
                }`}>
                  {stat.change} this week
                </span>
              </motion.div>
            ))}
          </div>

          {/* BOTTOM ROW: Chart (left) + AI Recommendations (right) */}
          {/* grid-cols-1 on mobile, lg:grid-cols-3 on large screens - chart takes 2 cols, recommendations take 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* VIEWS CHART - takes 2/3 of the width on large screens (lg:col-span-2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 bg-[#16213E] border border-[#2A3555] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#F9F9F9] font-semibold">Views This Week</h3>
                <span className="text-xs text-[#B8B8C2] bg-[#1A1A2E] px-3 py-1 rounded-full border border-[#2A3555]">
                  Last 7 days
                </span>
              </div>

              {/* CHART BARS + DAY LABELS */}
              <div className="flex items-end gap-3 h-40 mb-2">
                {chartData.map((bar, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    {/* Bar itself - height driven by the views value as a percentage */}
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#E94560] to-[#0F3460] transition-all duration-500"
                      style={{ height: `${bar.views}%` }}
                    />
                    {/* Day label below each bar */}
                    <span className="text-[#B8B8C2] text-xs">{bar.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI RECOMMENDATIONS - takes 1/3 of the width on large screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#16213E] border border-[#2A3555] rounded-2xl p-6"
            >
              {/* HEADER */}
              <div className="flex items-center gap-2 mb-5">
                <HiOutlineSparkles className="text-[#E94560]" />
                <h3 className="text-[#F9F9F9] font-semibold">AI Recommendations</h3>
              </div>

              {/* RECOMMENDATION ITEMS */}
              <div className="flex flex-col gap-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    // border-l-2 = a left colored stripe that visually codes priority level
                    // The color comes inline from rec.color since it's dynamic data
                    className="pl-3 border-l-2"
                    style={{ borderColor: rec.color }}
                  >
                    {/* PRIORITY BADGE */}
                    <span
                      className="text-xs font-semibold"
                      style={{ color: rec.color }}
                    >
                      {rec.priority} Priority
                    </span>
                    <p className="text-[#F9F9F9] text-sm font-medium mt-0.5">{rec.title}</p>
                    <p className="text-[#B8B8C2] text-xs mt-1 leading-relaxed">{rec.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;