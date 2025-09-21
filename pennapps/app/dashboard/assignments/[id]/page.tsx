import { createClient } from "@/lib/supabase/server";
import { MindMapCanvas } from "@/components/canvas"

type TaskRow = {
    id: number
    name: string
    description: string
    type: string
    due_date: string
    time_estimate: number
    completed?: boolean
    x: number
    y: number
    query: string | null
    scholar_query: string | null
}

type AssignmentRow = {
    id: number
    name: string
    due_date: string
    tasks_completed: number
    total_tasks: number
    tasks: TaskRow[]
}

// Next may pass params synchronously or as a Promise in RSC context
type PageParams = { id: string } | Promise<{ id: string }>
export default async function AssignmentPage({ params }: { params: PageParams }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("assignments")
        .select("id, name, due_date, tasks_completed, total_tasks, tasks(*)")
        .eq("id", id)
        .single();
    if (error) {
        if ((error as { code?: string }).code === "PGRST116") {
            return <div>Assignment not found</div>;
        }
        return <div>Error: {error.message}</div>;
    }
    const typed = data as unknown as AssignmentRow
    const tasks = typed?.tasks?.slice()?.sort((a, b) => a.id - b.id) ?? [];

  return (
    <div className="min-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none w-full">
        <div className="mx-auto max-w-4xl bg-white/90 backdrop-blur-sm rounded-xl shadow-md ring-1 ring-black/5 px-6 py-3 mt-2">
          <h1 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug break-words">{data.name}</h1>
        </div>
      </div>
      <MindMapCanvas tasks={tasks} focusIndex={typed.tasks_completed} total_completed={typed.tasks_completed}/>
    </div>
  )
}


