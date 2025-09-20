"use client"
import { X } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CardData {
  id: number
  title: string
  description: string
  x: number
  y: number
}

interface CardModalProps {
  card: CardData
  onClose: () => void
}

export function CardModal({ card, onClose }: CardModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800 pr-4">{card.title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">{card.description}</p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-sm font-medium text-slate-400">Card #{card.id + 1}</span>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
