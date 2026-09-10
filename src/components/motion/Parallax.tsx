import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  /** Amplitude du décalage en pixels (négatif = remonte plus vite). */
  distance?: number
  className?: string
}

/** Déplace son contenu à contre-courant du scroll. */
const Parallax = ({ children, distance = -60, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const raw = useTransform(scrollYProgress, [0, 1], [-distance, distance])
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.5 })

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  )
}

export default Parallax
