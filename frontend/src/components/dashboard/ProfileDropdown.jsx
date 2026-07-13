import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineCog, HiOutlineLogout, HiOutlineEye, HiOutlineEyeOff, HiOutlineCheck } from 'react-icons/hi';
import useAuth from '../../hooks/useAuth';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState('main');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { logout, getUser } = useAuth();
  const user = getUser();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveView('main');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess(false);
    if (!currentPassword || !newPassword || !confirmPassword) { setPasswordError('All fields are required'); return; }
    if (newPassword.length < 6) { setPasswordError('New password must be at least 6 characters'); return; }
    if (newPassword !== confirmPassword) { setPasswordError('New passwords do not match'); return; }
    setPasswordLoading(true);
    setTimeout(() => {
      setPasswordLoading(false);
      setPasswordSuccess(true);
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      setTimeout(() => { setPasswordSuccess(false); setActiveView('main'); }, 2000);
    }, 1500);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <button onClick={() => { setIsOpen(!isOpen); setActiveView('main'); }} className='w-9 h-9 rounded-full bg-[#C0FF3D] flex items-center justify-center text-[#202020] text-sm font-bold cursor-pointer hover:bg-[#aaee2a] transition-colors duration-200'>
        {getInitials(user?.name)}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className='absolute right-0 top-12 w-80 bg-white border border-[#404040]/10 rounded-2xl shadow-2xl z-50 overflow-hidden'>

            {activeView === 'main' && (
              <div>
                <div className='p-5 border-b border-[#404040]/10'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-14 h-14 rounded-full bg-[#C0FF3D] flex items-center justify-center text-[#202020] text-lg font-bold flex-shrink-0'>
                      {getInitials(user?.name)}
                    </div>
                    <div>
                      <p className='text-[#202020] font-semibold'>{user?.name || 'User'}</p>
                      <p className='text-[#404040]/60 text-sm'>{user?.email || ''}</p>
                      <span className='inline-block bg-[#C0FF3D]/20 text-[#404040] text-xs font-semibold px-2 py-0.5 rounded-full mt-1'>Free Plan</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2 text-sm text-[#404040]/70'>
                      <HiOutlineUser className='text-[#202020] flex-shrink-0' />
                      <span>{user?.name || '—'}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-[#404040]/70'>
                      <HiOutlineMail className='text-[#202020] flex-shrink-0' />
                      <span className='truncate'>{user?.email || '—'}</span>
                    </div>
                  </div>
                </div>
                <div className='p-2'>
                  <button onClick={() => setActiveView('changePassword')} className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#404040] hover:bg-[#F5F5F5] transition-all duration-200 text-left'>
                    <HiOutlineLockClosed className='text-[#202020] text-lg flex-shrink-0' />
                    <div>
                      <p className='font-medium text-[#202020]'>Change Password</p>
                      <p className='text-xs text-[#404040]/50'>Update your account password</p>
                    </div>
                  </button>
                  <button onClick={() => setActiveView('settings')} className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#404040] hover:bg-[#F5F5F5] transition-all duration-200 text-left'>
                    <HiOutlineCog className='text-[#202020] text-lg flex-shrink-0' />
                    <div>
                      <p className='font-medium text-[#202020]'>Account Settings</p>
                      <p className='text-xs text-[#404040]/50'>Manage your preferences</p>
                    </div>
                  </button>
                  <div className='h-px bg-[#404040]/10 my-2' />
                  <button onClick={logout} className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all duration-200 text-left'>
                    <HiOutlineLogout className='text-lg flex-shrink-0' />
                    <p className='font-medium'>Log Out</p>
                  </button>
                </div>
              </div>
            )}

            {activeView === 'changePassword' && (
              <div>
                <div className='flex items-center gap-3 p-4 border-b border-[#404040]/10'>
                  <button onClick={() => { setActiveView('main'); setPasswordError(''); setPasswordSuccess(false); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }} className='text-[#404040]/60 hover:text-[#202020] transition-colors'>back</button>
                  <h3 className='text-[#202020] font-semibold'>Change Password</h3>
                </div>
                <div className='p-4 flex flex-col gap-3'>
                  {passwordSuccess && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className='flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3'>
                      <HiOutlineCheck className='text-green-500 text-lg flex-shrink-0' />
                      <p className='text-green-600 text-sm'>Password changed successfully!</p>
                    </motion.div>
                  )}
                  {passwordError && (<div className='bg-red-50 border border-red-200 rounded-xl p-3'><p className='text-red-500 text-sm'>{passwordError}</p></div>)}
                  <div>
                    <label className='block text-[#404040]/60 text-xs mb-1'>Current Password</label>
                    <div className='relative'>
                      <HiOutlineLockClosed className='absolute left-3 top-1/2 -translate-y-1/2 text-[#404040]/40 text-sm' />
                      <input type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder='........' className='w-full bg-[#F5F5F5] border border-[#404040]/20 focus:border-[#C0FF3D] text-[#202020] rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none transition-colors' />
                      <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 text-[#404040]/40 hover:text-[#202020]'>
                        {showCurrentPassword ? <HiOutlineEyeOff className='text-sm' /> : <HiOutlineEye className='text-sm' />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className='block text-[#404040]/60 text-xs mb-1'>New Password</label>
                    <div className='relative'>
                      <HiOutlineLockClosed className='absolute left-3 top-1/2 -translate-y-1/2 text-[#404040]/40 text-sm' />
                      <input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='........' className='w-full bg-[#F5F5F5] border border-[#404040]/20 focus:border-[#C0FF3D] text-[#202020] rounded-xl pl-9 pr-9 py-2.5 text-sm outline-none transition-colors' />
                      <button onClick={() => setShowNewPassword(!showNewPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 text-[#404040]/40 hover:text-[#202020]'>
                        {showNewPassword ? <HiOutlineEyeOff className='text-sm' /> : <HiOutlineEye className='text-sm' />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className='block text-[#404040]/60 text-xs mb-1'>Confirm New Password</label>
                    <div className='relative'>
                      <HiOutlineLockClosed className='absolute left-3 top-1/2 -translate-y-1/2 text-[#404040]/40 text-sm' />
                      <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='........' className='w-full bg-[#F5F5F5] border border-[#404040]/20 focus:border-[#C0FF3D] text-[#202020] rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-colors' />
                    </div>
                  </div>
                  <button onClick={handlePasswordChange} disabled={passwordLoading} className='w-full bg-[#C0FF3D] hover:bg-[#aaee2a] disabled:opacity-50 text-[#202020] py-2.5 rounded-xl text-sm font-bold transition-colors mt-1'>
                    {passwordLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}

            {activeView === 'settings' && (
              <div>
                <div className='flex items-center gap-3 p-4 border-b border-[#404040]/10'>
                  <button onClick={() => setActiveView('main')} className='text-[#404040]/60 hover:text-[#202020] transition-colors'>back</button>
                  <h3 className='text-[#202020] font-semibold'>Account Settings</h3>
                </div>
                <div className='p-4 flex flex-col gap-3'>
                  <div className='flex items-center justify-between p-3 bg-[#F5F5F5] rounded-xl'>
                    <div>
                      <p className='text-[#202020] text-sm font-medium'>Email Notifications</p>
                      <p className='text-[#404040]/50 text-xs'>Weekly growth reports</p>
                    </div>
                    <div className='w-10 h-5 bg-[#C0FF3D] rounded-full relative cursor-pointer'>
                      <div className='w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5' />
                    </div>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-[#F5F5F5] rounded-xl'>
                    <div>
                      <p className='text-[#202020] text-sm font-medium'>AI Insights</p>
                      <p className='text-[#404040]/50 text-xs'>Auto-analyze on login</p>
                    </div>
                    <div className='w-10 h-5 bg-[#404040]/20 rounded-full relative cursor-pointer'>
                      <div className='w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5' />
                    </div>
                  </div>
                  <div className='p-3 bg-[#C0FF3D]/10 border border-[#C0FF3D]/30 rounded-xl'>
                    <p className='text-[#202020] text-sm font-semibold mb-1'>Free Plan</p>
                    <p className='text-[#404040]/60 text-xs mb-3'>1 channel · Basic AI analysis · 10 video insights</p>
                    <button className='w-full bg-[#C0FF3D] hover:bg-[#aaee2a] text-[#202020] py-2 rounded-lg text-xs font-bold transition-colors'>Upgrade to Pro</button>
                  </div>
                  <div className='p-3 bg-red-50 border border-red-200 rounded-xl'>
                    <p className='text-red-500 text-sm font-semibold mb-1'>Danger Zone</p>
                    <p className='text-[#404040]/60 text-xs mb-3'>Permanently delete your account and all data</p>
                    <button className='w-full border border-red-300 text-red-500 hover:bg-red-50 py-2 rounded-lg text-xs font-semibold transition-colors'>Delete Account</button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;