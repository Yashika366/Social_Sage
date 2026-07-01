import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Chevron icon for the expand/collapse arrow
import { HiChevronDown } from "react-icons/hi";

const FAQ = () => {
  // activeIndex tracks WHICH question is currently open
  // null means none are open by default
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Is SocialSage free to use?",
      answer: "Yes — you can connect your first YouTube channel and get a full AI analysis completely free. No credit card required to get started.",
    },
    {
      question: "How does SocialSage access my YouTube data?",
      answer: "We use the official YouTube Data API. We only read public channel statistics — no passwords, no private data, no posting on your behalf.",
    },
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our recommendations are based on your real channel data combined with patterns from thousands of growing creators. The more you use SocialSage, the more personalized it gets.",
    },
    {
      question: "Which platforms does SocialSage support?",
      answer: "Currently YouTube is fully supported. Instagram, LinkedIn, X (Twitter), and TikTok are on the roadmap and coming soon.",
    },
    {
      question: "Can I connect multiple YouTube channels?",
      answer: "Yes — paid plans support multiple channels. The free plan covers one channel with full AI analysis.",
    },
    {
      question: "How often does SocialSage update my analytics?",
      answer: "Your channel data refreshes every 24 hours automatically. You can also trigger a manual refresh from your dashboard at any time.",
    },
  ];

  // This function handles opening and closing each FAQ item
  // If you click the same item that's already open, activeIndex becomes null (closes it)
  // If you click a different item, activeIndex becomes that item's index (opens it, closes the previous one)
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#1A1A2E]">
      <div className="max-w-3xl mx-auto px-6">
        {/* max-w-3xl instead of max-w-7xl - FAQ works better as a narrow centered column, easier to read */}

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#16213E] border border-[#2A3555] text-[#E94560] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9] mb-4">
            Questions we get asked a lot
          </h2>
          <p className="text-[#B8B8C2] text-lg">
            Can't find what you need? Email us at hello@socialsage.ai
          </p>
        </motion.div>

        {/* FAQ ACCORDION LIST */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              // border color changes when this item is the active one
              className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                activeIndex === index
                  ? "border-[#E94560]/50 bg-[#16213E]" // active: accent border + slightly lighter background
                  : "border-[#2A3555] bg-[#16213E]"    // inactive: standard border
              }`}
            >
              {/* QUESTION ROW - clickable, triggers toggle */}
              <button
                onClick={() => handleToggle(index)}
                // w-full = button stretches to fill the card width (buttons are inline by default, this overrides that)
                // text-left = text inside button aligns left (buttons center text by default)
                className="w-full text-left flex items-center justify-between px-6 py-5 gap-4"
              >
                <span className={`font-medium transition-colors duration-300 ${
                  activeIndex === index
                    ? "text-[#E94560]"  // active question text turns accent color
                    : "text-[#F9F9F9]" // inactive stays white
                }`}>
                  {faq.question}
                </span>

                {/* CHEVRON ICON - rotates 180deg when open, pointing up */}
                {/* rotate-180 is applied conditionally using the same activeIndex check */}
                <HiChevronDown
                  className={`text-[#E94560] text-xl flex-shrink-0 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* ANSWER - AnimatePresence lets Framer Motion animate elements that are REMOVED from the DOM */}
              {/* Without AnimatePresence, exit animations don't work because React removes the element instantly */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}   // starts collapsed and invisible
                    animate={{ height: "auto", opacity: 1 }} // expands to natural height
                    exit={{ height: 0, opacity: 0 }}      // collapses back when closed
                    // exit = what happens when this element is REMOVED from the tree (accordion closes)
                    // this is why AnimatePresence is needed - it intercepts the removal and plays exit first
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden" // clips the content while height animates, prevents text spilling out mid-animation
                  >
                    <p className="text-[#B8B8C2] text-sm leading-relaxed px-6 pb-5">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;