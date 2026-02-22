import FloatingHearts from "../components/FloatingHearts";
import { motion, AnimatePresence } from "framer-motion";
import DodgingButton from "../components/DodgingButton";
import { useRef, useState, useCallback, useEffect } from "react"
import { ScratchCard } from "../components/ScratchCard";


export default function Scratch() {
    const [isRevealed, setIsRevealed] = useState(false)
    const [accepted, setAccepted] = useState(false)
    const [cardSize, setCardSize] = useState({ w: 320, h: 200 })
    const containerRef = useRef(null)

    useEffect(() => {
        function updateSize() {
        const w = Math.min(window.innerWidth - 48, 360)
        const h = Math.round(w * 0.6)
        setCardSize({ w, h })
        }
        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [])

    const fireConfetti = useCallback(async () => {
        const confetti = (await import("canvas-confetti")).default
        const end = Date.now() + 3000

        const colors = ["#F2A6B3", "#E88DA1", "#F8F5F2", "#d4a0aa", "#4a7c5c"]

        function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.7 },
            colors,
        })
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.7 },
            colors,
        })
        if (Date.now() < end) requestAnimationFrame(frame)
        }
        frame()
    }, [])

    const handleYes = useCallback(() => {
        setAccepted(true)
        fireConfetti()
    }, [fireConfetti])

    return (
        <main
        ref={containerRef}
        className="relative flex min-h-svh flex-col items-center justify-center gap-8 overflow-hidden bg-background px-6 py-12"
        >
        <FloatingHearts />

        <div className="relative z-10 flex flex-col items-center gap-8">
            <AnimatePresence mode="wait">
            {!accepted ? (
                <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-6"
                >
                <h1 className="text-center font-serif text-3xl font-bold text-primary md:text-4xl">
                    {"I have something important to ask you\u2026"}
                </h1>

                <ScratchCard
                    width={cardSize.w}
                    height={cardSize.h}
                    onReveal={() => setIsRevealed(true)}
                />

                <AnimatePresence>
                    {isRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <motion.button
                        className="rounded-full bg-primary px-8 py-3 font-sans text-lg font-semibold text-primary-foreground shadow-lg"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 8px 30px rgba(242,166,179,0.35)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYes}
                        >
                        {"Yes \uD83D\uDC95"}
                        </motion.button>

                        <DodgingButton />
                    </motion.div>
                    )}
                </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div
                key="accepted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex flex-col items-center gap-4"
                >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl"
                    aria-hidden="true"
                >
                    {"\uD83D\uDC96"}
                </motion.div>
                <h1 className="text-center font-serif text-4xl font-bold text-primary md:text-5xl">
                    You just made me the happiest person alive.
                </h1>
                <p className="text-center font-sans text-lg text-muted-foreground">
                    {"I love you, Jesslyn \u2764\uFE0F"}
                </p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
        </main>
    )

}