import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Props {
  to: number
  duration?: number
  suffix?: string
  className?: string
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/** Compteur qui grimpe de 0 à `to` la première fois qu'il entre à l'écran. */
const Counter = ({ to, duration = 1.6, suffix = '', className }: Props) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  // En mouvement réduit, la valeur finale est posée dès le premier rendu.
  const [value, setValue] = useState(() => (reduced ? to : 0))

  useEffect(() => {
    if (!inView || reduced) return

    let rafId = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      setValue(Math.round(easeOutExpo(t) * to))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, to, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}

export default Counter
