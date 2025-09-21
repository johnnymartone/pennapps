"use client"

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

  const getGradientColors = (percent: number) => {
    if (percent >= 90) return { from: "#22c55e", to: "#16a34a" }
    if (percent >= 75) return { from: "#06b6d4", to: "#3b82f6" }
    if (percent >= 50) return { from: "#f59e0b", to: "#22c55e" }
    return { from: "#ef4444", to: "#f59e0b" }
  }

  const { y, m, d } = ((s: string) => { const [yy, mm, dd] = s.split("-").map(Number); return { y: yy, m: mm, d: dd } })(assignment.due_date)
  const diffDays = dayNumberFromYMD(y, m, d) - todayDayNumber()
  const isOverdue = diffDays < 0
  const isDueToday = diffDays === 0

  const progress = assignment.total_tasks ? assignment.tasks_completed / assignment.total_tasks : 0
  const percent = Math.round(progress * 100)
  const size = 188
  const strokeWidth = 18
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const colors = getGradientColors(percent)
  const gradientId = `progressGradient-${assignment.id}`

  return (
    <div
      className={`group cursor-pointer transition-all duration-500 ease-out rounded-2xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md ring-1 ring-neutral-200/70 shadow-lg hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 ${
        isOverdue ? "ring-red-200" : ""
      } ${isDueToday ? "ring-blue-200" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        router.push(`/dashboard/assignments/${assignment.id}`)
      }}
    >
      <div className="p-6">
        <div className="flex flex-col items-center gap-5">
          <div className="relative" style={{ width: size, height: size }}>
            <div
              className="absolute -inset-3 rounded-full blur-2xl opacity-40"
              style={{ background: `radial-gradient(60% 60% at 50% 50%, ${colors.to}33, transparent 70%)` }}
            />
            <svg width={size} height={size} className="block">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={colors.from} />
                  <stop offset="100%" stopColor={colors.to} />
                </linearGradient>
              </defs>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="text-neutral-200"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                style={{ transition: "stroke-dashoffset 700ms ease-out", transitionDelay: isHovered ? "150ms" : "0ms" }}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold text-neutral-900">{percent}%</span>
            </div>
          </div>

          <div className="text-[13px] sm:text-sm text-neutral-500 font-medium">
            {assignment.tasks_completed}/{assignment.total_tasks} tasks
          </div>

          <h3 className="text-xl sm:text-[1.35rem] font-semibold tracking-tight text-neutral-900 leading-snug text-center line-clamp-2">
            {assignment.name}
          </h3>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-neutral-400" />
            <span
              className={`font-medium ${isOverdue ? "text-red-600" : isDueToday ? "text-blue-600" : "text-gray-600"}`}
            >
              {formatDueDate(assignment.due_date)}
            </span>
          </div>

          {assignment.tasks_completed === assignment.total_tasks && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium rounded-full bg-green-50 text-green-700 ring-1 ring-green-200 px-2.5 py-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
              Complete
            </div>
          )}
        </div>
      </div>
    </div>
  )
}