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
  HiOutlineVideoCamera,
  HiOutlineSearch,
} from "react-icons/hi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useChannelAnalysis from "../hooks/useChannelAnalysis";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("overview");

  // channelInput = what the user types in the search box
  const [channelInput, setChannelInput] = useState("");

  // Pull everything we need from our custom hook
  const { channel, analysis, loading, error, analyzeChannel } =
    useChannelAnalysis();

  const sidebarLinks = [
    { id: "overview", icon: <HiOutlineHome />, label: "Overview" },
    { id: "analytics", icon: <HiOutlineChartBar />, label: "Analytics" },
    { id: "audience", icon: <HiOutlineUsers />, label: "Audience" },
    { id: "settings", icon: <HiOutlineCog />, label: "Settings" },
  ];

  // Called when user clicks "Analyze" button
  const handleAnalyze = () => {
    // trim() removes leading/trailing whitespace
    if (channelInput.trim()) {
      analyzeChannel(channelInput.trim());
    }
  };

  // Called when user presses Enter in the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  // Priority color mapping for recommendation cards
  const priorityColors = {
    High: "#E94560",
    Medium: "#FBBF24",
    Low: "#4ADE80",
  };

  return (
    <div className="h-screen bg-[#1A1A2E] flex overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 h-full bg-[#0F1729] border-r border-[#2A3555] flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2 px-6 py-5 border-b border-[#2A3555]">
          <HiOutlineSparkles className="text-[#E94560] text-xl" />
          <Link to="/" className="text-xl font-bold text-[#F9F9F9]">
            Social<span className="text-[#E94560]">Sage</span>
          </Link>
        </div>

        {/* Show channel info if analysis has been done */}
        {channel ? (
          <div className="mx-4 mt-4 p-3 bg-[#16213E] border border-[#2A3555] rounded-xl">
            <div className="flex items-center gap-3">
              {/* Show channel thumbnail if available */}
              {channel.thumbnail ? (
                <img
                  src={channel.thumbnail}
                  alt={channel.title}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#E94560] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {channel.title?.[0] || "?"}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-[#F9F9F9] text-sm font-medium truncate">
                  {channel.title}
                </p>
                <p className="text-[#B8B8C2] text-xs">
                  {channel.subscriber_count?.toLocaleString()} subscribers
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Show placeholder if no channel analyzed yet
          <div className="mx-4 mt-4 p-3 bg-[#16213E] border border-dashed border-[#2A3555] rounded-xl">
            <p className="text-[#B8B8C2] text-xs text-center">
              No channel connected yet
            </p>
          </div>
        )}

        <nav className="flex-1 px-4 mt-6 flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activePage === link.id
                  ? "bg-[#E94560]/15 text-[#E94560] border border-[#E94560]/30"
                  : "text-[#B8B8C2] hover:bg-[#16213E] hover:text-[#F9F9F9]"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </button>
          ))}
        </nav>

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

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">

        {/* TOP HEADER */}
        <div className="sticky top-0 z-10 bg-[#1A1A2E]/80 backdrop-blur-md border-b border-[#2A3555] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[#F9F9F9] font-bold text-xl">
              Dashboard Overview
            </h1>
            <p className="text-[#B8B8C2] text-sm">
              {channel
                ? `Analyzing: ${channel.title}`
                : "Enter a channel ID to get started"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-[#B8B8C2] hover:text-[#F9F9F9] text-xl transition-colors">
              <HiOutlineBell />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E94560] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#E94560] flex items-center justify-center text-white text-sm font-bold">
              U
            </div>
          </div>
        </div>

        <div className="p-8">

          {/* CHANNEL INPUT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 bg-[#16213E] border border-[#2A3555] rounded-2xl p-6"
          >
            <h2 className="text-[#F9F9F9] font-semibold mb-2">
              Analyze a YouTube Channel
            </h2>
            <p className="text-[#B8B8C2] text-sm mb-4">
              Enter a YouTube Channel ID (starts with UC...) to get AI-powered
              growth insights.
            </p>

            {/* INPUT + BUTTON ROW */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8C2]" />
                <input
                  type="text"
                  value={channelInput}
                  onChange={(e) => setChannelInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. UCX6OQ3DkcsbYNE6H8uQQuVA"
                  className="w-full bg-[#1A1A2E] border border-[#2A3555] focus:border-[#E94560] text-[#F9F9F9] placeholder-[#B8B8C2]/50 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200"
                />
              </div>
              <button
                onClick={handleAnalyze}
                disabled={loading || !channelInput.trim()}
                className="bg-[#E94560] hover:bg-[#d63a52] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <HiOutlineSparkles />
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            {/* EXAMPLE CHANNEL IDS */}
            <p className="text-[#B8B8C2] text-xs mt-3">
              Try MrBeast:{" "}
              <button
                onClick={() => {
                  setChannelInput("UCX6OQ3DkcsbYNE6H8uQQuVA");
                  analyzeChannel("UCX6OQ3DkcsbYNE6H8uQQuVA");
                }}
                className="text-[#E94560] hover:underline"
              >
                UCX6OQ3DkcsbYNE6H8uQQuVA
              </button>
            </p>

            {/* ERROR STATE */}
            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* LOADING STATE */}
            {loading && (
              <div className="mt-4 flex items-center gap-3">
                {/* Simple animated loading dots */}
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-[#E94560] rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="text-[#B8B8C2] text-sm">
                  Fetching data and running analysis...
                </p>
              </div>
            )}
          </motion.div>

          {/* RESULTS - only show when analysis is available */}
          {analysis && channel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    label: "Subscribers",
                    value: channel.subscriber_count?.toLocaleString(),
                    icon: <HiOutlineUsers />,
                  },
                  {
                    label: "Total Views",
                    value: channel.view_count?.toLocaleString(),
                    icon: <HiOutlineEye />,
                  },
                  {
                    label: "Total Videos",
                    value: channel.video_count?.toLocaleString(),
                    icon: <HiOutlineVideoCamera />,
                  },
                  {
                    label: "Growth Score",
                    // analysis.growth_score comes from our AI service
                    value: `${analysis.growth_score}/100`,
                    icon: <HiOutlineTrendingUp />,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-[#16213E] border border-[#2A3555] rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[#B8B8C2] text-sm">{stat.label}</p>
                      <span className="text-[#E94560] text-lg">{stat.icon}</span>
                    </div>
                    <p className="text-[#F9F9F9] text-2xl font-bold">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* SUMMARY + RECOMMENDATIONS ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                {/* SUMMARY CARD - takes 2/3 width */}
                <div className="lg:col-span-2 bg-[#16213E] border border-[#2A3555] rounded-2xl p-6">
                  <h3 className="text-[#F9F9F9] font-semibold mb-3">
                    Channel Summary
                  </h3>
                  <p className="text-[#B8B8C2] text-sm leading-relaxed mb-5">
                    {analysis.summary}
                  </p>

                  {/* STRENGTHS + WEAKNESSES side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-green-400 text-sm font-medium mb-2">
                        ✅ Strengths
                      </p>
                      {analysis.strengths?.map((s, i) => (
                        <p key={i} className="text-[#B8B8C2] text-xs mb-1">
                          • {s}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-red-400 text-sm font-medium mb-2">
                        ⚠️ Weaknesses
                      </p>
                      {analysis.weaknesses?.map((w, i) => (
                        <p key={i} className="text-[#B8B8C2] text-xs mb-1">
                          • {w}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CONTENT STRATEGY CARD - takes 1/3 width */}
                <div className="bg-[#16213E] border border-[#2A3555] rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <HiOutlineSparkles className="text-[#E94560]" />
                    <h3 className="text-[#F9F9F9] font-semibold">
                      Content Strategy
                    </h3>
                  </div>
                  <p className="text-[#B8B8C2] text-sm leading-relaxed mb-4">
                    {analysis.content_strategy}
                  </p>
                  <div className="bg-[#E94560]/10 border border-[#E94560]/30 rounded-xl p-3">
                    <p className="text-xs text-[#E94560] font-medium mb-1">
                      Upload Frequency
                    </p>
                    <p className="text-[#B8B8C2] text-xs">
                      {analysis.upload_frequency_advice}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI RECOMMENDATIONS */}
              <div className="bg-[#16213E] border border-[#2A3555] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <HiOutlineSparkles className="text-[#E94560]" />
                  <h3 className="text-[#F9F9F9] font-semibold">
                    AI Recommendations
                  </h3>
                  {/* Show mock badge if using mock data */}
                  {analysis.is_mock && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                      Demo Mode
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analysis.recommendations?.map((rec, index) => (
                    <div
                      key={index}
                      className="bg-[#1A1A2E] border border-[#2A3555] rounded-xl p-4"
                    >
                      {/* Priority badge */}
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block"
                        style={{
                          color: priorityColors[rec.priority],
                          backgroundColor: `${priorityColors[rec.priority]}20`,
                          border: `1px solid ${priorityColors[rec.priority]}40`,
                        }}
                      >
                        {rec.priority} Priority
                      </span>
                      <h4 className="text-[#F9F9F9] text-sm font-semibold mb-2">
                        {rec.title}
                      </h4>
                      <p className="text-[#B8B8C2] text-xs leading-relaxed mb-3">
                        {rec.description}
                      </p>
                      <p className="text-xs text-green-400">
                        📈 {rec.expected_impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* EMPTY STATE - shown when no analysis done yet */}
          {!analysis && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <HiOutlineSparkles className="text-[#E94560] text-5xl mx-auto mb-4" />
              <h3 className="text-[#F9F9F9] font-semibold text-xl mb-2">
                Ready to analyze
              </h3>
              <p className="text-[#B8B8C2]">
                Enter a YouTube channel ID above to get your AI growth report.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;