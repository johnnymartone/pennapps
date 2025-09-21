"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { CalendarDays, Clock, CheckCircle2, FileText } from "lucide-react"

interface CardData {
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

interface MindMapCardProps {
  card: CardData
  isFocused: boolean
  isComplete: boolean
  isOverdue: boolean
  onClick: () => void
  style: React.CSSProperties
}

export function MindMapCard({ card, isFocused, isComplete, isOverdue, onClick, style }: MindMapCardProps) {
  const done = isComplete || card.completed
  const statusClasses = done
    ? "bg-green-500 ring-2 ring-green-600 text-white"
    : isFocused
      ? "bg-blue-50 ring-4 ring-blue-500"
      : isOverdue
        ? "bg-red-50 ring-2 ring-red-500"
        : "bg-white/80 hover:bg-white ring-1 ring-slate-200"
  const titleColor = done ? "text-white" : isFocused ? "text-blue-900" : isOverdue ? "text-red-900" : "text-slate-800"
  const descColor = done ? "text-green-100" : isFocused ? "text-blue-700" : isOverdue ? "text-red-700" : "text-slate-600"
  const badgeColor = done ? "bg-green-600 text-white ring-green-300" : isFocused ? "bg-blue-100 text-blue-700 ring-blue-200" : isOverdue ? "bg-red-100 text-red-700 ring-red-200" : "bg-slate-100 text-slate-700 ring-slate-200"
  const iconColor = done ? "text-white" : isFocused ? "text-blue-600" : isOverdue ? "text-red-600" : "text-slate-800"
  return (
    <Card
      className={`w-72 p-4 cursor-pointer transition-all duration-300 ease-out select-none hover:shadow-xl hover:scale-105 hover:-translate-y-1 ${statusClasses}`}
      style={style}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full ring-1 ${badgeColor}`}>
          <FileText className="w-3.5 h-3.5" />
          <span className="uppercase tracking-wide">{card.type}</span>
        </div>
        {(isComplete || card.completed) && (
          <div className={`flex items-center gap-1 ${done ? "text-white" : "text-green-700"}`}>
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}
      </div>

      <h3 className={`mt-3 font-semibold text-lg leading-tight ${titleColor}`}>
        {card.name}
      </h3>

      <p className={`mt-2 text-sm leading-relaxed line-clamp-3 ${descColor}`}>
        {card.description}
      </p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className={`flex items-center gap-2 ${descColor}`}>
          <CalendarDays className={`w-4 h-4 ${iconColor}`} />
          <span>{card.due_date}</span>
        </div>
        <div className={`flex items-center gap-2 ${descColor}`}>
          <Clock className={`w-4 h-4 ${iconColor}`} />
          <span>{card.time_estimate}m</span>
        </div>
      </div>
    </Card>
  )
}
