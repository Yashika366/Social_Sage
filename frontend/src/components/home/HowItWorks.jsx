import { motion } from 'framer-motion';
import { HiOutlineLink, HiOutlineChip, HiOutlinePaperAirplane } from 'react-icons/hi';

const HowItWorks = () => {
  const steps = [
    { number: '01', icon: <HiOutlineLink />, title: 'Connect Your Channel', description: 'Link your YouTube channel in seconds. We pull your public stats securely.' },
    { number: '02', icon: <HiOutlineChip />, title: 'AI Analyzes Everything', description: 'Our AI studies your uploads, engagement, branding, and audience behavior.' },
    { number: '03', icon: <HiOutlinePaperAirplane />, title: 'Get Your Action Plan', description: 'Receive a personalized growth plan — what to post, when to post, and what to fix.' },
  ];

  return (
    <section id='how-it-works' className='py-24 bg-[#202020]'>
      <div className='max-w-7xl mx-auto px-6'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className='text-center max-w-2xl mx-auto mb-20'>
          <span className='inline-block bg-[#C0FF3D]/10 border border-[#C0FF3D]/30 text-[#C0FF3D] text-sm font-bold px-4 py-1.5 rounded-full mb-4'>
            How It Works
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Three steps to smarter growth</h2>
          <p className='text-white/60 text-lg'>No complicated setup. Connect, analyze, and grow.</p>
        </motion.div>
        <div className='relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8'>
          <div className='hidden md:block absolute top-12 left-0 right-0 h-px bg-white/10 z-0' />
          {steps.map((step, index) => (
            <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }} className='relative z-10 flex flex-col items-center text-center'>
              <div className='w-24 h-24 rounded-full bg-[#202020] border-2 border-[#C0FF3D] flex items-center justify-center text-[#C0FF3D] text-3xl mb-6'>
                {step.icon}
              </div>
              <span className='text-sm font-bold text-[#C0FF3D] mb-2'>STEP {step.number}</span>
              <h3 className='text-xl font-bold text-white mb-3'>{step.title}</h3>
              <p className='text-white/50 text-sm leading-relaxed max-w-xs'>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;