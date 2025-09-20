"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MindMapCard } from "./canvas-card"
import { CardModal } from "./canvas-modal"

interface CardData {
  id: number
  title: string
  description: string
  x: number
  y: number
}

export function MindMapCanvas({ tasks, assignmentName, dueDate, focusIndex }: { tasks: CardData[], assignmentName: string, dueDate: string, focusIndex: number }) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [focusedIndex, setFocusedIndex] = useState(focusIndex)
  const [cards, setCards] = useState<CardData[]>([])
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const [isAnimatingPan, setIsAnimatingPan] = useState(false)

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
        x = Math.random() * 400 - 200 // Reduced horizontal scatter
        y = -index * 180 - Math.random() * 30 // Increased vertical spacing from 120 to 180
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

      const targetX = canvasRect.width / 2 - (card.x + 400 + 144) // 144 is half card width
      const targetY = canvasRect.height / 2 - (card.y + 600 + 60) // 60 is half card height

      setIsAnimatingPan(true)

      const startPan = { ...pan }
      const startTime = Date.now()
      const duration = 800 // 800ms animation

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && focusedIndex > 0) {
        const newIndex = focusedIndex - 1
        setFocusedIndex(newIndex)
        animatePanToCard(newIndex)
      } else if (e.key === "ArrowDown" && focusedIndex < cards.length - 1) {
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
  }, [focusedIndex, cards.length, animatePanToCard])

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      if (cardIndex === focusedIndex) {
        // If clicking on focused card, open modal
        setSelectedCard(cards[cardIndex])
      } else {
        // If clicking on unfocused card, focus it
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
          const startX = card.x + 144 + 400 + pan.x // Include pan offset
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

  return (
    <div className="relative h-full w-full bg-slate-50">
      {renderBackgroundGrid()}

      <div className="absolute top-20 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold text-sm text-slate-800 mb-2">Navigation</h3>
        <div className="text-xs text-slate-600 space-y-1">
          <div>• Click unfocused cards to focus</div>
          <div>• Click focused card to open modal</div>
          <div>• ↑↓ arrows to navigate cards</div>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="h-full w-full overflow-hidden outline-none"
        onContextMenu={(e) => e.preventDefault()}
        tabIndex={0} // Add tabIndex to make canvas focusable
      >
        {renderConnections()}

        <div
          className={`absolute inset-0 ${isAnimatingPan ? "" : "transition-transform duration-200 ease-out"}`}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          {cards.map((card, index) => (
            <MindMapCard
              key={card.id}
              card={card}
              isFocused={index === focusedIndex}
              onClick={() => handleCardClick(index)}
              style={{
                position: "absolute",
                left: card.x + 400,
                top: card.y + 600,
                pointerEvents: "auto",
              }}
            />
          ))}
        </div>
      </div>

      {selectedCard && <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </div>
  )
}
