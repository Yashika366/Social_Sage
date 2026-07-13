import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-[#202020] border-t border-white/10 py-12'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <div>
            <Link to='/' className='text-2xl font-bold text-white'>
              Social<span className='text-[#C0FF3D]'>Sage</span>
            </Link>
            <p className='text-white/40 text-sm mt-1'>AI-powered creator growth platform.</p>
          </div>
          <div className='flex items-center gap-8'>
            {['Home', 'Features', 'How It Works', 'Pricing'].map((item) => (
              <a key={item} href='#' className='text-white/50 hover:text-white text-sm transition-colors duration-200'>
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className='border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-white/30 text-sm'>2026 SocialSage. All rights reserved.</p>
          <div className='flex items-center gap-6'>
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <a key={item} href='#' className='text-white/30 hover:text-white/60 text-sm transition-colors duration-200'>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;