import { NextRequest, NextResponse } from "next/server";
import { build_task_list } from "@/lib/tasks"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs";

type Assignment = {
    user_id: string;
    id?: string;
    name: string;
    due_date: string;
    total_tasks?: number;
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { assignment, due_date, assignmentName } = (await request.json()) as { assignment: string; due_date: string; assignmentName: string };
    const [tasksPlan] = await Promise.all([
        build_task_list(assignment, due_date),
    ]);

    const totalTasks = tasksPlan.tasks.length;

    const { data: assignmentObject, error: assignmentError } = await supabase
        .from("assignments")
        .insert<Assignment>({
            user_id: user.id,
            name: assignmentName,
            due_date: due_date,
            total_tasks: totalTasks,
        })
        .select("id")
        .single();
    if (assignmentError || !assignmentObject) {
        return NextResponse.json({ error: assignmentError?.message }, { status: 500 });
    }

    const taskRows = tasksPlan.tasks.map((task) => ({
        assignment_id: assignmentObject.id,
        name: task.task,
        description: task.description,
        type: task.type,
        due_date: task.due_date,
        time_estimate: task.time_estimate,
        query: task.searchQuery || null,
        scholar_query: task.scholarSearchQuery || null,
    }));

    if (taskRows.length > 0) {
        const { error: tasksInsertError } = await supabase.from("tasks").insert(taskRows);
        if (tasksInsertError) {
            return NextResponse.json({ error: tasksInsertError.message }, { status: 500 });
        }
    }

    return NextResponse.json({
        id: assignmentObject.id,
    });
}