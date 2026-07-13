import { motion } from 'framer-motion';
import { HiOutlineSparkles } from 'react-icons/hi2';

const Testimonials = () => {
  const testimonials = [
    { name: 'Riya Sharma', role: 'Tech Reviewer, 84K subs', quote: 'SocialSage told me exactly why my retention was dropping. Fixed it in one upload and views jumped 30%.', initials: 'RS', color: '#C0FF3D' },
    { name: 'Marcus Lee', role: 'Gaming Creator, 210K subs', quote: 'I used to guess what to post next. Now I just check the dashboard. It is like having a strategist on call.', initials: 'ML', color: '#CBC3E3' },
    { name: 'Priya Nair', role: 'Lifestyle Vlogger, 45K subs', quote: 'The branding feedback alone was worth it. My channel finally looks consistent across every video.', initials: 'PN', color: '#C0FF3D' },
  ];

  return (
    <section className='py-24 bg-[#202020]'>
      <div className='max-w-7xl mx-auto px-6'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className='text-center max-w-2xl mx-auto mb-16'>
          <span className='inline-block bg-[#C0FF3D]/10 border border-[#C0FF3D]/30 text-[#C0FF3D] text-sm font-bold px-4 py-1.5 rounded-full mb-4'>
            Loved by Creators
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Creators are growing faster</h2>
          <p className='text-white/60 text-lg'>Real results from creators using SocialSage every day.</p>
        </motion.div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((t, index) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className='bg-[#2a2a2a] border border-white/10 rounded-2xl p-6 flex flex-col hover:border-[#C0FF3D]/20 transition-colors duration-300'>
              <HiOutlineSparkles className='text-[#C0FF3D] text-2xl mb-4' />
              <p className='text-white/70 text-sm leading-relaxed mb-6 flex-1'>{t.quote}</p>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#202020] flex-shrink-0' style={{ backgroundColor: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <p className='text-white text-sm font-medium'>{t.name}</p>
                  <p className='text-white/40 text-xs'>{t.role}</p>
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