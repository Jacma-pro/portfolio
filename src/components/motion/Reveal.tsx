import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { EASE, DUR } from '../../motion/variants'

type Direction = 'up' | 'in' | 'left' | 'right' | 'scale'

/** Balises autorisées — un <div> dans un <ul> serait du HTML invalide. */
const TAGS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  section: motion.section,
}

type Tag = keyof typeof TAGS

const OFFSET: Record<Direction, Record<string, number>> = {
  up:    { y: 26 },
  in:    {},
  left:  { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.94 },
}

interface Props {
  children: ReactNode
  /** Sens d'arrivée de l'élément. */
  direction?: Direction
  delay?: number
  /** Part de l'élément visible avant de déclencher (0 → 1). */
  amount?: number
  className?: string
  /** Rejoue l'animation à chaque passage. Par défaut : une seule fois. */
  repeat?: boolean
  /** Balise rendue. `div` par défaut. */
  as?: Tag
}

/** Enveloppe un bloc et le fait apparaître quand il entre dans le viewport. */
const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  amount = 0.25,
  className,
  repeat = false,
  as = 'div',
}: Props) => {
  const reduced = useReducedMotion()
  const Component = TAGS[as]

  // Le délai est porté par la variante : une transition définie au niveau
  // d'une variante l'emporte sur la prop `transition`.
  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2, delay } },
      }
    : {
        hidden: { opacity: 0, ...OFFSET[direction] },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: DUR.slow, ease: EASE.outExpo, delay },
        },
      }

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount }}
    >
      {children}
    </Component>
  )
}

export default Reveal
