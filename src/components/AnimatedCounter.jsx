import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

function AnimatedNumber({ value, className }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, (v) => Math.floor(v))
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setCurrent(v))
    return unsubscribe
  }, [display])

  return <span className={className}>{current.toLocaleString()}</span>
}

export function DaysCounter() {
  const startDate = new Date("2024-08-08T18:00:00") // Set your start date here
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calculate() {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setElapsed({ days, hours, minutes, seconds })
    }
    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-border/50 bg-card/80 px-8 py-10 shadow-xl backdrop-blur-sm"
    >
      <p className="font-sans text-base text-muted-foreground md:text-lg">
        We have been together for
      </p>

      <div className="flex flex-col items-center gap-1">
        <AnimatedNumber
          value={elapsed.days}
          className="font-serif text-7xl font-bold text-primary md:text-8xl"
        />
        <p className="font-sans text-sm font-medium tracking-widest text-muted-foreground uppercase">
          days
        </p>
      </div>

      <div className="flex items-center gap-6">
        <TimeUnit label="Hours" value={elapsed.hours} />
        <span className="text-2xl text-primary/40">:</span>
        <TimeUnit label="Minutes" value={elapsed.minutes} />
        <span className="text-2xl text-primary/40">:</span>
        <TimeUnit label="Seconds" value={elapsed.seconds} />
      </div>
    </motion.div>
  )
}

function TimeUnit({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-serif text-3xl font-bold text-foreground md:text-4xl"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  )
}