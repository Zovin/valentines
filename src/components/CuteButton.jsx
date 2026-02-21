import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export function CuteButton({ href, children }) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
        <Link href={href}>
            <motion.span
                className="inline-block cursor-pointer rounded-full bg-primary px-8 py-3 font-sans text-lg font-semibold text-primary-foreground shadow-lg"
                whileHover={{ scale: 1.08, boxShadow: "0 8px 30px rgba(242,166,179,0.35)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
                {children}
            </motion.span>
        </Link>
    </motion.div>
  )
}
