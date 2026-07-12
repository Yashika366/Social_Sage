import { motion } from "framer-motion";
import { HiTrendingUp, HiUsers, HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative pt-32 pb-20 min-h-screen overflow-hidden bg-[#1A1A2E] flex items-center">

      {/* BACKGROUND GLOW BLOBS */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E94560] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0F3460] opacity-30 rounded-full blur-3xl pointer-events-none" />

      {/* CONTENT WRAPPER */}
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* ============ LEFT COLUMN ============ */}
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6 }}
        >
          {/* PILL LABEL */}
          <span className="inline-block bg-[#16213E] border border-[#2A3555] text-[#E94560] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🚀 AI-Powered Growth Intelligence
          </span>

          {/* HEADLINE */}
          <h1 className="text-4xl md:text-6xl font-bold text-[#F9F9F9] leading-tight mb-6">
            Know exactly why{" "}
            <span className="text-[#E94560]">your channel</span>{" "}
            isn't growing
          </h1>

          {/* SUBHEADLINE */}
          <p className="text-lg text-[#B8B8C2] mb-8 max-w-lg">
            SocialSage analyzes your YouTube performance with AI and tells you
            exactly what to fix, what to post next, and how to grow faster —
            no more guessing from raw numbers.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap gap-4">
            {/* PRIMARY CTA - goes to signup tab */}
            <button
              onClick={() => navigate("/login?tab=signup")}
              className="bg-[#E94560] hover:bg-[#d63a52] text-white px-7 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Started Free
            </button>

            {/* SECONDARY CTA - scrolls to demo section */}
            <button
              onClick={() => {
                const demo = document.getElementById("demo");
                if (demo) demo.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-[#2A3555] hover:border-[#E94560] text-[#F9F9F9] px-7 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Watch Demo
            </button>
          </div>

          {/* SOCIAL PROOF */}
          <p className="text-sm text-[#B8B8C2] mt-6">
            No credit card required · Free analysis for your first channel
          </p>
        </motion.div>

        {/* ============ RIGHT COLUMN: DASHBOARD MOCKUP ============ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* GLASS CARD */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 rotate-2 hover:rotate-0 transition-transform duration-500">

            {/* MOCKUP HEADER */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[#F9F9F9] font-semibold">
                Channel Overview
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-[#B8B8C2]">Live</span>
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: <HiUsers />, label: "Subscribers", value: "12.4K" },
                { icon: <HiEye />, label: "Views", value: "284K" },
                { icon: <HiTrendingUp />, label: "Growth", value: "+18%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#16213E] border border-[#2A3555] rounded-xl p-4 text-center"
                >
                  <div className="text-[#E94560] text-xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-[#F9F9F9] font-bold text-lg">
                    {stat.value}
                  </p>
                  <p className="text-[#B8B8C2] text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* FAKE CHART */}
            <div className="flex items-end gap-2 h-24">
              {[40, 65, 45, 80, 60, 95, 70].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#E94560] to-[#0F3460] rounded-t-md"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            {/* AI INSIGHT BANNER */}
            <div className="mt-6 bg-[#E94560]/10 border border-[#E94560]/30 rounded-xl p-3">
              <p className="text-sm text-[#F9F9F9]">
                💡 <span className="font-medium">AI Insight:</span> Posting
                at 6PM increases your engagement by 23%
              </p>
            </div>
          </div>

          {/* FLOATING BADGE - extra decoration outside the card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-4 -left-4 bg-[#16213E] border border-[#2A3555] rounded-xl px-4 py-3 shadow-xl"
          >
            <p className="text-xs text-[#B8B8C2]">Growth Score</p>
            <p className="text-xl font-bold text-[#E94560]">74/100</p>
          </motion.div>

          {/* FLOATING BADGE 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -top-4 -right-4 bg-[#16213E] border border-[#2A3555] rounded-xl px-4 py-3 shadow-xl"
          >
            <p className="text-xs text-[#B8B8C2]">AI Recommendations</p>
            <p className="text-xl font-bold text-green-400">3 Ready</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;