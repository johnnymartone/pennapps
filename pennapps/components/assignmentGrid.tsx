"use client"

import { AssignmentCard } from "@/components/assignmentCard"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client";

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
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 200)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const fetchAssignments = async () => {
            const supabase = await createClient();
            const { data, error } = await supabase.from("assignments").select("*");
            if (error) {
                console.error(error);
                return;
            }
            setAssignments(data as Assignments);
        };
    fetchAssignments();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
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
