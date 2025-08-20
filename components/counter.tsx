"use client"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"

export function Counter({ from = 0, to, duration = 2, className }: { from?: number; to: number; duration?: number; className?: string }) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, latest => Math.floor(latest))
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: v => setDisplay(Math.floor(v)),
    })
    return controls.stop
  }, [to, duration, count])

  return <motion.span className={className}>{display}</motion.span>
}