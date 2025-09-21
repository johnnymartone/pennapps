"use client"

import { AssignmentCard } from "@/components/assignmentCard"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { AssignmentCardSkeleton } from "@/components/assignment-card-skeleton";

type Assignment = {
  id: number;
  name: string;
  due_date: string;
  tasks_completed: number;
  total_tasks: number;
}

type Assignments = Assignment[]

export function AssignmentGrid() {
    const [assignments, setAssignments] = useState<Assignments>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 200)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const fetchAssignments = async () => {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from("assignments")
                .select("*")
                .order("due_date", { ascending: true });
            if (error) {
                console.error(error);
                setIsLoading(false);
                return;
            }
            const sorted = (data as Assignments).slice().sort((a, b) => {
                const aDue = new Date(a.due_date).getTime();
                const bDue = new Date(b.due_date).getTime();
                if (aDue !== bDue) return aDue - bDue;
                const aProgress = a.total_tasks ? a.tasks_completed / a.total_tasks : 0;
                const bProgress = b.total_tasks ? b.tasks_completed / b.total_tasks : 0;
                return bProgress - aProgress;
            });
            setAssignments(sorted);
            setTimeout(() => setIsLoading(false), 500);
        };
    fetchAssignments();
    }, []);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}>
                        <AssignmentCardSkeleton />
                    </div>
                ))}
            </div>
        )
    }

    if (!isLoading && assignments.length === 0) {
        return (
            <div className="mx-auto max-w-xl text-center rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-10 shadow-sm">
                <div className="text-neutral-600 text-base">No assignments yet</div>
                <div className="mt-3 text-neutral-500 text-sm">Create your first assignment to start tracking.</div>
                <div className="mt-6">
                    <Link href="/dashboard/assignments/new">
                        <Button className="rounded-full px-5 py-2.5">Add Assignment</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
        {assignments.map((assignment, index) => (
        <div
          key={assignment.id}
          className={`transform transition-all duration-700 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: `${index * 80}ms`,
          }}
        >
          <AssignmentCard assignment={assignment} />
        </div>
      ))}
    </div>
  )
}
