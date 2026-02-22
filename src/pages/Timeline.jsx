import { DaysCounter } from "../components/AnimatedCounter";
import { CuteButton } from "../components/CuteButton";
import FloatingHearts from "../components/FloatingHearts";
import { motion } from "framer-motion";

export default function Timeline() {
    return (
        <main className="relative flex min-h-svh flex-col items-center justify-center gap-10 overflow-hidden bg-background px-6 py-12">
            <FloatingHearts/>

            <motion.div
                className="relative z-10 flex flex-col items-center gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <DaysCounter />
                <CuteButton href="/memories">See our memories</CuteButton>
            </motion.div>
        </main>
    )
}