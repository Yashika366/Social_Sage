import { motion } from "framer-motion";
// Icons representing each of the 3 steps
import { HiOutlineLink, HiOutlineCpuChip, HiOutlineRocketLaunch } from "react-icons/hi2";

const HowItWorks = () => {
  // 3 steps stored as data, same array+map pattern as before
  const steps = [
    {
      number: "01",
      icon: <HiOutlineLink />,
      title: "Connect Your Channel",
      description: "Link your YouTube channel in seconds. We pull your public stats securely — no passwords needed.",
    },
    {
      number: "02",
      icon: <HiOutlineCpuChip />,
      title: "AI Analyzes Everything",
      description: "Our AI studies your uploads, engagement, branding, and audience behavior to find what's holding you back.",
    },
    {
      number: "03",
      icon: <HiOutlineRocketLaunch />,
      title: "Get Your Action Plan",
      description: "Receive a personalized growth plan — what to post, when to post, and what to fix first.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#16213E]">
      {/* bg-[#16213E] instead of #1A1A2E - alternating section backgrounds creates visual separation 
          without needing harsh dividing lines between every section */}
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER - same centered pattern as Features, keeps rhythm consistent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-block bg-[#1A1A2E] border border-[#2A3555] text-[#E94560] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F9F9F9] mb-4">
            Three steps to smarter growth
          </h2>
          <p className="text-[#B8B8C2] text-lg">
            No complicated setup. Connect, analyze, and grow.
          </p>
        </motion.div>

        {/* STEPS CONTAINER */}
        {/* relative = needed so the connecting line (positioned absolute) lines up correctly inside this container */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* CONNECTING LINE - a thin horizontal line behind the steps, only visible on desktop (hidden md:block) */}
          {/* top-12 = aligns roughly with the center of the icon circles below */}
          {/* left-0 right-0 = spans full width of the container */}
          {/* z-0 vs steps having z-10 = ensures the line sits BEHIND the step circles, not on top */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-[#2A3555] z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              // relative z-10 = lifts each step above the connecting line drawn behind it
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* ICON CIRCLE - the node that sits "on" the connecting line */}
              {/* bg-[#16213E] matches the section background, so the line behind appears to pass INTO the circle, not under a mismatched box */}
              {/* border-2 border-[#E94560] = accent ring around the icon, makes each step feel like a marked point on a path */}
              <div className="w-24 h-24 rounded-full bg-[#16213E] border-2 border-[#E94560] flex items-center justify-center text-[#E94560] text-3xl mb-6">
                {step.icon}
              </div>

              {/* STEP NUMBER - small muted label above the title */}
              <span className="text-sm font-semibold text-[#E94560] mb-2">
                STEP {step.number}
              </span>

              <h3 className="text-xl font-semibold text-[#F9F9F9] mb-3">
                {step.title}
              </h3>
              <p className="text-[#B8B8C2] text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;