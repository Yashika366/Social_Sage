const Badge = ({ children }) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-300 text-sm font-medium">
      <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
      {children}
    </div>
  );
};

export default Badge;