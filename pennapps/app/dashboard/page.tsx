import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { AssignmentGrid } from "@/components/assignmentGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import AnimatedOnLoad from "@/components/animated-onload";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <main className="relative w-full bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)] bg-gradient-to-b from-white via-white to-neutral-100" />
      <div className="pointer-events-none absolute left-1/2 -top-24 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.06),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-40 h-40 w-40 rounded-full bg-[conic-gradient(from_180deg,rgba(0,0,0,0.06),transparent_70%)] blur-2xl" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-12">
        <div className="flex w-full flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <AnimatedOnLoad variant="fade-up" durationMs={500}>
            <div className="animate-float-slow">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">Assignments</h1>
              <p className="mt-3 text-base sm:text-lg text-neutral-600">Track progress, manage due dates, and stay on schedule.</p>
            </div>
          </AnimatedOnLoad>
          <AnimatedOnLoad delay={120}>
            <div className="flex items-center">
              <Link href="/dashboard/assignments/new">
                <Button type="button" title="Create a new assignment" className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-white text-sm font-medium shadow-sm transition-colors hover:bg-black">
                  <Plus className="h-4 w-4" />
                  Add Assignment
                </Button>
              </Link>
            </div>
          </AnimatedOnLoad>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 border-t border-neutral-200">
          <AnimatedOnLoad variant="fade-up" durationMs={500}>
            <AssignmentGrid />
          </AnimatedOnLoad>
        </div>
      </section>
    </main>
  );
}


