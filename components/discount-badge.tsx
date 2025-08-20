import { cn } from "@/lib/utils"

interface DiscountBadgeProps {
  discountRate: number
  size?: "sm" | "md" | "lg"
  variant?: "default" | "flash" | "premium"
  className?: string
}

export function DiscountBadge({ discountRate, size = "md", variant = "default", className }: DiscountBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  }

  const variantClasses = {
    default: "bg-red-500 text-white",
    flash: "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse",
    premium: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center font-bold rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {discountRate}% OFF
    </div>
  )
}
