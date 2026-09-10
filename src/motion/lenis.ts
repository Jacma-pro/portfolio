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
