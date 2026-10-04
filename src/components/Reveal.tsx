import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/** Fade + rise on first viewport entry. Skipped for reduced-motion users. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={`min-w-0 ${className}`}>{children}</div>

  return (
    <motion.div
      className={`min-w-0 ${className}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
