import { motion } from "framer-motion";
// Icons for the fake sidebar/dashboard content
import { HiOutlineHome, HiOutlineChartBar, HiOutlineCog, HiOutlineUsers } from "react-icons/hi";
import { HiOutlineSparkles } from "react-icons/hi2";

const DemoDashboard = () => {
  // Fake sidebar nav items - just for visual decoration inside the mockup, not real links
  const sidebarItems = [
    { icon: <HiOutlineHome />, active: true },
    { icon: <HiOutlineChartBar />, active: false },
    { icon: <HiOutlineUsers />, active: false },
    { icon: <HiOutlineCog />, active: false },
  ];

  // Fake AI recommendation cards shown inside the mockup - same data+map pattern as before
  const insights = [
    { title: "Upload Consistency", score: "72%", color: "#E94560" },
    { title: "Engagement Rate", score: "8.4%", color: "#4ADE80" }, // green for a "good" metric, breaks visual monotony
    { title: "Branding Score", score: "61%", color: "#FBBF24" }, // amber for a "needs work" metric
  ];

  return (
    // id="demo" matches the Hero's "Watch Demo" button href="/#demo"
    <section id="demo" className="py-24 bg-[#1A1A2E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER - same centered pattern as Features/HowItWorks for consistency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block bg-[#16213E] border border-[#2A3555] text-[#E94560] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            See It In Action
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9] mb-4">
            Your growth, visualized
          </h2>
          <p className="text-[#B8B8C2] text-lg">
            A real look at the dashboard you'll use to track and grow your channel.
          </p>
        </motion.div>

        {/* BROWSER-FRAME MOCKUP WRAPPER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          // max-w-5xl mx-auto = constrains width so this big mockup doesn't stretch edge-to-edge on huge screens
          // shadow-2xl = strong drop shadow gives it weight, makes it feel like a "real" floating window
          className="max-w-5xl mx-auto bg-[#16213E] border border-[#2A3555] rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* FAKE BROWSER TOP BAR - the 3 colored dots + fake URL bar, makes this read as "a real app screenshot" */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0F1729] border-b border-[#2A3555]">
            {/* 3 traffic-light dots, classic macOS window styling */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            {/* Fake URL bar - centered, just text in a rounded box, not a real input */}
            <div className="flex-1 flex justify-center">
              <span className="bg-[#1A1A2E] text-[#B8B8C2] text-xs px-4 py-1 rounded-md">
                app.socialsage.ai/dashboard
              </span>
            </div>
          </div>

          {/* DASHBOARD BODY - flex row: fake sidebar on the left, main content on the right */}
          <div className="flex">
            
            {/* FAKE SIDEBAR */}
            {/* hidden sm:flex = sidebar only shows on slightly larger screens, keeps mobile mockup clean */}
            <div className="hidden sm:flex flex-col items-center gap-4 w-16 py-6 bg-[#0F1729] border-r border-[#2A3555]">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  // Conditionally style the "active" icon differently from inactive ones
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors ${
                    item.active
                      ? "bg-[#E94560]/20 text-[#E94560]" // active state: tinted background + accent icon color
                      : "text-[#B8B8C2] hover:text-[#F9F9F9]" // inactive: muted, brightens on hover
                  }`}
                >
                  {item.icon}
                </div>
              ))}
            </div>

            {/* MAIN DASHBOARD CONTENT */}
            <div className="flex-1 p-6 md:p-8">
              
              {/* TOP ROW: greeting + AI badge */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[#F9F9F9] font-semibold text-lg">Welcome back, Alex 👋</h3>
                  <p className="text-[#B8B8C2] text-sm">Here's how your channel is performing</p>
                </div>
                {/* small "AI Powered" badge - reinforces brand positioning even inside the mockup */}
                <div className="hidden sm:flex items-center gap-1.5 bg-[#E94560]/10 border border-[#E94560]/30 px-3 py-1.5 rounded-full">
                  <HiOutlineSparkles className="text-[#E94560]" />
                  <span className="text-xs text-[#E94560] font-medium">AI Powered</span>
                </div>
              </div>

              {/* INSIGHT SCORE CARDS - mapped from the insights array defined above */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {insights.map((insight) => (
                  <div
                    key={insight.title}
                    className="bg-[#1A1A2E] border border-[#2A3555] rounded-xl p-4"
                  >
                    <p className="text-[#B8B8C2] text-xs mb-2">{insight.title}</p>
                    {/* style={{ color: insight.color }} - inline style needed since color is DYNAMIC (different per card),
                        and Tailwind can't generate classes for values that only exist at runtime */}
                    <p className="text-2xl font-bold" style={{ color: insight.color }}>
                      {insight.score}
                    </p>
                    {/* Mini progress bar under each score - visually ties the number to a fill amount */}
                    <div className="w-full h-1.5 bg-[#2A3555] rounded-full mt-3 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: insight.score, backgroundColor: insight.color }}
                        // width: insight.score works here because score happens to be a percentage string like "72%"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI RECOMMENDATION BANNER - bigger, more detailed version of the one used in Hero */}
              <div className="bg-gradient-to-r from-[#E94560]/15 to-transparent border border-[#E94560]/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiOutlineSparkles className="text-[#E94560] text-xl mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[#F9F9F9] font-medium text-sm mb-1">
                      Recommended Action
                    </p>
                    <p className="text-[#B8B8C2] text-sm">
                      Your branding score is low. Adding a consistent intro and end
                      screen could improve viewer retention by up to 15%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoDashboard;