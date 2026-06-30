const DashboardPreview = () => {
  return (
    <div className="w-full max-w-md rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-6 shadow-2xl">

      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Dashboard</h3>
        <span className="text-green-400 text-sm">● Live</span>
      </div>

      <div className="mt-6">
        <p className="text-sm text-[var(--text-muted)]">Growth Score</p>
        <h1 className="text-5xl font-bold text-[var(--accent)]">92</h1>
      </div>

      <div className="mt-8 h-28 rounded-xl bg-[#433733] flex items-end gap-2 p-4">
        <div className="w-5 h-12 bg-pink-500 rounded"></div>
        <div className="w-5 h-20 bg-pink-500 rounded"></div>
        <div className="w-5 h-16 bg-pink-500 rounded"></div>
        <div className="w-5 h-24 bg-pink-500 rounded"></div>
        <div className="w-5 h-14 bg-pink-500 rounded"></div>
        <div className="w-5 h-28 bg-pink-500 rounded"></div>
      </div>

      <div className="mt-6 rounded-xl bg-[#433733] p-4">
        <p className="text-sm text-[var(--text-muted)]">
          💡 AI Recommendation
        </p>

        <p className="mt-2 text-sm">
          Upload Shorts consistently this week to increase engagement.
        </p>
      </div>

    </div>
  );
};

export default DashboardPreview;