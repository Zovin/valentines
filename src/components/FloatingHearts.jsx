import { motion } from "framer-motion"
import { useMemo } from "react"

function HeartShape({ size, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 12 + Math.random() * 20,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 6,
        opacity: 0.06 + Math.random() * 0.09,
        color:
          i % 3 === 0
            ? "#F2A6B3"
            : i % 3 === 1
              ? "#E88DA1"
              : "#d4a0aa",
      })),
    []
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            opacity: heart.opacity,
          }}
          animate={{
            y: [
              typeof window !== "undefined" ? window.innerHeight + 50 : 900,
              -60,
            ],
            x: [0, Math.sin(heart.id) * 30, 0],
            rotate: [0, heart.id % 2 === 0 ? 20 : -20, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <HeartShape size={heart.size} color={heart.color} />
        </motion.div>
      ))}
    </div>
  )
}