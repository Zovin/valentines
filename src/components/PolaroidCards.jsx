"use client"

import { motion } from "framer-motion"
import { useMemo, useState } from "react"


export function PolaroidCard({ src, caption, index }) {
  const rotation = useMemo(
    () => (index % 2 === 0 ? -3 : 3) + (Math.random() - 0.5) * 4,
    [index]
  )
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation * 2 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        y: -8,
        zIndex: 10,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-grab active:cursor-grabbing"
      style={{ rotate: `${rotation}deg` }}
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      dragElastic={0.1}
    >
      {/* Paper texture outer frame */}
      <div
        className="relative overflow-hidden rounded-sm"
        style={{
          padding: "10px 10px 10px 10px",
          background: "linear-gradient(145deg, #f5f0e8, #e8e0d4, #f2ece3)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.35), inset 0 0 30px rgba(0,0,0,0.03)"
            : "0 4px 16px rgba(0,0,0,0.25), inset 0 0 30px rgba(0,0,0,0.03)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Subtle paper grain effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Photo with hover overlay */}
        <div className="relative w-48 md:w-56 bg-[#e2dbd0] rounded-lg overflow-hidden flex items-center justify-center min-h-[200px] max-h-[300px]">
        <img
            src={src}
            alt={caption}
            className="w-full h-full object-contain"
        />

        {/* Hover overlay */}
        <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 flex items-end"
            style={{
            background:
                "linear-gradient(to top, rgba(31,61,43,0.88) 0%, rgba(31,61,43,0.5) 50%, transparent 100%)",
            }}
        >
            <p className="w-full px-4 pb-4 font-serif text-sm leading-snug text-foreground md:text-base">
            {caption}
            </p>
        </motion.div>
        </div>
      </div>

        {/* Tape piece decoration on some cards */}
        {index % 3 === 0 && (
        <div
            className="absolute -top-3 left-1/2 -translate-x-1/2"
            style={{
            width: "48px",
            height: "16px",
            background: "rgba(242,166,179,0.25)",
            transform: `translateX(-50%) rotate(${index % 2 === 0 ? -2 : 2}deg)`,
            borderRadius: "1px",
            backdropFilter: "blur(1px)",
            }}
        />
        )}

        {index % 3 === 1 && (
        <div
            className="absolute -top-3 -right-2"
            style={{
            width: "40px",
            height: "16px",
            background: "rgba(242,166,179,0.2)",
            borderRadius: "1px",
            backdropFilter: "blur(1px)",
            transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
            }}
        />
        )}

        {index % 3 === 2 && (
        <div
            className="absolute -top-3 left-2"
            style={{
            width: "40px",
            height: "16px",
            background: "rgba(242,166,179,0.22)",
            borderRadius: "1px",
            backdropFilter: "blur(1px)",
            transform: `rotate(${index % 2 === 0 ? 1 : -1}deg)`,
            }}
        />
)}

      
    </motion.div>
  )
}
