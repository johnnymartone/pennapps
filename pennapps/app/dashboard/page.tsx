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
    <main className="w-full bg-white mt-5">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-neutral-100" />
        <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-end pb-10">
          <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <AnimatedOnLoad variant="fade-up" durationMs={500}>
              <div className="animate-float-slow">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">Assignments</h1>
                <p className="mt-2 text-gray-800">Track progress, manage due dates, and stay on schedule.</p>
              </div>
            </AnimatedOnLoad>
            <AnimatedOnLoad delay={120}>
              <div className="flex items-center">
                <Link href="/dashboard/assignments/new">
                  <Button type="button" title="Create a new assignment" className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-white text-sm font-medium shadow-sm transition-colors hover:bg-black">
                    <Plus className="h-4 w-4" />
                    Add Assignment
                  </Button>
                </Link>
              </div>
            </AnimatedOnLoad>
          </div>
        </section>

      <section className="bg-neutral-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <AnimatedOnLoad variant="fade-up" durationMs={500}>
            <AssignmentGrid />
          </AnimatedOnLoad>
        </div>
      </section>
    </main>
  );
}


