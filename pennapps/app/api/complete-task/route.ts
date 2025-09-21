import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const taskIdRaw = body?.task_id ?? body?.id;
    const taskId = typeof taskIdRaw === "string" ? Number(taskIdRaw) : taskIdRaw;
    if (taskId == null || Number.isNaN(Number(taskId))) {
        return NextResponse.json({ error: "Invalid task id" }, { status: 400 });
    }
    const { data: updatedTask, error: updateTaskError } = await supabase
        .from("tasks")
        .update({ completed: true })
        .eq("id", taskId)
        .eq("completed", false)
        .select("assignment_id, assignments(id, tasks_completed, total_tasks)")
        .maybeSingle();
    if (updateTaskError) {
        return NextResponse.json({ error: updateTaskError.message }, { status: 500 });
    }
    if (!updatedTask) {
        return NextResponse.json({ message: "Task already completed" });
    }
    type AssignmentRow = { id: number; tasks_completed: number | null; total_tasks: number | null };
    type UpdatedTaskRow = { assignment_id: number; assignments?: AssignmentRow | null };
    let assignmentFromJoin = (updatedTask as unknown as UpdatedTaskRow)?.assignments ?? null;
    const assignmentId = assignmentFromJoin?.id ?? (updatedTask as unknown as UpdatedTaskRow)?.assignment_id;
    if (assignmentId == null) {
        return NextResponse.json({ error: "Invalid assignment id" }, { status: 400 });
    }
    if (!assignmentFromJoin) {
        const { data: fetchedAssignment, error: fetchError } = await supabase
            .from("assignments")
            .select("id, tasks_completed, total_tasks")
            .eq("id", assignmentId)
            .single();
        if (fetchError) {
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }
        assignmentFromJoin = fetchedAssignment as AssignmentRow;
    }
    const currentCompleted = assignmentFromJoin?.tasks_completed ?? 0;
    const totalTasks = assignmentFromJoin?.total_tasks ?? null;
    const nextCompleted = currentCompleted + 1;
    if (totalTasks != null && nextCompleted >= totalTasks) {
        const { error: deleteError } = await supabase.from("assignments").delete().eq("id", assignmentId);
        if (deleteError) {
            const { error: deleteTasksError } = await supabase.from("tasks").delete().eq("assignment_id", assignmentId);
            if (deleteTasksError) {
                return NextResponse.json({ error: deleteTasksError.message }, { status: 500 });
            }
            const { error: deleteAssignmentRetryError } = await supabase.from("assignments").delete().eq("id", assignmentId);
            if (deleteAssignmentRetryError) {
                return NextResponse.json({ error: deleteAssignmentRetryError.message }, { status: 500 });
            }
        }
        return NextResponse.json({ message: "Task completed; assignment finished and deleted" });
    }
    const { error: assignmentUpdateError } = await supabase
        .from("assignments")
        .update({ tasks_completed: nextCompleted })
        .eq("id", assignmentId);
    if (assignmentUpdateError) {
        return NextResponse.json({ error: assignmentUpdateError.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Task completed" });
}