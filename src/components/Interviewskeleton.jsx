const Shimmer = ({ className = '' }) => (
  <div className={`relative overflow-hidden bg-[#e7e9ee] ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
)

const InterviewSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#f3f3f2] px-3 py-3 text-[#1f2937] sm:px-5 sm:py-5">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-355 overflow-hidden rounded-[22px] border border-[#d9dce0] bg-white shadow-[0_8px_30px_rgba(31,41,55,0.04)]">
        {/* Left sidebar */}
        <aside className="hidden w-61.25 shrink-0 border-r border-[#e0e2e6] bg-white p-5 sm:block">
          <Shimmer className="h-3 w-32 rounded" />

          <nav className="mt-8 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-3">
                <Shimmer className="h-4 w-4 rounded" />
                <Shimmer className="h-4 w-32 rounded" />
              </div>
            ))}
          </nav>

          <Shimmer className="mt-4 h-9 w-40 rounded-lg" />
        </aside>

        {/* Main content */}
        <section className="min-w-0 flex-1 bg-white">
          <header className="flex items-center justify-between border-b border-[#e6e8eb] px-5 py-4 sm:px-8">
            <Shimmer className="h-5 w-5 rounded sm:hidden" />
            <Shimmer className="hidden h-4 w-36 rounded sm:block" />
            <Shimmer className="ml-auto h-6 w-24 rounded-full" />
          </header>

          <div className="mx-auto max-w-190 px-5 py-8 sm:px-10 sm:py-12">
            <div className="mb-8 lg:hidden">
              <ProfileMatchSkeleton compact />
            </div>

            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <Shimmer className="h-3 w-32 rounded" />
                <Shimmer className="mt-2 h-7 w-44 rounded-lg" />
              </div>
              <Shimmer className="h-6 w-16 rounded-full" />
            </div>

            <div className="rounded-2xl border border-[#e1e5eb] bg-[#fbfbfa] p-5 sm:p-6">
              <Shimmer className="h-5 w-[90%] rounded-md" />
              <Shimmer className="mt-2 h-5 w-[65%] rounded-md" />

              <div className="mt-6 border-t border-[#e7e9ed] pt-5">
                <Shimmer className="h-3 w-40 rounded" />
                <Shimmer className="mt-3 h-3 w-full rounded" />
                <Shimmer className="mt-2 h-3 w-[85%] rounded" />
              </div>

              <div className="mt-5 rounded-xl bg-[#f0f4ff] p-4">
                <Shimmer className="h-3 w-32 rounded" />
                <Shimmer className="mt-3 h-3 w-full rounded" />
                <Shimmer className="mt-2 h-3 w-[70%] rounded" />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <Shimmer className="h-10 w-24 rounded-xl" />
              <Shimmer className="h-10 w-36 rounded-xl" />
            </div>
          </div>
        </section>

        {/* Right sidebar */}
        <aside className="hidden w-61.25 shrink-0 border-l border-[#e0e2e6] bg-[#fdfdfc] p-5 lg:block">
          <ProfileMatchSkeleton />

          <div className="mb-6 mt-8 flex items-center gap-2">
            <Shimmer className="h-4 w-4 rounded" />
            <Shimmer className="h-4 w-24 rounded" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-[#e3e6eb] bg-white p-3">
                <div className="flex items-start justify-between gap-2">
                  <Shimmer className="h-4 w-32 rounded" />
                  <Shimmer className="h-2 w-2 rounded-full" />
                </div>
                <Shimmer className="mt-2 h-3 w-full rounded" />
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-[#f0f4ff] p-4">
            <Shimmer className="h-3 w-20 rounded" />
            <Shimmer className="mt-2 h-3 w-full rounded" />
            <Shimmer className="mt-1 h-3 w-[80%] rounded" />
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </main>
  )
}

const ProfileMatchSkeleton = ({ compact = false }) => (
  <div className={`relative overflow-hidden rounded-2xl border border-[#d8e1fb] bg-[#edf3ff] ${compact ? 'p-4' : 'p-5'}`}>
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Shimmer className="h-8 w-8 rounded-xl" />
        <div>
          <Shimmer className="h-3 w-24 rounded" />
          <Shimmer className="mt-1.5 h-2.5 w-20 rounded" />
        </div>
      </div>
      <Shimmer className="h-5 w-16 rounded-full" />
    </div>

    <div className={`mt-5 flex items-center ${compact ? 'gap-4' : 'flex-col gap-4'}`}>
      <Shimmer className="h-28 w-28 shrink-0 rounded-full" />
      <div className={compact ? 'min-w-0 flex-1' : 'w-full'}>
        <Shimmer className="h-3 w-[80%] rounded" />
        <Shimmer className="mt-2 h-3 w-full rounded" />
        <Shimmer className="mt-1 h-3 w-[60%] rounded" />
      </div>
    </div>

    <div className="mt-5">
      <div className="mb-1.5 flex justify-between">
        <Shimmer className="h-2.5 w-14 rounded" />
        <Shimmer className="h-2.5 w-10 rounded" />
      </div>
      <Shimmer className="h-2 w-full rounded-full" />
    </div>
  </div>
)

export default InterviewSkeleton