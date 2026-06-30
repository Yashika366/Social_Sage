import { motion } from "framer-motion";
// Icons for each feature card - pick ones that visually match the concept
import { HiOutlineChartBar, HiOutlineLightBulb, HiOutlineSparkles, HiOutlineDocumentReport } from "react-icons/hi";

const Features = () => {
  // Storing all 4 features as data - icon, title, description
  // This is the same "map over an array" pattern from Navbar links and Hero stat cards
  const features = [
    {
      icon: <HiOutlineSparkles />,
      title: "AI Analysis",
      description: "Get a deep AI breakdown of your channel's strengths, weaknesses, and growth blockers — not just raw numbers.",
    },
    {
      icon: <HiOutlineChartBar />,
      title: "Growth Insights",
      description: "Understand exactly which factors are slowing your growth and what to prioritize fixing first.",
    },
    {
      icon: <HiOutlineLightBulb />,
      title: "Content Strategy",
      description: "Receive personalized video ideas and posting strategies based on what's actually working for you.",
    },
    {
      icon: <HiOutlineDocumentReport />,
      title: "Performance Dashboard",
      description: "Track your growth score, consistency, and audience insights in one clean, focused view.",
    },
  ];

  return (
    // id="features" lets the Navbar's href="/#features" scroll directly here
    <section id="features" className="py-24 bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER - centered intro text above the grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} // animates in when scrolled into view, same pattern as TrustedBy
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          {/* Small pill label - consistent with the one used in Hero, builds visual rhythm across sections */}
          <span className="inline-block bg-[#16213E] border border-[#2A3555] text-[#E94560] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Why SocialSage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9] mb-4">
            Everything you need to grow smarter
          </h2>
          <p className="text-[#B8B8C2] text-lg">
            Stop guessing what works. Let AI tell you exactly what to do next.
          </p>
        </motion.div>

        {/* FEATURE CARDS GRID */}
        {/* grid-cols-1 on mobile (stacked), md:grid-cols-2 (2 per row on tablets), lg:grid-cols-4 (all 4 in one row on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // delay * index = each card animates slightly AFTER the previous one (staggered entrance)
              // card 0 delays 0s, card 1 delays 0.1s, card 2 delays 0.2s, etc.
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // group = Tailwind's way to let a CHILD element react to hovering the PARENT
              // hover:-translate-y-1 = lifts the whole card up slightly on hover
              // hover:border-[#E94560]/50 = border tints toward accent color on hover
              className="group bg-[#16213E] border border-[#2A3555] rounded-2xl p-6 hover:-translate-y-1 hover:border-[#E94560]/50 transition-all duration-300"
            >
              {/* ICON CONTAINER - small rounded box behind the icon, accent-tinted background */}
              {/* group-hover:bg-[#E94560]/20 = since parent has 'group', this reacts when the CARD (not just the icon) is hovered */}
              <div className="w-12 h-12 rounded-xl bg-[#E94560]/10 group-hover:bg-[#E94560]/20 flex items-center justify-center text-[#E94560] text-2xl mb-5 transition-colors duration-300">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-[#F9F9F9] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#B8B8C2] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;