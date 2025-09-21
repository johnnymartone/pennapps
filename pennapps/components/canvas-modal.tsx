"use client"
import { useEffect, useState } from "react"
import { Loader2, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import confetti from "canvas-confetti"
interface CardData {
  id: number
  name: string
  description: string
  due_date: string
  x: number
  y: number
  query: string | null
  scholar_query: string | null
}

interface CardModalProps {
  card: CardData
  onClose: () => void
  onCompleted?: (id: number) => void
  canComplete?: boolean
}

export function CardModal({ card, onClose, onCompleted, canComplete = true }: CardModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [postLoading, setPostLoading] = useState(false)

  const startClose = () => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => onClose(), 250)
  }

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true))
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener("keydown", handleKey)
    }
  }, [startClose])

  const postComplete = async () => {
    if (postLoading) return
    setPostLoading(true)
    if (!canComplete) return
    const response = await fetch("/api/complete-task", {
      method: "POST",
      body: JSON.stringify({ id: card.id }),
    })
    if (response.ok) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
      if (onCompleted) onCompleted(card.id)
      startClose()
    } else {
      setPostLoading(false)
    }
  }

  const overlayStateClass = isMounted && !isClosing ? "opacity-100" : "opacity-0"
  const panelStateClass = isMounted && !isClosing ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${overlayStateClass}`}
      onClick={(e) => {
        if (e.currentTarget === e.target) startClose()
      }}
      aria-modal="true"
      role="dialog"
    >
      <Card className={`w-full max-w-lg bg-white/95 supports-[backdrop-filter]:bg-white/80 shadow-2xl rounded-xl ring-1 ring-slate-200 transform-gpu transition-all duration-300 ${panelStateClass}`}>        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800">{card.name}</h2>
            <div className="flex items-center gap-2 -mt-2">
              {card.query && (
                <Button
                  onClick={() => {
                    const url = `https://www.google.com/search?q=${encodeURIComponent(card.query as string)}`
                    window.open(url, "_blank", "noopener,noreferrer")
                  }}
                  size="icon"
                  variant="link"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ring-1 ring-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
                </Button>
              )}
              {card.scholar_query && (
                <Button
                  onClick={() => {
                    const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(card.scholar_query as string)}`
                    window.open(url, "_blank", "noopener,noreferrer")
                  }}
                  size="icon"
                  variant="link"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ring-1 ring-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <Image src="/Google_Scholar_logo.svg" alt="Google Scholar" width={32} height={32} />
                </Button>
              )}
              <Button variant="link" onClick={startClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </Button>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">{card.description}</p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <span className="text-sm font-medium text-slate-400">{new Date(card.due_date).toLocaleDateString()}</span>
            <div className="flex gap-2">
              <Button
                onClick={startClose}
                variant="ghost"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Close
              </Button>
              <Button onClick={postComplete} disabled={!canComplete || postLoading} className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors">
                I Have Completed!
                {postLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
