"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { cn } from "@/lib/utils"

type AnimatedOnLoadProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  delay?: number
  durationMs?: number
  variant?: "fade-up" | "fade-in" | "scale-in"
}

export default function AnimatedOnLoad({
  as = "div",
  className,
  children,
  delay = 0,
  durationMs = 500,
  variant = "fade-up",
}: AnimatedOnLoadProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 10)
    return () => clearTimeout(id)
  }, [])

  const initialByVariant =
    variant === "fade-in"
      ? "opacity-0"
      : variant === "scale-in"
      ? "opacity-0 scale-95"
      : "opacity-0 translate-y-3"

  const mountedByVariant =
    variant === "fade-in"
      ? "opacity-100"
      : variant === "scale-in"
      ? "opacity-100 scale-100"
      : "opacity-100 translate-y-0"

  const Comp = as as React.ElementType

  return (
    <Comp
      className={cn(
        "will-change-transform transition-all ease-out",
        mounted ? mountedByVariant : initialByVariant,
        className
      )}
      style={{ transitionDuration: `${durationMs}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  )
}


