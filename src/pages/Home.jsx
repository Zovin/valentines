import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Typewriter from "../components/Typewriter"
import FloatingHearts from "../components/FloatingHearts"
import { CuteButton } from "../components/CuteButton"


export default function Home() {
    const [showButton, setShowButton] = useState(false)

    return (
        <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-6">
            <FloatingHearts />

            <div className="relative z-10 flex flex-col items-center gap-8">
                <Typewriter onComplete={() => {
                    console.log("complete")
                    setShowButton(true)
                }} />

                <AnimatePresence>
                {showButton && (
                    <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <CuteButton href="/timeline">Click me</CuteButton>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </main>
    )




}