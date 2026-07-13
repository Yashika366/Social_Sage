import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', path: '/#features' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Pricing', path: '/#pricing' },
  ];

  const goToLogin = () => navigate('/login?tab=login');
  const goToSignup = () => navigate('/login?tab=signup');

  const navClass = scrolled
    ? 'fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#202020]/95 backdrop-blur-md border-b border-white/10'
    : 'fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#202020]';

  return (
    <nav className={navClass}>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>

        <Link to='/' className='text-2xl font-bold text-white'>
          Social<span className='text-[#C0FF3D]'>Sage</span>
        </Link>

        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <a key={link.name} href={link.path} className='text-white/70 hover:text-white font-medium transition-colors duration-200'>
              {link.name}
            </a>
          ))}
        </div>

        <div className='hidden md:flex items-center gap-3'>
          <button onClick={goToLogin} className='text-white/70 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'>
            Log In
          </button>
          <button onClick={goToSignup} className='bg-[#C0FF3D] hover:bg-[#aaee2a] text-[#202020] px-5 py-2 rounded-lg font-bold transition-colors duration-200'>
            Get Started
          </button>
        </div>

        <button className='md:hidden text-white text-2xl' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className='md:hidden bg-[#202020] px-6 py-4 flex flex-col gap-4 border-t border-white/10'>
          {navLinks.map((link) => (
            <a key={link.name} href={link.path} className='text-white/70 font-medium' onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <button onClick={() => { setIsOpen(false); goToLogin(); }} className='border border-white/20 text-white text-center py-2 rounded-lg font-medium'>
            Log In
          </button>
          <button onClick={() => { setIsOpen(false); goToSignup(); }} className='bg-[#C0FF3D] text-[#202020] text-center py-2 rounded-lg font-bold'>
            Get Started Free
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;