import { motion } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineLightBulb, HiOutlineSparkles, HiOutlineDocumentReport } from 'react-icons/hi';

const Features = () => {
  const features = [
    { icon: <HiOutlineSparkles />, title: 'AI Analysis', description: 'Get a deep AI breakdown of your channel strengths, weaknesses, and growth blockers.' },
    { icon: <HiOutlineChartBar />, title: 'Growth Insights', description: 'Understand exactly which factors are slowing your growth and what to prioritize.' },
    { icon: <HiOutlineLightBulb />, title: 'Content Strategy', description: 'Receive personalized video ideas and posting strategies based on what works for you.' },
    { icon: <HiOutlineDocumentReport />, title: 'Performance Dashboard', description: 'Track your growth score, consistency, and audience insights in one clean view.' },
  ];

  return (
    <section id='features' className='py-24 bg-[#F5F5F5]'>
      <div className='max-w-7xl mx-auto px-6'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className='text-center max-w-2xl mx-auto mb-16'>
          <span className='inline-block bg-[#C0FF3D]/20 border border-[#C0FF3D]/40 text-[#404040] text-sm font-bold px-4 py-1.5 rounded-full mb-4'>
            Why SocialSage
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-[#202020] mb-4'>Everything you need to grow smarter</h2>
          <p className='text-[#404040] text-lg'>Stop guessing what works. Let AI tell you exactly what to do next.</p>
        </motion.div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className='group bg-white border border-[#404040]/10 rounded-2xl p-6 hover:-translate-y-1 hover:border-[#C0FF3D]/50 hover:shadow-lg transition-all duration-300'>
              <div className='w-12 h-12 rounded-xl bg-[#C0FF3D]/20 group-hover:bg-[#C0FF3D]/30 flex items-center justify-center text-[#202020] text-2xl mb-5 transition-colors duration-300'>
                {feature.icon}
              </div>
              <h3 className='text-lg font-bold text-[#202020] mb-2'>{feature.title}</h3>
              <p className='text-[#404040] text-sm leading-relaxed'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;