"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import confetti from "canvas-confetti"
import { MindMapCard } from "./canvas-card"
import { CardModal } from "./canvas-modal"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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

export function MindMapCanvas({ tasks, focusIndex, total_completed }: { tasks: CardData[], focusIndex: number, total_completed: number }) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [focusedIndex, setFocusedIndex] = useState(focusIndex)
  const [cards, setCards] = useState<CardData[]>([])
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isAnimatingPan, setIsAnimatingPan] = useState(false)
  const [showFinalCelebration, setShowFinalCelebration] = useState(false)

  const checkCollisionForNewCard = (x: number, y: number, existingCards: CardData[]) => {
    const cardWidth = 288
    const cardHeight = 120
    const padding = 20

    return existingCards.some((card) => {
      const dx = Math.abs(card.x - x)
      const dy = Math.abs(card.y - y)
      return dx < cardWidth + padding && dy < cardHeight + padding
    })
  }

  useEffect(() => {
    const generatedCards: CardData[] = []

    tasks.forEach((card, index) => {
      let x, y
      let attempts = 0
      const maxAttempts = 100

      do {
        x = Math.random() * 400 - 200
        y = -index * 300 - Math.random() * 30
        attempts++
      } while (attempts < maxAttempts && checkCollisionForNewCard(x, y, generatedCards))

      generatedCards.push({ ...card, x, y })
    })

    setCards(generatedCards)

    if (canvasRef.current) {
      canvasRef.current.focus()
    }
  }, [tasks])

  const animatePanToCard = useCallback(
    (cardIndex: number) => {
      if (!canvasRef.current || cardIndex >= cards.length) return

      const card = cards[cardIndex]
      const canvas = canvasRef.current
      const canvasRect = canvas.getBoundingClientRect()

      const targetX = canvasRect.width / 2 - (card.x + 400 + 144)
      const targetY = canvasRect.height / 2 - (card.y + 600 + 60)

      setIsAnimatingPan(true)

      const startPan = { ...pan }
      const startTime = Date.now()
      const duration = 800

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        const easeOutCubic = 1 - Math.pow(1 - progress, 3)

        setPan({
          x: startPan.x + (targetX - startPan.x) * easeOutCubic,
          y: startPan.y + (targetY - startPan.y) * easeOutCubic,
        })

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsAnimatingPan(false)
        }
      }

      requestAnimationFrame(animate)
    },
    [cards, pan],
  )

  useEffect(() => {
    setFocusedIndex(focusIndex)
    animatePanToCard(focusIndex)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && focusedIndex > 0) {
        const newIndex = focusedIndex - 1
        setFocusedIndex(newIndex)
        animatePanToCard(newIndex)
      } else if (e.key === "ArrowUp" && focusedIndex < cards.length - 1) {
        const newIndex = focusedIndex + 1
        setFocusedIndex(newIndex)
        animatePanToCard(newIndex)
      }
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener("keydown", handleKeyDown)
      return () => canvas.removeEventListener("keydown", handleKeyDown)
    }
  }, [focusedIndex, animatePanToCard, cards.length])

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      if (cardIndex === focusedIndex) {
        setSelectedCard(cards[cardIndex])
        setSelectedIndex(cardIndex)
      } else {
        setFocusedIndex(cardIndex)
        animatePanToCard(cardIndex)
      }
    },
    [focusedIndex, cards, animatePanToCard],
  )

  const renderConnections = () => {
    if (cards.length < 2) return null

    return (
      <svg className="absolute inset-0 pointer-events-none w-full h-full">
        {cards.slice(0, -1).map((card, index) => {
          const nextCard = cards[index + 1]
          const startX = card.x + 144 + 400 + pan.x
          const startY = card.y + 60 + 600 + pan.y
          const endX = nextCard.x + 144 + 400 + pan.x
          const endY = nextCard.y + 60 + 600 + pan.y

          return (
            <line
              key={`connection-${index}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="rgb(99 102 241)"
              strokeWidth="2"
              strokeDasharray="6,3"
              opacity="0.6"
            />
          )
        })}
      </svg>
    )
  }

  const renderBackgroundGrid = () => (
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `radial-gradient(circle, rgb(148 163 184) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        transform: `translate(${pan.x % 40}px, ${pan.y % 40}px)`,
      }}
    />
  )

  const handleCompleted = useCallback((id: number) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, completed: true } : c))
    let allDone = true
    for (const card of cards) {
        if (card.id > id) {
            allDone = false
            break
        }
    }
    if (allDone) {
      setShowFinalCelebration(true)
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } })
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.2 } })
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.8 } })
      setTimeout(() => {
        confetti({ particleCount: 250, spread: 100, origin: { y: 0.3 } })
      }, 400)
      setTimeout(() => {
        confetti({ particleCount: 300, spread: 120, origin: { y: 0.8 } })
      }, 800)
    }
  }, [cards])

  const dayNumberFromYMD = (y: number, m: number, d: number) => Math.floor(Date.UTC(y, m - 1, d) / 86400000)
  const todayDayNumber = () => {
    const now = new Date()
    return dayNumberFromYMD(now.getFullYear(), now.getMonth() + 1, now.getDate())
  }

  const baseCompleted = total_completed
  const localCompletedCount = cards.reduce((acc, c, idx) => acc + ((idx >= baseCompleted && c.completed) ? 1 : 0), 0)
  const effectiveCompleted = baseCompleted + localCompletedCount

  return (
    <div className="relative h-full w-full bg-slate-50">
      {renderBackgroundGrid()}

      <div className="absolute left-4 z-40 bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg max-w-md pointer-events-auto top-48 sm:top-20">
        <div className="sm:hidden text-xs font-medium text-slate-700">Tap to navigate</div>
        <div className="hidden sm:block">
          <h3 className="font-semibold text-sm text-slate-800 mb-2">Navigation</h3>
          <div className="text-xs text-slate-600 space-y-1">
            <div>• Click on cards to focus</div>
            <div>• Click again to open details</div>
            <div>• ↑↓ arrows to navigate cards</div>
          </div>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="h-full w-full overflow-hidden outline-none"
        onContextMenu={(e) => e.preventDefault()}
        tabIndex={0}
      >
        {renderConnections()}

        <div
          className={`absolute inset-0 z-0 ${isAnimatingPan ? "" : "transition-transform duration-200 ease-out"}`}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          {cards.map((card, index) => {
            const [yy, mm, dd] = card.due_date.split("-").map(Number)
            const isOverdue = dayNumberFromYMD(yy, mm, dd) < todayDayNumber()
            return (
              <MindMapCard
                key={card.id}
                card={card}
                isFocused={index === focusedIndex}
                isComplete={effectiveCompleted > index}
                isOverdue={isOverdue}
                onClick={() => handleCardClick(index)}
                style={{
                  position: "absolute",
                  left: card.x + 400,
                  top: card.y + 600,
                  pointerEvents: "auto",
                }}
              />
            )
          })}
        </div>
      </div>

      {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} onCompleted={handleCompleted} canComplete={selectedIndex === effectiveCompleted} />}

      {showFinalCelebration && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white text-black">
          <div className="text-center px-6">
            <div className="text-3xl sm:text-4xl font-bold mb-2">All Done!</div>
            <div className="text-black mb-4">Great job finishing your assignment.</div>
            <Link href="/dashboard" className="mt-4">
                <Button variant="default" onClick={() => confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } })}>Go to Dashboard<ArrowRight className="w-4 h-4" /></Button>

            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
