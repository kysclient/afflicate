import { cn } from "@/lib/utils";

interface SpecialOfferLabelProps {
  type: "flash" | "limited" | "bestseller" | "new" | "exclusive";
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SpecialOfferLabel({
  type,
  text,
  size = "md",
  className,
}: SpecialOfferLabelProps) {
  const typeConfig = {
    flash: {
      bg: "bg-gradient-to-r from-red-500 to-pink-500",
      text: text || "번개세일",
      icon: "⚡",
      animation: "animate-pulse",
    },
    limited: {
      bg: "bg-gradient-to-r from-orange-500 to-red-500",
      text: text || "한정특가",
      icon: "🔥",
      animation: "",
    },
    bestseller: {
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
      text: text || "베스트",
      icon: "👑",
      animation: "",
    },
    new: {
      bg: "bg-gradient-to-r from-green-500 to-blue-500",
      text: text || "신상품",
      icon: "✨",
      animation: "",
    },
    exclusive: {
      bg: "bg-gradient-to-r from-purple-500 to-pink-500",
      text: text || "독점특가",
      icon: "💎",
      animation: "",
    },
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const config = typeConfig[type];

  return (
    <div
      className={cn(
        "inline-flex items-center space-x-1 text-white font-bold rounded-full",
        config.bg,
        config.animation,
        sizeClasses[size],
        className
      )}
    >
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </div>
  );
}
