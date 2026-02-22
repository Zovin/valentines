import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ScratchCard({ width, height, onReveal }) {
  const canvasRef = useRef(null)
  const [isScratching, setIsScratching] = useState(false)
  const [revealed, setRevealed] = useState(false)

  // Draw the overlay
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ensure canvas size matches
    canvas.width = width
    canvas.height = height

    // Draw overlay after render
    requestAnimationFrame(() => {
      // Base overlay
      ctx.fillStyle = "#f5c542"
      ctx.fillRect(0, 0, width, height)

      // Sparkle shimmer
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = 1 + Math.random() * 3
        ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.random() * 0.4})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      // "Scratch me" text
      ctx.fillStyle = "rgba(139,90,43,0.7)"
      ctx.font = "bold 18px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Scratch me!", width / 2, height / 2)
    })
  }, [width, height])

  // Calculate scratched area %
  function getScratchPercent() {
    const canvas = canvasRef.current
    if (!canvas) return 0
    const ctx = canvas.getContext("2d")
    if (!ctx) return 0

    const imageData = ctx.getImageData(0, 0, width, height)
    const pixels = imageData.data
    let transparent = 0
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }
    return (transparent / (pixels.length / 4)) * 100
  }

  // Scratch function
  function scratch(clientX, clientY) {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 32, 0, Math.PI * 2)
    ctx.fill()

    const pct = getScratchPercent()
    if (pct > 70 && !revealed) {
      setRevealed(true)
      if (onReveal) onReveal()
    }
  }

  // Pointer and touch handlers
  function handlePointerDown() { setIsScratching(true) }
  function handlePointerUp() { setIsScratching(false) }
  function handlePointerMove(e) { if (isScratching) scratch(e.clientX, e.clientY) }
  function handleTouchMove(e) {
    if (!isScratching) return
    const touch = e.touches[0]
    scratch(touch.clientX, touch.clientY)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl" style={{ width, height }}>
      {/* Hidden message */}
      <div className="absolute inset-0 flex items-center justify-center bg-secondary">
        <p className="px-6 text-center font-serif text-3xl font-bold text-white md:text-4xl">
          Will you be my Valentines?
        </p>
      </div>

      {/* Scratch overlay */}
      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full cursor-pointer"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
            onTouchMove={handleTouchMove}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Scratch card overlay"
            role="img"
          />
        )}
      </AnimatePresence>
    </div>
  )
}