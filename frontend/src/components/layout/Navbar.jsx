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
    ? 'fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#1A1A2E] backdrop-blur-md border-b border-[#2A3555]'
    : 'fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent';

  return (
    <nav className={navClass}>
      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        <Link to='/' className='text-2xl font-bold text-[#F9F9F9]'>
          Social<span className='text-[#E94560]'>Sage</span>
        </Link>
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <a key={link.name} href={link.path} className='text-[#B8B8C2] hover:text-[#F9F9F9] transition-colors duration-200'>
              {link.name}
            </a>
          ))}
        </div>
        <div className='hidden md:flex items-center gap-3'>
          <button onClick={goToLogin} className='text-[#B8B8C2] hover:text-[#F9F9F9] px-4 py-2 rounded-lg font-medium transition-colors duration-200'>
            Log In
          </button>
          <button onClick={goToSignup} className='bg-[#E94560] hover:bg-[#d63a52] text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200'>
            Get Started
          </button>
        </div>
        <button className='md:hidden text-[#F9F9F9] text-2xl' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className='md:hidden bg-[#16213E] px-6 py-4 flex flex-col gap-4'>
          {navLinks.map((link) => (
            <a key={link.name} href={link.path} className='text-[#B8B8C2]' onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <button onClick={() => { setIsOpen(false); goToLogin(); }} className='border border-[#2A3555] text-[#F9F9F9] text-center py-2 rounded-lg'>
            Log In
          </button>
          <button onClick={() => { setIsOpen(false); goToSignup(); }} className='bg-[#E94560] text-white text-center py-2 rounded-lg'>
            Get Started Free
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;