import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { name_assignment } from "@/lib/tasks";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { assignment } = await request.json();
    const [assignmentInfo] = await Promise.all([
        name_assignment(assignment),
    ]);
    return NextResponse.json({ assignmentInfo });
}