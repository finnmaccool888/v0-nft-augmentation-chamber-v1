import type React from "react"
import type { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-900/20 border border-red-500",
        secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 hover:border-cyan-500/50",
        outline: "border border-red-600 text-red-600 hover:bg-red-600/10",
        ghost: "text-white hover:bg-gray-800",
        disabled: "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  isLoading?: boolean
}

export default function Button({
  className,
  variant,
  size,
  children,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} disabled={disabled || isLoading} {...props}>
      {/* Cyberpunk button effect */}
      <span className="absolute inset-0 w-full h-full">
        <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75"></span>
        <span className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"></span>
        <span className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></span>
      </span>

      {isLoading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
