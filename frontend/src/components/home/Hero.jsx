// motion lets us animate plain elements; useState/useEffect not needed here since this is mostly static + scroll-in animation
import { motion } from "framer-motion";
// Icons to decorate the mockup card (fake stats inside it)
import { HiTrendingUp, HiUsers, HiEye } from "react-icons/hi";
// Link for the CTA buttons that navigate to other pages
import { Link } from "react-router-dom";

const Hero = () => {
  // Reusable animation settings - defined once, applied to multiple elements
  // This avoids repeating the same object 5 times below
  const fadeUp = {
    initial: { opacity: 0, y: 30 }, // start: invisible, shifted down 30px
    animate: { opacity: 1, y: 0 },  // end: fully visible, in normal position
  };

  return (
    // <section> = semantic tag for a distinct page section
    // relative = needed so we can absolutely-position decorative background blobs inside it
    // pt-32 = top padding (extra space because Navbar is fixed/overlapping)
    // min-h-screen = section takes at least full viewport height
    // overflow-hidden = clips any background decoration that spills outside the box
    <section className="relative pt-32 pb-20 min-h-screen overflow-hidden bg-[#1A1A2E] flex items-center">
      
      {/* DECORATIVE BACKGROUND GLOW - purely visual, sits behind everything */}
      {/* absolute = positioned relative to the section, not the normal page flow */}
      {/* blur-3xl = heavy blur turns this solid circle into a soft glow */}
      {/* pointer-events-none = mouse clicks pass through it, it's just decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E94560] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0F3460] opacity-30 rounded-full blur-3xl pointer-events-none" />

      {/* CONTENT WRAPPER - constrains width, centers on page */}
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* grid md:grid-cols-2 = on medium+ screens, split into 2 equal columns. On mobile, stacks vertically (default grid-cols-1) */}

        {/* ============ LEFT COLUMN: TEXT CONTENT ============ */}
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.6 }} // animation takes 0.6 seconds
        >
          {/* SMALL PILL LABEL above the headline - common SaaS pattern */}
          <span className="inline-block bg-[#16213E] border border-[#2A3555] text-[#E94560] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🚀 AI-Powered Growth Intelligence
          </span>

          {/* MAIN HEADLINE - large, bold, tight line-height (leading-tight) for impact */}
          <h1 className="text-4xl md:text-6xl font-bold text-[#F9F9F9] leading-tight mb-6">
            Know exactly why{" "}
            {/* span with accent color highlights the key phrase within the headline */}
            <span className="text-[#E94560]">your channel</span> isn't growing
          </h1>

          {/* SUBHEADLINE - muted color, smaller, explains the value proposition in one sentence */}
          <p className="text-lg text-[#B8B8C2] mb-8 max-w-lg">
            SocialSage analyzes your YouTube performance with AI and tells you
            exactly what to fix, what to post next, and how to grow faster —
            no more guessing from raw numbers.
          </p>

          {/* CTA BUTTON GROUP */}
          <div className="flex flex-wrap gap-4">
            {/* PRIMARY CTA - solid accent background, draws the eye first */}
            <Link
              to="/login"
              className="bg-[#E94560] hover:bg-[#d63a52] text-white px-7 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get Started Free
            </Link>
            {/* SECONDARY CTA - "ghost" style: border only, transparent background */}
            <Link
              to="/#demo"
              className="border border-[#2A3555] hover:border-[#E94560] text-[#F9F9F9] px-7 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Watch Demo
            </Link>
          </div>

          {/* SOCIAL PROOF LINE - small text under buttons, builds trust */}
          <p className="text-sm text-[#B8B8C2] mt-6">
            No credit card required · Free analysis for your first channel
          </p>
        </motion.div>

        {/* ============ RIGHT COLUMN: DASHBOARD MOCKUP ============ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} // starts slightly smaller and invisible
          animate={{ opacity: 1, scale: 1 }}   // grows to full size, fades in
          transition={{ duration: 0.6, delay: 0.2 }} // delay = starts 0.2s after left column, feels sequential not simultaneous
          className="relative"
        >
          {/* GLASS CARD - the core "glassmorphism" look */}
          {/* bg-white/5 = white at 5% opacity - lets background glow show through */}
          {/* backdrop-blur-xl = blurs whatever is BEHIND this card (the glow blobs) */}
          {/* border border-white/10 = faint light border, typical of glass UI */}
          {/* shadow-2xl = large soft drop shadow, makes card feel like it's floating */}
          {/* rotate-2 = slight tilt for a dynamic, non-flat feel; hover removes tilt */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 rotate-2 hover:rotate-0 transition-transform duration-500">
            
            {/* MOCKUP HEADER - fake browser/app top bar for realism */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[#F9F9F9] font-semibold">Channel Overview</span>
              {/* fake "live" dot - small flex row with a colored circle + text */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-[#B8B8C2]">Live</span>
              </div>
            </div>

            {/* STAT CARDS GRID - 3 small cards inside the big glass card */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* We map over an array instead of writing 3 nearly-identical blocks */}
              {[
                { icon: <HiUsers />, label: "Subscribers", value: "12.4K" },
                { icon: <HiEye />, label: "Views", value: "284K" },
                { icon: <HiTrendingUp />, label: "Growth", value: "+18%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#16213E] border border-[#2A3555] rounded-xl p-4 text-center"
                >
                  {/* Icon - text-[#E94560] colors the SVG icon itself */}
                  <div className="text-[#E94560] text-xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-[#F9F9F9] font-bold text-lg">{stat.value}</p>
                  <p className="text-[#B8B8C2] text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* FAKE CHART AREA - just colored bars of varying height to suggest a graph */}
            <div className="flex items-end gap-2 h-24">
              {/* An array of heights (in %) - mapped to render bars */}
              {[40, 65, 45, 80, 60, 95, 70].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#E94560] to-[#0F3460] rounded-t-md"
                  style={{ height: `${height}%` }} // inline style needed since height is dynamic, not a fixed Tailwind class
                />
              ))}
            </div>

            {/* AI INSIGHT BANNER - small highlighted box suggesting AI commentary, ties back to product's core value */}
            <div className="mt-6 bg-[#E94560]/10 border border-[#E94560]/30 rounded-xl p-3">
              <p className="text-sm text-[#F9F9F9]">
                💡 <span className="font-medium">AI Insight:</span> Posting at 6PM
                increases your engagement by 23%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;