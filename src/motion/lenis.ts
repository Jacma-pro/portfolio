import Lenis from 'lenis'

let instance: Lenis | null = null
let locks = 0

export const setLenis = (l: Lenis | null) => {
  instance = l
  locks = 0
}

export const getLenis = () => instance

/** Remonte en haut de page — utilisé au changement de route. */
export const scrollToTop = (immediate = false) => {
  if (instance) instance.scrollTo(0, { immediate, duration: immediate ? 0 : 0.9 })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

/** Hauteur réservée à la barre de navigation fixe au-dessus d'une ancre. */
const ANCHOR_OFFSET = 96

/** Amène l'élément `id` sous la barre de navigation. Renvoie false s'il est absent. */
export const scrollToId = (id: string, immediate = false) => {
  const el = document.getElementById(id)
  if (!el) return false
  const top = el.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET
  // Lenis pilote le scroll : passer par window.scrollTo se battrait avec lui.
  if (instance) instance.scrollTo(top, { immediate, duration: immediate ? 0 : 1 })
  else window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
  return true
}

/**
 * Gèle le scroll pendant qu'une surcouche est ouverte (jeu, lightbox, menu).
 * Compteur de verrous : deux surcouches empilées ne se marchent pas dessus.
 */
export const lockScroll = () => {
  locks += 1
  if (locks === 1) {
    instance?.stop()
    document.body.style.overflow = 'hidden'
  }
}

export const unlockScroll = () => {
  locks = Math.max(0, locks - 1)
  if (locks === 0) {
    instance?.start()
    document.body.style.overflow = ''
  }
}
