import type { Variants, Transition } from 'framer-motion'

/**
 * Courbes et durées partagées avec les tokens SCSS (styles/motion/_motion.scss).
 * Tout le site anime uniquement transform / opacity / filter.
 */
type Bezier = [number, number, number, number]

export const EASE: Record<'outExpo' | 'outQuart' | 'inOut', Bezier> = {
  outExpo:  [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOut:    [0.65, 0, 0.35, 1],
}

export const DUR = {
  fast: 0.15,
  base: 0.24,
  slow: 0.55,
  slower: 0.9,
} as const

export const springSoft: Transition = { type: 'spring', stiffness: 120, damping: 22, mass: 0.7 }
export const springSnappy: Transition = { type: 'spring', stiffness: 320, damping: 30, mass: 0.6 }

/* ── Apparitions au scroll ─────────────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE.outExpo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE.outQuart } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE.outExpo } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: DUR.slow, ease: EASE.outExpo } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.slow, ease: EASE.outExpo } },
}

/** Conteneur qui décale l'apparition de ses enfants. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
})

/* ── Titres découpés en mots / lettres ─────────────────────────────────── */

export const lineMask: Variants = {
  hidden: { y: '110%' },
  show: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 0.85, ease: EASE.outExpo, delay: i * 0.055 },
  }),
}

/* ── Variantes désactivées (prefers-reduced-motion) ────────────────────── */

export const still: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

/** Renvoie `still` si l'utilisateur a demandé moins de mouvement. */
export const safe = (variants: Variants, reduced: boolean | null): Variants =>
  reduced ? still : variants
