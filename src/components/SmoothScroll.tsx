import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../motion/lenis'

/**
 * Scroll amorti (Lenis). Lenis pilote le scroll natif de la fenêtre, donc
 * `position: sticky` et `useScroll` de Framer Motion continuent de fonctionner.
 * Désactivé si l'utilisateur a demandé moins de mouvement.
 */
const SmoothScroll = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    // Sur tactile le scroll natif est déjà fluide et l'inertie de Lenis gêne.
    if (prefersReduced || coarse) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    setLenis(lenis)

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}

export default SmoothScroll
