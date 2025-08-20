"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  endTime: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "urgent" | "minimal"
  className?: string
  onExpire?: () => void
}

export function CountdownTimer({
  endTime,
  size = "md",
  variant = "default",
  className,
  onExpire,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const diff = end - now

      if (diff <= 0) {
        setIsExpired(true)
        onExpire?.()
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime, onExpire])

  const sizeClasses = {
    sm: "text-xs px-1 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-3 py-2",
  }

  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    urgent: "bg-red-100 text-red-800 animate-pulse",
    minimal: "bg-transparent text-current",
  }

  if (isExpired) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded font-bold",
          sizeClasses[size],
          "bg-gray-300 text-gray-600",
          className,
        )}
      >
        마감
      </div>
    )
  }

  return (
    <div className={cn("inline-flex items-center space-x-1", className)}>
      {timeLeft.days > 0 && (
        <div className={cn("rounded font-bold", sizeClasses[size], variantClasses[variant])}>{timeLeft.days}일</div>
      )}
      <div className={cn("rounded font-bold", sizeClasses[size], variantClasses[variant])}>
        {String(timeLeft.hours).padStart(2, "0")}시간
      </div>
      <div className={cn("rounded font-bold", sizeClasses[size], variantClasses[variant])}>
        {String(timeLeft.minutes).padStart(2, "0")}분
      </div>
      <div className={cn("rounded font-bold", sizeClasses[size], variantClasses[variant])}>
        {String(timeLeft.seconds).padStart(2, "0")}초
      </div>
    </div>
  )
}
