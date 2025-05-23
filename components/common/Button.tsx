import type React from "react"
import type { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-none font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group tracking-wider",
  {
    variants: {
      variant: {
        primary: "bg-transparent text-white hover:bg-red-500/10 border border-red-500 shadow-sm shadow-red-900/20",
        secondary: "bg-transparent text-white hover:bg-red-500/10 border border-gray-800 hover:border-red-500/50",
        outline: "border border-red-500 text-red-500 hover:bg-red-500/10",
        ghost: "text-white hover:bg-gray-800",
        disabled: "bg-transparent text-gray-500 cursor-not-allowed border border-gray-800",
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
      {isLoading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
