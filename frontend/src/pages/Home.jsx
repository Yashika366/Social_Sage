// Import each section component from where it lives
import Hero from "../components/home/Hero";
import TrustedBy from "../components/home/TrustedBy";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import DemoDashboard from "../components/home/DemoDashboard";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";

const Home = () => {
  return (
    // No extra wrapper div needed here since each section already has its own <section> tag
    // React Fragment <> </> groups multiple elements without adding an extra HTML node
    <>
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <DemoDashboard />
      <Testimonials />
      <FAQ/>
      {/* Next sections (DemoDashboard, Testimonials, FAQ) will be added here in this same order */}
    </>
  );
};

export default Home;