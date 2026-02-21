import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const lines = [
  "Happy Valentines",
  "to the loveliest person in the world",
  "Jesslyn",
]

export default function Typewriter({ onComplete }: { onComplete: () => void }) {
    const [currentLine, setCurrentLine] = useState(0)
    const [currentChar, setCurrentChar] = useState(0)
    const [displayedLines, setDisplayedLines] = useState<string[]>([])
    const [done, setDone] = useState(false)

    // const handleComplete = useCallback(onComplete, [onComplete])

    useEffect(() => {
        if (done) return

        if (currentLine >= lines.length) {
        const timeout = setTimeout(() => {
            setDone(true)
            onComplete()
        }, 800)
        return () => clearTimeout(timeout)
        }

        const line = lines[currentLine]
        if (currentChar < line.length) {
        const timeout = setTimeout(() => {
            setDisplayedLines((prev) => {
            const updated = [...prev]
            updated[currentLine] = (updated[currentLine] || "") + line[currentChar]
            return updated
            })
            setCurrentChar((c) => c + 1)
        }, 60)
        return () => clearTimeout(timeout)
        } else {
        const timeout = setTimeout(() => {
            setCurrentLine((l) => l + 1)
            setCurrentChar(0)
        }, 500)
        return () => clearTimeout(timeout)
        }
    }, [currentLine, currentChar, done])

    return (
        <div className="flex flex-col items-center gap-3 text-center">
            <AnimatePresence>
                {displayedLines.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={
                        i === 0
                            ? "font-serif text-4xl font-bold text-primary md:text-6xl"
                            : i === 2
                            ? "font-serif text-5xl font-bold text-primary md:text-7xl"
                            : "font-sans text-lg text-foreground/80 md:text-xl"
                        }
                    >
                        {line}
                        {i === currentLine && !done && (
                        <motion.span
                            className="ml-0.5 inline-block w-0.5 bg-primary"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            style={{ height: "1em" }}
                        />
                        )}
                    </motion.p>
                ))}
            </AnimatePresence>

                {done && (
                    <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-4 font-sans text-base text-muted-foreground md:text-lg"
                    >
                    I made something for you
                    </motion.p>
                )}
        </div>
  )
}