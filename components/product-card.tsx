import Link from "next/link";
import { cn } from "@/lib/utils";
import { DiscountBadge } from "./discount-badge";
import { SpecialOfferLabel } from "./special-offer-lable";
import { PriceDisplay } from "./price-display";
import { CountdownTimer } from "./countdown-timer";

interface Product {
  id: string;
  title: string;
  original_price: number;
  sale_price: number;
  discount_rate: number;
  image_url: string;
  rating: number;
  review_count: number;
  is_flash_sale?: boolean;
  flash_sale_end?: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
}

interface ProductCardProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  showTimer?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  size = "md",
  showTimer = true,
  className,
}: ProductCardProps) {
  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-sm",
    lg: "max-w-md",
  };

  const imageSizes = {
    sm: "h-40",
    md: "h-48",
    lg: "h-64",
  };

  return (
    <div
      className={cn(
        "bg-card rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 self-center",
        // sizeClasses[size],
        className
      )}
    >
      <div className="relative">
        <img
          src={product.image_url || "/placeholder.svg?height=250&width=250"}
          alt={product.title}
          className={cn("w-full object-cover", imageSizes[size])}
        />

        <div className="absolute top-2 left-2">
          <DiscountBadge
            discountRate={product.discount_rate}
            variant={
              product.is_flash_sale
                ? "flash"
                : product.discount_rate >= 70
                ? "premium"
                : "default"
            }
            size={size === "lg" ? "md" : "sm"}
          />
        </div>

        {product.is_flash_sale && (
          <div className="absolute top-2 right-2">
            <SpecialOfferLabel
              type="flash"
              size={size === "lg" ? "md" : "sm"}
            />
          </div>
        )}

        {product.discount_rate >= 70 && !product.is_flash_sale && (
          <div className="absolute top-2 right-2">
            <SpecialOfferLabel
              type="limited"
              size={size === "lg" ? "md" : "sm"}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        {product.categories && (
          <div className="text-xs text-muted-foreground mb-2">
            {product.categories.name}
          </div>
        )}

        <h3 className="font-semibold text-sm mb-3 line-clamp-2 h-10">
          {product.title}
        </h3>

        <PriceDisplay
          originalPrice={product.original_price}
          salePrice={product.sale_price}
          discountRate={product.discount_rate}
          size={size === "lg" ? "md" : "sm"}
          layout="vertical"
          className="mb-3"
        />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-yellow-500 text-sm">
            <span>★ {product.rating}</span>
            <span className="text-muted-foreground ml-1">
              ({product.review_count})
            </span>
          </div>
        </div>

        {product.is_flash_sale && product.flash_sale_end && showTimer && (
          <div className="mb-3 p-2 bg-red-50 rounded">
            <div className="text-xs text-red-600 font-medium mb-1">
              마감까지
            </div>
            <CountdownTimer
              endTime={product.flash_sale_end}
              size="sm"
              variant="urgent"
            />
          </div>
        )}

        <Link
          href={`/product/${product.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center flex items-center justify-center py-2 rounded-[12px] text-sm font-bold transition-colors"
        >
          상품 보기
        </Link>
      </div>
    </div>
  );
}
