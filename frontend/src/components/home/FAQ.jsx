import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: 'Is SocialSage free to use?', answer: 'Yes — you can connect your first YouTube channel and get a full AI analysis completely free. No credit card required.' },
    { question: 'How does SocialSage access my YouTube data?', answer: 'We use the official YouTube Data API. We only read public channel statistics — no passwords, no private data.' },
    { question: 'How accurate are the AI recommendations?', answer: 'Our recommendations are based on your real channel data combined with patterns from thousands of growing creators.' },
    { question: 'Which platforms does SocialSage support?', answer: 'Currently YouTube is fully supported. Instagram, LinkedIn, X and TikTok are on the roadmap.' },
    { question: 'Can I connect multiple YouTube channels?', answer: 'Yes — paid plans support multiple channels. The free plan covers one channel with full AI analysis.' },
    { question: 'How often does SocialSage update my analytics?', answer: 'Your channel data refreshes every 24 hours automatically. You can also trigger a manual refresh anytime.' },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id='faq' className='py-24 bg-[#F5F5F5]'>
      <div className='max-w-3xl mx-auto px-6'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className='text-center mb-16'>
          <span className='inline-block bg-[#C0FF3D]/20 border border-[#C0FF3D]/40 text-[#404040] text-sm font-bold px-4 py-1.5 rounded-full mb-4'>FAQ</span>
          <h2 className='text-3xl md:text-4xl font-bold text-[#202020] mb-4'>Questions we get asked a lot</h2>
          <p className='text-[#404040] text-lg'>Can not find what you need? Email us at hello@socialsage.ai</p>
        </motion.div>
        <div className='flex flex-col gap-3'>
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.07 }} className={`border rounded-xl overflow-hidden transition-colors duration-300 ${activeIndex === index ? 'border-[#C0FF3D]/50 bg-white' : 'border-[#404040]/10 bg-white'}`}>
              <button onClick={() => handleToggle(index)} className='w-full text-left flex items-center justify-between px-6 py-5 gap-4'>
                <span className={`font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-[#202020]' : 'text-[#404040]'}`}>{faq.question}</span>
                <HiChevronDown className={`text-[#C0FF3D] text-xl flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className='overflow-hidden'>
                    <p className='text-[#404040] text-sm leading-relaxed px-6 pb-5'>{faq.answer}</p>
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