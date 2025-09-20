import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { AssignmentGrid } from "@/components/assignmentGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <main className="w-full bg-white">
      <div className="relative overflow-hidden" style={{ width: "100%", height: "320px" }}>
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-3xl animate-blob" />
          <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-400/30 to-rose-400/30 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute left-1/3 bottom-0 h-48 w-48 rounded-full bg-gradient-to-tr from-emerald-400/30 to-cyan-400/30 blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-neutral-100" />
        <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-end pb-10">
          <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="animate-float-slow">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">Assignments</h1>
              <p className="mt-2 text-gray-800">Track progress, manage due dates, and stay on schedule.</p>
            </div>
            <div className="flex items-center">
              <Link href="/dashboard/assignments/new">
                <Button type="button" title="Create a new assignment" className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-white text-sm font-medium shadow-sm transition-colors hover:bg-black">
                  <Plus className="h-4 w-4" />
                  New assignment
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-neutral-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <AssignmentGrid />
        </div>
      </section>
    </main>
  );
}


