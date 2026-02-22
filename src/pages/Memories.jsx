
import { motion } from "framer-motion"
import { CuteButton } from "../components/CuteButton"
import FloatingHearts from "../components/FloatingHearts"
import { PolaroidCard } from "../components/PolaroidCards"

const memories = [
  { src: "/assets/memory-1.jpg", caption: "Our first date" },
  { src: "/assets/memory-2.jpg", caption: "First time I walked you home after uni" },
  { src: "/assets/memory-3.jpg", caption: "The day you became my girlfriend" },
  { src: "/assets/memory-4.jpg", caption: "I missed you a lot and you sending me this pic made me really happy" },
  { src: "/assets/memory-5.jpg", caption: "No comment" },
  { src: "/assets/memory-6.jpg", caption: "Our last valentines" },
  { src: "/assets/memory-7.jpg", caption: "My favourite picture of us in Hobart" },
  { src: "/assets/memory-8.jpg", caption: "Us looking sad #1" },
  { src: "/assets/memory-9.jpg", caption: "Us looking sad #2" },
  
]

export default function Memories() {
  return (
        <main className="relative min-h-svh overflow-hidden bg-background px-6 py-12">
            <FloatingHearts />

            <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="mb-4 text-center font-serif text-4xl font-bold text-primary md:text-5xl">
                Our Memories
                </h1>
                <p className="mx-auto mb-12 max-w-md text-center text-sm text-muted-foreground">
                Hover to remember
                </p>

                <div className="mx-auto grid max-w-4xl grid-cols-1 place-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {memories.map((memory, i) => (
                    <PolaroidCard
                    key={i}
                    src={memory.src}
                    caption={memory.caption}
                    index={i}
                    />
                ))}
                </div>

                <div className="mt-12 flex justify-center">
                <CuteButton href="/scratch">
                    {"I have something to ask you\u2026"}
                </CuteButton>
                </div>
            </motion.div>
        </main>
  )
}
