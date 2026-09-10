import { Fragment } from 'react'
import { motion, useReducedMotion, type MotionProps, type Variants } from 'framer-motion'
import { EASE } from '../../motion/variants'
import './SplitText.scss'

interface Props {
  text: string
  /** Découpe par mot (par défaut) ou lettre par lettre. */
  by?: 'word' | 'char'
  delay?: number
  /** Écart entre deux unités, en secondes. */
  step?: number
  className?: string
  /** Déclenche à l'entrée dans le viewport plutôt qu'au montage. */
  onScroll?: boolean
}

const UNIT: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%' },
}

/**
 * Titre dont chaque mot (ou lettre) monte depuis un masque.
 *
 * Le déclencheur est porté par le conteneur, pas par les fragments : ceux-ci
 * sont rognés par `overflow: hidden`, donc jamais « visibles » au sens de
 * l'IntersectionObserver — `whileInView` posé dessus ne partirait jamais.
 *
 * Le texte complet reste annoncé d'un bloc par les lecteurs d'écran :
 * les fragments animés sont marqués aria-hidden.
 */
const SplitText = ({
  text,
  by = 'word',
  delay = 0,
  step = 0.055,
  className,
  onScroll = false,
}: Props) => {
  const reduced = useReducedMotion()

  if (reduced) {
    return <span className={className}>{text}</span>
  }

  const units = by === 'word' ? text.split(' ') : Array.from(text)

  const trigger: MotionProps = onScroll
    ? { whileInView: 'show', viewport: { once: true, amount: 0.4 } }
    : { animate: 'show' }

  return (
    <motion.span
      className={`split${className ? ` ${className}` : ''}`}
      aria-label={text}
      initial="hidden"
      {...trigger}
    >
      {units.map((unit, i) => (
        <Fragment key={`${unit}-${i}`}>
          <span className="split__mask" aria-hidden="true">
            <motion.span
              className="split__unit"
              variants={UNIT}
              transition={{ duration: 0.85, ease: EASE.outExpo, delay: delay + i * step }}
            >
              {unit}
            </motion.span>
          </span>
          {/* L'espace vit entre les masques : une espace finale à l'intérieur
              d'un inline-block serait supprimée, et les mots se colleraient. */}
          {by === 'word' && i < units.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  )
}

export default SplitText
