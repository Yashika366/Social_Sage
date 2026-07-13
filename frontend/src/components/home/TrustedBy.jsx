import { motion } from 'framer-motion';

const TrustedBy = () => {
  const brands = ['Creatorly', 'Studio91', 'ViewForge', 'NextWave', 'PixelPlay', 'StreamHub'];

  return (
    <section className='py-12 bg-[#F5F5F5] border-y border-[#404040]/10'>
      <div className='max-w-7xl mx-auto px-6'>
        <p className='text-center text-sm text-[#404040]/50 mb-8 uppercase tracking-wider font-medium'>
          Trusted by creators growing on YouTube
        </p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className='flex flex-wrap items-center justify-center gap-x-12 gap-y-6'>
          {brands.map((brand) => (
            <span key={brand} className='text-lg font-bold text-[#404040]/30 hover:text-[#404040] transition-all duration-300 cursor-default'>
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;