import { motion } from 'framer-motion';
import { HiTrendingUp, HiUsers, HiEye } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className='relative pt-32 pb-20 min-h-screen overflow-hidden bg-[#202020] flex items-center'>

      <div className='absolute top-1/4 right-1/4 w-96 h-96 bg-[#C0FF3D] opacity-5 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#CBC3E3] opacity-10 rounded-full blur-3xl pointer-events-none' />

      <div className='relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center'>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          <span className='inline-block bg-[#C0FF3D]/10 border border-[#C0FF3D]/30 text-[#C0FF3D] text-sm font-semibold px-4 py-1.5 rounded-full mb-6'>
            AI-Powered Growth Intelligence
          </span>

          <h1 className='text-4xl md:text-6xl font-bold text-white leading-tight mb-6'>
            Know exactly why
            <br />
            <span className='text-[#C0FF3D]'>your channel</span>
            <br />
            isn't growing
          </h1>

          <p className='text-lg text-white/60 mb-8 max-w-lg leading-relaxed'>
            SocialSage analyzes your YouTube performance with AI and tells you exactly what to fix, what to post next, and how to grow faster.
          </p>

          <div className='flex flex-wrap gap-4'>
            <button onClick={() => navigate('/login?tab=signup')} className='bg-[#C0FF3D] hover:bg-[#aaee2a] text-[#202020] px-7 py-3 rounded-xl font-bold transition-colors duration-200 shadow-lg shadow-[#C0FF3D]/20'>
              Get Started Free
            </button>
            <button onClick={() => { const el = document.getElementById('demo'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }} className='border border-white/20 hover:border-[#C0FF3D]/50 text-white px-7 py-3 rounded-xl font-semibold transition-colors duration-200'>
              Watch Demo
            </button>
          </div>

          <p className='text-sm text-white/40 mt-6'>
            No credit card required · Free analysis for your first channel
          </p>

          <div className='flex items-center gap-8 mt-10'>
            {[
              { value: '10K+', label: 'Creators' },
              { value: '500K+', label: 'Videos Analyzed' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className='text-2xl font-bold text-[#C0FF3D]'>{stat.value}</p>
                <p className='text-sm text-white/50'>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className='relative'>

          <div className='bg-[#2a2a2a] border border-white/10 rounded-2xl shadow-2xl p-6 hover:border-[#C0FF3D]/20 transition-colors duration-500'>

            <div className='flex items-center justify-between mb-6'>
              <span className='text-white font-semibold'>Channel Overview</span>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 bg-[#C0FF3D] rounded-full animate-pulse' />
                <span className='text-xs text-white/50'>Live</span>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-3 mb-6'>
              {[
                { icon: <HiUsers />, label: 'Subscribers', value: '12.4K' },
                { icon: <HiEye />, label: 'Views', value: '284K' },
                { icon: <HiTrendingUp />, label: 'Growth', value: '+18%' },
              ].map((stat) => (
                <div key={stat.label} className='bg-[#202020] border border-white/10 rounded-xl p-4 text-center'>
                  <div className='text-[#C0FF3D] text-xl mb-2 flex justify-center'>{stat.icon}</div>
                  <p className='text-white font-bold text-lg'>{stat.value}</p>
                  <p className='text-white/50 text-xs'>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className='flex items-end gap-2 h-24 mb-6'>
              {[40, 65, 45, 80, 60, 95, 70].map((height, i) => (
                <div key={i} className='flex-1 rounded-t-md' style={{ height: height + '%', backgroundColor: i === 5 ? '#C0FF3D' : '#CBC3E3', opacity: i === 5 ? 1 : 0.4 }} />
              ))}
            </div>

            <div className='bg-[#C0FF3D]/10 border border-[#C0FF3D]/20 rounded-xl p-3'>
              <p className='text-sm text-white'>
                AI Insight: Posting at 6PM increases your engagement by 23%
              </p>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className='absolute -bottom-4 -left-4 bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 shadow-xl'>
            <p className='text-xs text-white/50'>Growth Score</p>
            <p className='text-xl font-bold text-[#C0FF3D]'>74/100</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className='absolute -top-4 -right-4 bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 shadow-xl'>
            <p className='text-xs text-white/50'>AI Recommendations</p>
            <p className='text-xl font-bold text-[#CBC3E3]'>3 Ready</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;