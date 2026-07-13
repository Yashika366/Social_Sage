import { useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import { HiOutlineHome, HiOutlineChartBar, HiOutlineUsers, HiOutlineCog, HiOutlineBell, HiOutlineTrendingUp, HiOutlineEye, HiOutlineVideoCamera, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import useChannelAnalysis from '../hooks/useChannelAnalysis';
import ProfileDropdown from '../components/dashboard/ProfileDropdown';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('overview');
  const [channelInput, setChannelInput] = useState('');
  const { getUser } = useAuth();
  const user = getUser();
  const { channel, analysis, loading, error, analyzeChannel } = useChannelAnalysis();

  const sidebarLinks = [
    { id: 'overview', icon: <HiOutlineHome />, label: 'Overview' },
    { id: 'analytics', icon: <HiOutlineChartBar />, label: 'Analytics' },
    { id: 'audience', icon: <HiOutlineUsers />, label: 'Audience' },
    { id: 'settings', icon: <HiOutlineCog />, label: 'Settings' },
  ];

  const handleAnalyze = () => {
    if (channelInput.trim()) analyzeChannel(channelInput.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAnalyze();
  };

  const priorityColors = {
    High: '#C0FF3D',
    Medium: '#CBC3E3',
    Low: '#C0FF3D',
  };

  return (
    <div className='h-screen bg-[#F5F5F5] flex overflow-hidden'>

      <div className='w-64 h-full bg-[#202020] flex flex-col flex-shrink-0'>
        <div className='flex items-center gap-2 px-6 py-5 border-b border-white/10'>
          <HiOutlineSparkles className='text-[#C0FF3D] text-xl' />
          <Link to='/' className='text-xl font-bold text-white'>Social<span className='text-[#C0FF3D]'>Sage</span></Link>
        </div>

        {channel ? (
          <div className='mx-4 mt-4 p-3 bg-white/5 border border-white/10 rounded-xl'>
            <div className='flex items-center gap-3'>
              {channel.thumbnail ? (
                <img src={channel.thumbnail} alt={channel.title} className='w-9 h-9 rounded-full object-cover flex-shrink-0' />
              ) : (
                <div className='w-9 h-9 rounded-full bg-[#C0FF3D] flex items-center justify-center text-[#202020] text-sm font-bold flex-shrink-0'>{channel.title?.[0] || '?'}</div>
              )}
              <div className='overflow-hidden'>
                <p className='text-white text-sm font-medium truncate'>{channel.title}</p>
                <p className='text-white/40 text-xs'>{channel.subscriber_count?.toLocaleString()} subscribers</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='mx-4 mt-4 p-3 bg-white/5 border border-dashed border-white/10 rounded-xl'>
            <p className='text-white/30 text-xs text-center'>No channel connected yet</p>
          </div>
        )}

        <nav className='flex-1 px-4 mt-6 flex flex-col gap-1'>
          {sidebarLinks.map((link) => (
            <button key={link.id} onClick={() => setActivePage(link.id)} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activePage === link.id ? 'bg-[#C0FF3D]/10 text-[#C0FF3D] border border-[#C0FF3D]/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <span className='text-lg'>{link.icon}</span>
              {link.label}
            </button>
          ))}
        </nav>

        <div className='px-4 py-4 border-t border-white/10'>
          <div className='flex items-center gap-3 px-4 py-3 rounded-xl'>
            <div className='w-8 h-8 rounded-full bg-[#C0FF3D] flex items-center justify-center text-[#202020] text-xs font-bold flex-shrink-0'>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className='overflow-hidden'>
              <p className='text-white text-sm font-medium truncate'>{user?.name || 'Account'}</p>
              <p className='text-white/30 text-xs truncate'>{user?.email || ''}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='sticky top-0 z-10 bg-white border-b border-[#404040]/10 px-8 py-4 flex items-center justify-between'>
          <div>
            <h1 className='text-[#202020] font-bold text-xl'>Dashboard Overview</h1>
            <p className='text-[#404040]/60 text-sm'>{channel ? `Analyzing: ${channel.title}` : `Welcome back, ${user?.name || 'there'}`}</p>
          </div>
          <div className='flex items-center gap-4'>
            <button className='relative text-[#404040]/60 hover:text-[#202020] text-xl transition-colors'>
              <HiOutlineBell />
              <span className='absolute -top-1 -right-1 w-2 h-2 bg-[#C0FF3D] rounded-full' />
            </button>
            <ProfileDropdown />
          </div>
        </div>

        <div className='p-8'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='mb-8 bg-white border border-[#404040]/10 rounded-2xl p-6 shadow-sm'>
            <h2 className='text-[#202020] font-semibold mb-2'>Analyze a YouTube Channel</h2>
            <p className='text-[#404040]/60 text-sm mb-4'>Enter a YouTube Channel ID (starts with UC...) to get AI-powered growth insights.</p>
            <div className='flex gap-3'>
              <div className='relative flex-1'>
                <HiOutlineSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-[#404040]/40' />
                <input type='text' value={channelInput} onChange={(e) => setChannelInput(e.target.value)} onKeyDown={handleKeyDown} placeholder='e.g. UCX6OQ3DkcsbYNE6H8uQQuVA' className='w-full bg-[#F5F5F5] border border-[#404040]/20 focus:border-[#C0FF3D] text-[#202020] placeholder-[#404040]/30 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-colors duration-200' />
              </div>
              <button onClick={handleAnalyze} disabled={loading || !channelInput.trim()} className='bg-[#C0FF3D] hover:bg-[#aaee2a] disabled:opacity-50 disabled:cursor-not-allowed text-[#202020] px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center gap-2'>
                <HiOutlineSparkles />
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            <p className='text-[#404040]/40 text-xs mt-3'>
              Try MrBeast: <button onClick={() => { setChannelInput('UCX6OQ3DkcsbYNE6H8uQQuVA'); analyzeChannel('UCX6OQ3DkcsbYNE6H8uQQuVA'); }} className='text-[#202020] font-medium hover:underline'>UCX6OQ3DkcsbYNE6H8uQQuVA</button>
            </p>
            {error && (<div className='mt-4 bg-red-50 border border-red-200 rounded-xl p-3'><p className='text-red-500 text-sm'>{error}</p></div>)}
            {loading && (
              <div className='mt-4 flex items-center gap-3'>
                <div className='flex gap-1'>
                  {[0, 1, 2].map((i) => (<div key={i} className='w-2 h-2 bg-[#C0FF3D] rounded-full animate-bounce' style={{ animationDelay: i * 0.15 + 's' }} />))}
                </div>
                <p className='text-[#404040]/60 text-sm'>Fetching data and running analysis...</p>
              </div>
            )}
          </motion.div>

          {analysis && channel && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                {[
                  { label: 'Subscribers', value: channel.subscriber_count?.toLocaleString(), icon: <HiOutlineUsers /> },
                  { label: 'Total Views', value: channel.view_count?.toLocaleString(), icon: <HiOutlineEye /> },
                  { label: 'Total Videos', value: channel.video_count?.toLocaleString(), icon: <HiOutlineVideoCamera /> },
                  { label: 'Growth Score', value: analysis.growth_score + '/100', icon: <HiOutlineTrendingUp /> },
                ].map((stat, index) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className='bg-white border border-[#404040]/10 rounded-2xl p-5 shadow-sm'>
                    <div className='flex items-center justify-between mb-3'>
                      <p className='text-[#404040]/60 text-sm'>{stat.label}</p>
                      <span className='text-[#202020] text-lg'>{stat.icon}</span>
                    </div>
                    <p className='text-[#202020] text-2xl font-bold'>{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
                <div className='lg:col-span-2 bg-white border border-[#404040]/10 rounded-2xl p-6 shadow-sm'>
                  <h3 className='text-[#202020] font-semibold mb-3'>Channel Summary</h3>
                  <p className='text-[#404040]/70 text-sm leading-relaxed mb-5'>{analysis.summary}</p>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <p className='text-green-600 text-sm font-semibold mb-2'>Strengths</p>
                      {analysis.strengths?.map((s, i) => (<p key={i} className='text-[#404040]/70 text-xs mb-1'>+ {s}</p>))}
                    </div>
                    <div>
                      <p className='text-red-500 text-sm font-semibold mb-2'>Weaknesses</p>
                      {analysis.weaknesses?.map((w, i) => (<p key={i} className='text-[#404040]/70 text-xs mb-1'>- {w}</p>))}
                    </div>
                  </div>
                </div>
                <div className='bg-white border border-[#404040]/10 rounded-2xl p-6 shadow-sm'>
                  <div className='flex items-center gap-2 mb-3'>
                    <HiOutlineSparkles className='text-[#202020]' />
                    <h3 className='text-[#202020] font-semibold'>Content Strategy</h3>
                  </div>
                  <p className='text-[#404040]/70 text-sm leading-relaxed mb-4'>{analysis.content_strategy}</p>
                  <div className='bg-[#C0FF3D]/10 border border-[#C0FF3D]/30 rounded-xl p-3'>
                    <p className='text-xs text-[#202020] font-semibold mb-1'>Upload Frequency</p>
                    <p className='text-[#404040]/70 text-xs'>{analysis.upload_frequency_advice}</p>
                  </div>
                </div>
              </div>

              <div className='bg-white border border-[#404040]/10 rounded-2xl p-6 shadow-sm'>
                <div className='flex items-center gap-2 mb-5'>
                  <HiOutlineSparkles className='text-[#202020]' />
                  <h3 className='text-[#202020] font-semibold'>AI Recommendations</h3>
                  {analysis.is_mock && (<span className='text-xs bg-[#C0FF3D]/20 text-[#404040] border border-[#C0FF3D]/30 px-2 py-0.5 rounded-full'>Demo Mode</span>)}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {analysis.recommendations?.map((rec, index) => (
                    <div key={index} className='bg-[#F5F5F5] border border-[#404040]/10 rounded-xl p-4'>
                      <span className='text-xs font-bold px-2 py-0.5 rounded-full mb-3 inline-block' style={{ color: priorityColors[rec.priority], backgroundColor: priorityColors[rec.priority] + '20', border: '1px solid ' + priorityColors[rec.priority] + '40' }}>
                        {rec.priority} Priority
                      </span>
                      <h4 className='text-[#202020] text-sm font-semibold mb-2'>{rec.title}</h4>
                      <p className='text-[#404040]/60 text-xs leading-relaxed mb-3'>{rec.description}</p>
                      <p className='text-xs text-green-600 font-medium'>{rec.expected_impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!analysis && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-20'>
              <div className='w-16 h-16 bg-[#C0FF3D]/10 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <HiOutlineSparkles className='text-[#202020] text-3xl' />
              </div>
              <h3 className='text-[#202020] font-semibold text-xl mb-2'>Ready to analyze</h3>
              <p className='text-[#404040]/60'>Enter a YouTube channel ID above to get your AI growth report.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;