import React from 'react'

const Shimmer = ({ className = '' }) => (
  <div className={`relative overflow-hidden bg-[#e7e9ee] ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  </div>
)

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <header className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Shimmer className="h-10 w-40 rounded-lg" />
        <div className="flex items-center gap-6">
          <Shimmer className="h-4 w-24 rounded-md" />
          <Shimmer className="h-9 w-24 rounded-full" />
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-6 lg:px-8">
        <section className="rounded-[28px] bg-[#f3f3f2] px-2 py-6 sm:px-4 lg:px-0">
          {/* Hero */}
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <Shimmer className="mb-6 h-7 w-64 rounded-full" />
            <Shimmer className="h-10 w-[85%] rounded-lg sm:h-14" />
            <Shimmer className="mt-3 h-10 w-[60%] rounded-lg sm:h-14" />
            <Shimmer className="mt-5 h-4 w-[90%] rounded-md" />
            <Shimmer className="mt-2 h-4 w-[70%] rounded-md" />
          </div>

          {/* Two input cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[22px] border border-[#dfe3e8] bg-[#f7f7f5] p-4 sm:p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Shimmer className="h-10 w-10 rounded-xl" />
                  <Shimmer className="h-5 w-48 rounded-md" />
                </div>
                <Shimmer className="h-5 w-16 rounded-md" />
              </div>
              <Shimmer className="h-[280px] w-full rounded-[14px]" />
              <div className="mt-3 flex justify-end">
                <Shimmer className="h-3 w-12 rounded" />
              </div>
            </div>

            <div className="rounded-[22px] border border-[#dfe3e8] bg-[#f7f7f5] p-4 sm:p-5">
              <div className="mb-5 flex items-center gap-3">
                <Shimmer className="h-10 w-10 rounded-xl" />
                <Shimmer className="h-5 w-32 rounded-md" />
              </div>

              <div className="rounded-[18px] border border-dashed border-[#cfd4dc] bg-[#f3f4f4] px-4 py-6">
                <div className="flex flex-col items-center">
                  <Shimmer className="mb-4 h-12 w-12 rounded-full" />
                  <Shimmer className="h-4 w-40 rounded-md" />
                  <Shimmer className="mt-2 h-3 w-24 rounded" />
                  <Shimmer className="mt-5 h-9 w-28 rounded-lg" />
                </div>
              </div>

              <div className="mt-5">
                <Shimmer className="mb-2 h-3 w-48 rounded" />
                <Shimmer className="h-[92px] w-full rounded-[14px]" />
                <div className="mt-2 flex justify-end">
                  <Shimmer className="h-3 w-12 rounded" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-[14px] border border-[#dfe3e8] bg-[#f3f4f4] px-3 py-3">
                <Shimmer className="h-5 w-5 rounded-full" />
                <Shimmer className="h-3 w-[80%] rounded" />
              </div>
            </div>
          </div>

          {/* Generate bar */}
          <div className="mt-8 flex flex-col gap-4 rounded-[22px] border border-[#dfe3e8] bg-[#f7f7f5] px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Shimmer className="h-10 w-10 rounded-xl" />
              <div>
                <Shimmer className="h-4 w-52 rounded-md" />
                <Shimmer className="mt-2 h-3 w-32 rounded" />
              </div>
            </div>
            <Shimmer className="h-11 w-64 rounded-xl" />
          </div>
        </section>

        {/* Workspace / reports */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <Shimmer className="h-3 w-28 rounded" />
              <Shimmer className="mt-2 h-8 w-52 rounded-lg" />
            </div>
            <Shimmer className="h-4 w-16 rounded" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex min-h-[218px] flex-col rounded-[22px] border border-[#dfe3e8] bg-[#f7f7f5] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <Shimmer className="h-10 w-10 rounded-xl" />
                  <Shimmer className="h-6 w-20 rounded-full" />
                </div>
                <Shimmer className="mt-5 h-5 w-[85%] rounded-md" />
                <Shimmer className="mt-2 h-5 w-[55%] rounded-md" />
                <Shimmer className="mt-2 h-3 w-24 rounded" />
                <Shimmer className="mt-auto h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </section>
      </main>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

export default HomeSkeleton