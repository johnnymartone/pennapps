"use client"

import type React from "react"

import { Card } from "@/components/ui/card"

interface CardData {
  id: number
  title: string
  description: string
  x: number
  y: number
}

interface MindMapCardProps {
  card: CardData
  isFocused: boolean
  onClick: () => void
  style: React.CSSProperties
}

export function MindMapCard({ card, isFocused, onClick, style }: MindMapCardProps) {
  return (
    <Card
      className={`
        w-72 p-4 cursor-pointer transition-all duration-300 ease-out select-none
        hover:shadow-xl hover:scale-105 hover:-translate-y-1
        ${
          isFocused
            ? "ring-2 ring-blue-500 shadow-xl scale-105 bg-blue-50/50"
            : "bg-white/90 backdrop-blur-sm hover:bg-white"
        }
      `}
      style={style}
      onClick={onClick}
    >
      <div className="space-y-2">
        <h3 className={`font-semibold text-lg leading-tight ${isFocused ? "text-blue-900" : "text-slate-800"}`}>
          {card.title}
        </h3>
        <p className={`text-sm leading-relaxed ${isFocused ? "text-blue-700" : "text-slate-600"}`}>
          {card.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className={`text-xs font-medium ${isFocused ? "text-blue-600" : "text-slate-400"}`}>
            Card #{card.id + 1}
          </span>
          {isFocused && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
        </div>
      </div>
    </Card>
  )
}
