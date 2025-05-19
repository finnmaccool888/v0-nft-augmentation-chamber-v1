import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn("relative bg-black border border-red-500/30 rounded-none p-4 shadow-lg", className)}>
      {/* Cyberpunk card corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-500"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-500"></div>

      {children}
    </div>
  )
}
