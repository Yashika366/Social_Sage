// No motion needed for individual logos, but we'll fade in the whole row once when it scrolls into view
import { motion } from "framer-motion";

const TrustedBy = () => {
  // Array of fake/placeholder brand names - replace these with real logos later (as image imports)
  // For now using text as placeholders so you can see the layout without needing actual logo files
  const brands = ["Creatorly", "Studio91", "ViewForge", "NextWave", "PixelPlay", "StreamHub"];

  return (
    // py-12 = vertical padding only, keeps this section compact and "quiet"
    // border-y = thin horizontal lines top and bottom, visually separates this strip from Hero above and Features below
    <section className="py-12 border-y border-[#2A3555] bg-[#1A1A2E]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SMALL LABEL ABOVE LOGOS - sets context without shouting */}
        <p className="text-center text-sm text-[#B8B8C2] mb-8 uppercase tracking-wider">
          Trusted by creators growing on YouTube
        </p>

        {/* LOGO ROW */}
        {/* flex-wrap = if screen is too narrow, logos wrap to next line instead of overflowing */}
        {/* justify-center + justify-between on larger screens via md: could be added, but center keeps it simple */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }} // whileInView = animate ONLY when this element scrolls into the viewport (not on page load)
          viewport={{ once: true }} // once: true = only play this animation the first time, not every time user scrolls past it
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {/* Mapping over the brands array - same pattern as nav links and stat cards before */}
          {brands.map((brand) => (
            <span
              key={brand}
              // text-[#B8B8C2]/40 = muted color at 40% opacity - makes logos feel deliberately faded
              // hover:opacity-100 + hover:text-[#F9F9F9] = brightens fully on hover, inviting interaction
              // transition-all duration-300 = smooth brightening instead of an abrupt snap
              className="text-lg font-semibold text-[#B8B8C2]/40 hover:opacity-100 hover:text-[#F9F9F9] transition-all duration-300 cursor-default"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;