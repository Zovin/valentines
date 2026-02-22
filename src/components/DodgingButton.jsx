import { useState, useCallback } from "react"
import { motion } from "framer-motion"

export default function DodgingButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const dodge = useCallback(() => {
    const x = (Math.random() - 0.5) * 300
    const y = (Math.random() - 0.5) * 200
    setPosition({ x, y })
  }, [])

  return (
    <motion.button
      className="rounded-full bg-muted px-8 py-3 font-sans text-lg font-semibold text-muted-foreground shadow-md"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      onHoverStart={dodge}
      onTouchStart={dodge}
    >
      No
    </motion.button>
  )
}
