import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return <div className={cn("bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-lg", className)}>{children}</div>
}
