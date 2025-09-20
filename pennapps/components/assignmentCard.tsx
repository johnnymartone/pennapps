"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Assignment {
  id: number
  name: string
  tasks_completed: number
  total_tasks: number
  due_date: string
}

interface AssignmentCardProps {
  assignment: Assignment
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "Due tomorrow"
    return `Due in ${diffDays} days`
  }

  const getProgressColor = (completed: number) => {
    if (completed === 100) return "bg-green-500"
    if (completed >= 75) return "bg-blue-500"
    if (completed >= 50) return "bg-orange-500"
    return "bg-gray-400"
  }

  const isOverdue = new Date(assignment.due_date) < new Date()
  const isDueToday = formatDueDate(assignment.due_date) === "Due today"

  return (
    <Card
      className={`group cursor-pointer transition-all duration-500 ease-out shadow-md hover:shadow-xl hover:shadow-black/5 hover:scale-[1.02] bg-white/70 backdrop-blur ring-1 ring-gray-200 hover:bg-white ${
        isOverdue ? "ring-red-200" : ""
      } ${isDueToday ? "ring-blue-200" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        router.push(`/dashboard/assignments/${assignment.id}`)
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {assignment.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <BookOpen className="w-4 h-4" />
          <span>Test</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Progress</span>
            <span className="font-semibold text-gray-900">{assignment.tasks_completed}/{assignment.total_tasks}</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(100 * (assignment.tasks_completed / assignment.total_tasks))}`}
                style={{
                  width: isHovered ? `${100 * (assignment.tasks_completed / assignment.total_tasks)}%` : "0%",
                  transitionDelay: isHovered ? "150ms" : "0ms",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span
              className={`font-medium ${isOverdue ? "text-red-600" : isDueToday ? "text-blue-600" : "text-gray-600"}`}
            >
              {formatDueDate(assignment.due_date)}
            </span>
          </div>

          {assignment.tasks_completed === assignment.total_tasks && (
            <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Complete
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}