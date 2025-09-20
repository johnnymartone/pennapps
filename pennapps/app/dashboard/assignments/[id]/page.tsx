import { createClient } from "@/lib/supabase/server";
import { MindMapCanvas } from "@/components/canvas"
export default async function AssignmentPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase.from("assignments").select("*").eq("id", id).single();
    if (error) {
        if (error.code === "PGRST116") {
            return <div>Assignment not found</div>;
        }
        return <div>Error: {error.message}</div>;
    }
    const { data: tasks, error: tasksError } = await supabase.from("tasks").select("*").eq("assignment_id", id);
    if (tasksError) {
        return <div>Error: {tasksError.message}</div>;
    }
    console.log(tasks);
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-3xl font-bold text-slate-800 text-center">Learning Path</h1>
        <p className="text-slate-600 text-center mt-2">Navigate through your educational journey</p>
      </div>
      <MindMapCanvas tasks={tasks} assignmentName={data.name} dueDate={data.due_date} focusIndex={data.tasks_completed} />
    </div>
  )
}


