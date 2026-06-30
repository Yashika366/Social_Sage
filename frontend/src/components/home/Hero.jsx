import { motion } from "framer-motion";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import DashboardPreview from "./DashboardPreview";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center px-6">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#E91E63]/15 blur-3xl"></div>

      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#8D6E63]/20 blur-3xl"></div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* ================= LEFT SIDE ================= */}

        <div>

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge>
              AI-Powered Creator Growth Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-5xl md:text-7xl font-bold leading-tight"
          >
            Grow Your{" "}
            <span className="text-[var(--accent)]">
              Social Media
            </span>
            <br />
            with AI Precision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-xl text-lg leading-8 text-[var(--text-muted)]"
          >
            Analyze your YouTube, Instagram, LinkedIn and more using
            AI-powered insights that help creators grow faster and make
            smarter content decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex gap-4"
          >
            <Button size="lg">
              Get AI Insights →
            </Button>

            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </motion.div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <DashboardPreview />
        </motion.div>

      </div>

    </section>
  );
};

export default Hero;