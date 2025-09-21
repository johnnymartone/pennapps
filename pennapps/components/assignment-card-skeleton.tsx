"use client"

export function AssignmentCardSkeleton() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md ring-1 ring-neutral-200/70 shadow-lg">
      <div className="p-6">
        <div className="flex flex-col items-center gap-5">
          <div className="relative" style={{ width: 88, height: 88 }}>
            <div className="absolute -inset-3 rounded-full blur-2xl opacity-40" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.2), transparent 70%)" }} />
            <div className="absolute inset-0 rounded-full border-8 border-neutral-200" />
            <div className="absolute inset-0 rounded-full border-8 border-neutral-300 animate-pulse [clip-path:polygon(50%_0,100%_0,100%_100%,0_100%,0_0)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="h-4 w-10 bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-4 w-28 bg-neutral-200 rounded animate-pulse" />
          <div className="h-6 w-3/4 bg-neutral-200 rounded animate-pulse" />
          <div className="h-4 w-36 bg-neutral-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}


