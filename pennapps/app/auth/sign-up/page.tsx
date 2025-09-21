import Prism from "@/components/Prism";
import AnimatedOnLoad from "@/components/animated-onload";
import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <main className="relative bg-white">
      <div className="relative isolate" style={{ width: '100%', height: '95vh' }}>
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
          <div className="w-full flex flex-col items-center gap-6">
            <AnimatedOnLoad className="text-center" variant="fade-up" durationMs={600}>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">Create your account</h1>
              <p className="mt-3 text-neutral-900">Start organizing your assignments</p>
            </AnimatedOnLoad>

            <AnimatedOnLoad variant="scale-in" durationMs={500} delay={80} className="w-full flex justify-center">
              <div className="w-full max-w-sm">
                <SignUpForm />
              </div>
            </AnimatedOnLoad>
          </div>
        </section>
      </div>
    </main>
  );
}
