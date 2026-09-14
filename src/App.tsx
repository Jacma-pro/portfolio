import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Backdrop from './components/Backdrop'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import { scrollToTop, scrollToId } from './motion/lenis'

/**
 * Instant où l'on bascule de route : le rideau couvre entièrement l'écran
 * entre 38 % et 50 % de son balayage (cf. SWEEP_MS dans PageTransition),
 * soit 437 ms → 575 ms. On vise le milieu de cette fenêtre.
 */
const COVER_MS = 500

const App = () => {
  const location = useLocation()
  const reduced = useReducedMotion()

  // La route rendue est volontairement en retard sur la route réelle : on ne
  // bascule qu'une fois le rideau refermé, pour que le changement soit invisible.
  const [delayed, setDelayed] = useState(location)
  const shown = reduced ? location : delayed

  useEffect(() => {
    if (reduced || location.pathname === delayed.pathname) return
    const timeout = setTimeout(() => setDelayed(location), COVER_MS)
    return () => clearTimeout(timeout)
  }, [location, delayed.pathname, reduced])

  // Remonte en haut quand la page affichée change (donc pendant que le rideau
  // couvre l'écran) : la nouvelle page n'apparaît jamais au milieu. Si l'URL
  // vise une ancre (/about#workflow), on s'y place directement à la place.
  useEffect(() => {
    const id = shown.hash.slice(1)
    if (!id || !scrollToId(id, true)) scrollToTop(true)
  }, [shown.pathname, shown.hash])

  return (
    <div className="layout">
      <SmoothScroll />
      <Backdrop />
      <ScrollProgress />
      <Navbar />

      <motion.div
        key={shown.pathname}
        className="layout__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Routes location={shown}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>

      <Footer />
      <PageTransition />
    </div>
  )
}

export default App
