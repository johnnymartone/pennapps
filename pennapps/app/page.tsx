import Prism from "@/components/Prism";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative bg-white">
      <div className="relative isolate" style={{ width: '100%', height: '640px' }}>
        <div className="absolute inset-0">
          <Prism
            animationType="3drotate"
            timeScale={0.1}
            height={3}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={2.5}
            noise={0}
            glow={1}
            bloom={1}
            suspendWhenOffscreen
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-neutral-100" />

        <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900">
              Organize assignments with ease
            </h1>
            <p className="mt-6 text-lg text-gray-800">
              Track progress, manage due dates, and focus on what matters. A clean dashboard that keeps you on schedule.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-white text-sm font-medium shadow-sm transition-colors hover:bg-black duration-300"
              >
                Get started
              </Link>
              <Link
                href="/dashboard/test"
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200/40 hover:backdrop-blur-md transition-all duration-300"
              >
                View demo
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-neutral-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur">
              <h3 className="text-lg font-semibold text-gray-900">Smart tracking</h3>
              <p className="mt-2 text-gray-600">See your assignments, progress, and due dates in one place.</p>
            </div>
            <div className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur">
              <h3 className="text-lg font-semibold text-gray-900">Stay on schedule</h3>
              <p className="mt-2 text-gray-600">Gentle nudges help you plan and finish work on time.</p>
            </div>
            <div className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white/70 backdrop-blur">
              <h3 className="text-lg font-semibold text-gray-900">Focus, simplified</h3>
              <p className="mt-2 text-gray-600">A clean interface keeps the important things front and center.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">Everything you need to stay organized</h2>
              <p className="mt-4 text-gray-600">Create assignments, track tasks, and visualize progress without the clutter. EduPlan helps you break big goals into achievable steps.</p>
              <div className="mt-8 flex gap-4">
                <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-3 text-white text-sm font-medium shadow-sm transition-colors hover:bg-black">Start free</Link>
                <Link href="/dashboard/test" className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100">See it in action</Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-40 rounded-xl bg-white ring-1 ring-gray-200 shadow-sm" />
              <div className="h-40 rounded-xl bg-white ring-1 ring-gray-200 shadow-sm" />
              <div className="h-40 rounded-xl bg-white ring-1 ring-gray-200 shadow-sm" />
              <div className="h-40 rounded-xl bg-white ring-1 ring-gray-200 shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-900">Loved by students and teams</h2>
            <p className="mt-4 text-gray-600">Simple workflows that remove friction and keep everyone aligned.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white shadow-sm">
              <p className="text-gray-700">“My schedule finally makes sense. I can actually see what needs attention.”</p>
              <div className="mt-4 text-sm text-gray-500">— Alex, High school</div>
            </div>
            <div className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white shadow-sm">
              <p className="text-gray-700">“We track group assignments without chaos. Deadlines are no longer a surprise.”</p>
              <div className="mt-4 text-sm text-gray-500">— Priya, University</div>
            </div>
            <div className="p-6 rounded-2xl ring-1 ring-gray-200 bg-white shadow-sm">
              <p className="text-gray-700">“Clean, fast, and exactly what I needed to stay on top of tasks.”</p>
              <div className="mt-4 text-sm text-gray-500">— Mateo, Bootcamp</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-black p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Ready to stay organized?</h3>
              <p className="mt-2 text-white/80">Start planning smarter today with EduPlan.</p>
            </div>
            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-gray-900 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100">Get started</Link>
          </div>
        </div>
      </section>
    </main>
  );
}