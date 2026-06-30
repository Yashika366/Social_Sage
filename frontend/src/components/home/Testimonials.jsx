import { motion } from "framer-motion";
// Quote icon to decorate each testimonial card
import { HiOutlineSparkles } from "react-icons/hi2";

const Testimonials = () => {
  // Testimonial data stored as an array - same map pattern used throughout this whole project
  // avatar here is just initials in a colored circle (no image files needed yet)
  const testimonials = [
    {
      name: "Riya Sharma",
      role: "Tech Reviewer, 84K subs",
      quote: "SocialSage told me exactly why my retention was dropping. Fixed it in one upload and views jumped 30%.",
      initials: "RS",
      color: "#E94560",
    },
    {
      name: "Marcus Lee",
      role: "Gaming Creator, 210K subs",
      quote: "I used to guess what to post next. Now I just check the dashboard — it's like having a strategist on call.",
      initials: "ML",
      color: "#4ADE80",
    },
    {
      name: "Priya Nair",
      role: "Lifestyle Vlogger, 45K subs",
      quote: "The branding feedback alone was worth it. My channel finally looks consistent across every video.",
      initials: "PN",
      color: "#FBBF24",
    },
  ];

  return (
    <section className="py-24 bg-[#16213E]">
      {/* alternating background again - HowItWorks was #16213E, DemoDashboard was #1A1A2E, this is #16213E - keeps the rhythm going */}
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER - consistent pattern across every section now, this repetition is intentional design, not laziness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block bg-[#1A1A2E] border border-[#2A3555] text-[#E94560] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Loved by Creators
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9] mb-4">
            Creators are growing faster
          </h2>
          <p className="text-[#B8B8C2] text-lg">
            Real results from creators using SocialSage every day.
          </p>
        </motion.div>

        {/* TESTIMONIAL CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // staggered entrance, same trick as Features cards
              className="bg-[#1A1A2E] border border-[#2A3555] rounded-2xl p-6 flex flex-col"
            >
              {/* QUOTE ICON - decorative, sits above the quote text to visually mark it as a testimonial */}
              <HiOutlineSparkles className="text-[#E94560] text-2xl mb-4" />

              {/* QUOTE TEXT - flex-1 pushes the author info below it to the bottom of the card,
                  so all 3 cards stay visually aligned even if quote lengths differ slightly */}
              <p className="text-[#F9F9F9] text-sm leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>

              {/* AUTHOR ROW - avatar circle + name + role, sits at the bottom of the card */}
              <div className="flex items-center gap-3">
                {/* AVATAR CIRCLE - background color comes from data (t.color), same inline-style reasoning as DemoDashboard */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[#F9F9F9] text-sm font-medium">{t.name}</p>
                  <p className="text-[#B8B8C2] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;