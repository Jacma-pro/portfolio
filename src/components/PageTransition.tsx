import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE } from '../motion/variants'
import right0 from '../assets/dodo-frame/walk_right_0.png'
import right1 from '../assets/dodo-frame/walk_right_1.png'
import right2 from '../assets/dodo-frame/walk_right_2.png'
import './PageTransition.scss'

const RUN_FRAMES = [right0, right1, right2]
const SWEEP_MS = 1150

/**
 * Rideau plein écran entre deux pages : un panneau balaie l'écran de gauche
 * à droite et le dodo le traverse en courant. Le changement de route se fait
 * pendant que l'écran est couvert.
 */
const PageTransition = () => {
  const { pathname } = useLocation()
  const reduced = useReducedMotion()
  const [seenPath, setSeenPath] = useState(pathname)
  // Identifiant du balayage en cours (null = aucun) et compteur du suivant.
  const [sweep, setSweep] = useState<number | null>(null)
  const [nextId, setNextId] = useState(1)
  const [frame, setFrame] = useState(0)

  // Ajustement d'état pendant le rendu : le rideau se déclenche au changement
  // de route, jamais au premier affichage (seenPath démarre sur la route
  // courante). C'est le motif React pour réagir à un changement de props.
  if (pathname !== seenPath) {
    setSeenPath(pathname)
    if (!reduced) {
      setSweep(nextId)
      setNextId(nextId + 1)
    }
  }

  // Retire le rideau une fois le balayage terminé
  useEffect(() => {
    if (sweep === null) return
    const timeout = setTimeout(() => setSweep(null), SWEEP_MS)
    return () => clearTimeout(timeout)
  }, [sweep])

  // Animation du sprite pendant la traversée
  useEffect(() => {
    if (sweep === null) return
    const id = setInterval(() => setFrame(f => (f + 1) % RUN_FRAMES.length), 90)
    return () => clearInterval(id)
  }, [sweep])

  return (
    <AnimatePresence>
      {sweep !== null && (
        <div className="page-wipe" key={sweep} aria-hidden="true">
          <motion.div
            className="page-wipe__panel"
            initial={{ x: '-102%' }}
            animate={{ x: ['-102%', '0%', '0%', '102%'] }}
            transition={{
              duration: SWEEP_MS / 1000,
              times: [0, 0.38, 0.5, 1],
              ease: EASE.outExpo,
            }}
          />
          <motion.div
            className="page-wipe__runner"
            initial={{ x: '-18vw' }}
            animate={{ x: '112vw' }}
            transition={{ duration: SWEEP_MS / 1000, ease: [0.4, 0, 0.6, 1] }}
          >
            <img src={RUN_FRAMES[frame]} alt="" className="page-wipe__sprite" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition
