import { cn } from "@/lib/utils"

interface PriceDisplayProps {
  originalPrice: number
  salePrice: number
  discountRate: number
  size?: "sm" | "md" | "lg"
  layout?: "horizontal" | "vertical"
  className?: string
}

export function PriceDisplay({
  originalPrice,
  salePrice,
  discountRate,
  size = "md",
  layout = "horizontal",
  className,
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: {
      sale: "text-lg",
      original: "text-sm",
      discount: "text-xs",
    },
    md: {
      sale: "text-xl",
      original: "text-base",
      discount: "text-sm",
    },
    lg: {
      sale: "text-2xl",
      original: "text-lg",
      discount: "text-base",
    },
  }

  const layoutClasses = {
    horizontal: "flex items-center space-x-2",
    vertical: "flex flex-col space-y-1",
  }

  const savings = originalPrice - salePrice

  return (
    <div className={cn(layoutClasses[layout], className)}>
      <div className="flex items-center space-x-2">
        <span className={cn("font-bold text-red-600", sizeClasses[size].sale)}>{salePrice.toLocaleString()}원</span>
        <span className={cn("text-muted-foreground line-through", sizeClasses[size].original)}>
          {originalPrice.toLocaleString()}원
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className={cn("text-red-500 font-semibold", sizeClasses[size].discount)}>{discountRate}% 할인</span>
        <span className={cn("text-green-600 font-medium", sizeClasses[size].discount)}>
          {savings.toLocaleString()}원 절약
        </span>
      </div>
    </div>
  )
}
