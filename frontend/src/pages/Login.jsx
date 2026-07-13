import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineUser } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'signup' ? 'signup' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, loading, error } = useAuth();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup' || tab === 'login') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSubmit = async () => {
    if (activeTab === 'login') {
      await login(email, password);
    } else {
      await register(name, email, password);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className='min-h-screen bg-[#202020] flex items-center justify-center relative overflow-hidden px-4'>

      <div className='absolute top-1/4 right-1/4 w-96 h-96 bg-[#C0FF3D] opacity-5 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#CBC3E3] opacity-10 rounded-full blur-3xl pointer-events-none' />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='relative w-full max-w-md bg-[#2a2a2a] border border-white/10 rounded-2xl shadow-2xl p-8'>

        <Link to='/' className='flex items-center justify-center gap-2 mb-2'>
          <span className='text-xl font-bold text-white'>Social<span className='text-[#C0FF3D]'>Sage</span></span>
        </Link>

        <p className='text-center text-white/40 text-sm mb-8'>
          {activeTab === 'login' ? 'Welcome back! Log in to your account' : 'Create your free account and start growing'}
        </p>

        <div className='flex bg-[#202020] rounded-xl p-1 mb-8'>
          {['login', 'signup'].map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); setEmail(''); setPassword(''); setName(''); }} className={`w-1/2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === tab ? 'bg-[#C0FF3D] text-[#202020]' : 'text-white/50 hover:text-white'}`}>
              {tab === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <button className='w-full flex items-center justify-center gap-3 bg-[#202020] border border-white/10 hover:border-white/20 text-white py-3 rounded-xl mb-6 transition-colors duration-200 text-sm font-medium'>
          <FcGoogle className='text-xl' />
          Continue with Google
        </button>

        <div className='flex items-center gap-3 mb-6'>
          <div className='flex-1 h-px bg-white/10' />
          <span className='text-white/30 text-xs'>or continue with email</span>
          <div className='flex-1 h-px bg-white/10' />
        </div>

        <div className='flex flex-col gap-4 mb-6'>
          {activeTab === 'signup' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
              <label className='block text-white/50 text-sm mb-2'>Full Name</label>
              <div className='relative'>
                <HiOutlineUser className='absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg' />
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} placeholder='Your full name' className='w-full bg-[#202020] border border-white/10 focus:border-[#C0FF3D]/50 text-white placeholder-white/20 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200' />
              </div>
            </motion.div>
          )}
          <div>
            <label className='block text-white/50 text-sm mb-2'>Email Address</label>
            <div className='relative'>
              <HiOutlineMail className='absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg' />
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} placeholder='you@example.com' className='w-full bg-[#202020] border border-white/10 focus:border-[#C0FF3D]/50 text-white placeholder-white/20 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200' />
            </div>
          </div>
          <div>
            <label className='block text-white/50 text-sm mb-2'>Password</label>
            <div className='relative'>
              <HiOutlineLockClosed className='absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg' />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} placeholder='........' className='w-full bg-[#202020] border border-white/10 focus:border-[#C0FF3D]/50 text-white placeholder-white/20 rounded-xl pl-11 pr-11 py-3 text-sm outline-none transition-colors duration-200' />
              <button onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white'>
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'login' && (
          <div className='text-right mb-6'>
            <a href='#' className='text-[#C0FF3D] text-sm hover:underline'>Forgot password?</a>
          </div>
        )}

        {error && (
          <div className='mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3'>
            <p className='text-red-400 text-sm'>{error}</p>
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} className='w-full bg-[#C0FF3D] hover:bg-[#aaee2a] disabled:opacity-50 disabled:cursor-not-allowed text-[#202020] py-3 rounded-xl font-bold transition-all duration-200 mb-6'>
          {loading ? 'Please wait...' : activeTab === 'login' ? 'Log In to Dashboard' : 'Create Free Account'}
        </button>

        <p className='text-center text-white/40 text-sm'>
          {activeTab === 'login' ? 'Do not have an account?' : 'Already have an account?'}
          {' '}
          <button onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')} className='text-[#C0FF3D] font-semibold hover:underline'>
            {activeTab === 'login' ? 'Sign up free' : 'Log in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;