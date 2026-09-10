import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  /** Force d'attraction : 0.25 = le bouton suit un quart du déplacement. */
  strength?: number
  className?: string
}

/**
 * Le contenu est légèrement attiré par le curseur.
 * Neutralisé au clavier, au tactile et en mouvement réduit.
 */
const Magnetic = ({ children, strength = 0.25, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 20, mass: 0.5 })
  const y = useSpring(my, { stiffness: 260, damping: 20, mass: 0.5 })

  if (reduced) return <div className={className}>{children}</div>

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    my.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}

export default Magnetic
