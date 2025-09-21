"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "lucide-react"
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

  const dayNumberFromYMD = (y: number, m: number, d: number) => Math.floor(Date.UTC(y, m - 1, d) / 86400000)
  const parseYMD = (s: string) => {
    const [y, m, d] = s.split("-").map(Number)
    return { y, m, d }
  }
  const todayDayNumber = () => {
    const now = new Date()
    return dayNumberFromYMD(now.getFullYear(), now.getMonth() + 1, now.getDate())
  }

  const formatDueDate = (dateString: string) => {
    const { y, m, d } = parseYMD(dateString.split("T")[0])
    const diffDays = dayNumberFromYMD(y, m, d) - todayDayNumber()
    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "Due tomorrow"
    return `Due in ${diffDays} days`
  }

  const getProgressColor = (completed: number) => {
    if (completed >= 90) return "bg-green-500"
    if (completed >= 75) return "bg-orange-300"
    if (completed >= 50) return "bg-yellow-400"
    return "bg-yellow-200"
  }

  const { y, m, d } = ((s: string) => { const [yy, mm, dd] = s.split("-").map(Number); return { y: yy, m: mm, d: dd } })(assignment.due_date)
  const diffDays = dayNumberFromYMD(y, m, d) - todayDayNumber()
  const isOverdue = diffDays < 0
  const isDueToday = diffDays === 0

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
          <h3 className={`font-medium text-gray-900 leading-tight line-clamp-2 group-hover:${getProgressColor(100 * (assignment.tasks_completed / assignment.total_tasks))} transition-colors duration-300`}>
            {assignment.name}
          </h3>
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
                  width: `${100 * (assignment.tasks_completed / assignment.total_tasks)}%`,
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