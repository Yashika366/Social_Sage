import { motion } from 'framer-motion';
import { HiOutlineHome, HiOutlineChartBar, HiOutlineUsers, HiOutlineCog } from 'react-icons/hi';
import { HiOutlineSparkles } from 'react-icons/hi2';

const DemoDashboard = () => {
  const insights = [
    { title: 'Upload Consistency', score: '72%', color: '#C0FF3D' },
    { title: 'Engagement Rate', score: '8.4%', color: '#CBC3E3' },
    { title: 'Branding Score', score: '61%', color: '#C0FF3D' },
  ];

  return (
    <section id='demo' className='py-24 bg-[#F5F5F5]'>
      <div className='max-w-7xl mx-auto px-6'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className='text-center max-w-2xl mx-auto mb-16'>
          <span className='inline-block bg-[#C0FF3D]/20 border border-[#C0FF3D]/40 text-[#404040] text-sm font-bold px-4 py-1.5 rounded-full mb-4'>
            See It In Action
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-[#202020] mb-4'>Your growth, visualized</h2>
          <p className='text-[#404040] text-lg'>A real look at the dashboard you will use to track and grow your channel.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className='max-w-5xl mx-auto bg-[#202020] border border-white/10 rounded-2xl shadow-2xl overflow-hidden'>
          <div className='flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-white/10'>
            <div className='flex gap-1.5'>
              <span className='w-3 h-3 rounded-full bg-red-500/70' />
              <span className='w-3 h-3 rounded-full bg-yellow-500/70' />
              <span className='w-3 h-3 rounded-full bg-[#C0FF3D]/70' />
            </div>
            <div className='flex-1 flex justify-center'>
              <span className='bg-[#202020] text-white/40 text-xs px-4 py-1 rounded-md'>app.socialsage.ai/dashboard</span>
            </div>
          </div>
          <div className='flex'>
            <div className='hidden sm:flex flex-col items-center gap-4 w-16 py-6 bg-[#2a2a2a] border-r border-white/10'>
              {[<HiOutlineHome />, <HiOutlineChartBar />, <HiOutlineUsers />, <HiOutlineCog />].map((icon, i) => (
                <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors ${i === 0 ? 'bg-[#C0FF3D]/20 text-[#C0FF3D]' : 'text-white/40 hover:text-white'}`}>
                  {icon}
                </div>
              ))}
            </div>
            <div className='flex-1 p-6 md:p-8'>
              <div className='flex items-center justify-between mb-6'>
                <div>
                  <h3 className='text-white font-semibold text-lg'>Welcome back, Alex</h3>
                  <p className='text-white/40 text-sm'>Here is how your channel is performing</p>
                </div>
                <div className='hidden sm:flex items-center gap-1.5 bg-[#C0FF3D]/10 border border-[#C0FF3D]/30 px-3 py-1.5 rounded-full'>
                  <HiOutlineSparkles className='text-[#C0FF3D]' />
                  <span className='text-xs text-[#C0FF3D] font-medium'>AI Powered</span>
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                {insights.map((insight) => (
                  <div key={insight.title} className='bg-[#2a2a2a] border border-white/10 rounded-xl p-4'>
                    <p className='text-white/50 text-xs mb-2'>{insight.title}</p>
                    <p className='text-2xl font-bold' style={{ color: insight.color }}>{insight.score}</p>
                    <div className='w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden'>
                      <div className='h-full rounded-full' style={{ width: insight.score, backgroundColor: insight.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className='bg-[#C0FF3D]/10 border border-[#C0FF3D]/20 rounded-xl p-4'>
                <div className='flex items-start gap-3'>
                  <HiOutlineSparkles className='text-[#C0FF3D] text-xl mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-white font-medium text-sm mb-1'>Recommended Action</p>
                    <p className='text-white/50 text-sm'>Your branding score is low. Adding a consistent intro and end screen could improve viewer retention by up to 15%.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoDashboard;