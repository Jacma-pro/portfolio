import { useState, useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import DodoWalker from './DodoWalker'
import { lockScroll, unlockScroll } from '../motion/lenis'
import { EASE } from '../motion/variants'
import frFlag from '../assets/flags/fr.webp'
import gbFlag from '../assets/flags/gb.webp'
import dodoFrame from '../assets/dodo-frame/walk_right_0.png'
import './Navbar.scss'

const LINKS = [
  { to: '/', key: 'navbar.home', end: true },
  { to: '/about', key: 'navbar.about', end: false },
  { to: '/projects', key: 'navbar.projects', end: false },
  { to: '/contact', key: 'navbar.contact', end: false },
]

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language.startsWith('fr') ? 'en' : 'fr')
  }

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])

  // Compacte la barre dès que la page décolle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermeture du menu au changement de route (ajustement pendant le rendu :
  // pas de rendu en cascade comme avec un effet).
  const [seenPath, setSeenPath] = useState(location.pathname)
  if (location.pathname !== seenPath) {
    setSeenPath(location.pathname)
    setMenuOpen(false)
  }

  // Gel du scroll tant que le menu plein écran est ouvert
  useEffect(() => {
    if (!menuOpen) return
    lockScroll()
    return () => unlockScroll()
  }, [menuOpen])

  // Échap ferme le menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const isFr = i18n.language.startsWith('fr')

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        initial={reduced ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE.outExpo, delay: 0.15 }}
      >
        <nav className="navbar__inner" aria-label={t('navbar.aria')}>
          <DodoWalker />

          <NavLink to="/" className="navbar__logo" aria-label={t('navbar.home')}>
            <span className="navbar__logo-badge">
              <img src={dodoFrame} alt="" className="navbar__logo-sprite" aria-hidden="true" />
            </span>
            <span className="navbar__logo-name">
              <span className="navbar__logo-first">Dorian</span>
              <span className="navbar__logo-last">Jacolin</span>
            </span>
          </NavLink>

          <ul className="navbar__links">
            {LINKS.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
                >
                  {({ isActive }) => (
                    <>
                      <span className="navbar__link-text">{t(link.key)}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="navbar__pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navbar__right">
            <button
              type="button"
              className="navbar__lang"
              onClick={toggleLang}
              aria-label={isFr ? 'Switch to English' : 'Passer en français'}
            >
              <img src={isFr ? frFlag : gbFlag} alt="" className="navbar__lang-flag" />
              <span className="navbar__lang-code">{isFr ? 'FR' : 'EN'}</span>
            </button>

            <button
              type="button"
              className={`navbar__burger${menuOpen ? ' navbar__burger--active' : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? t('navbar.close_menu') : t('navbar.open_menu')}
              aria-expanded={menuOpen}
            >
              <span className="navbar__burger-line" />
              <span className="navbar__burger-line" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Menu plein écran (mobile / tablette) ──────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navmenu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE.outExpo }}
          >
            <ul className="navmenu__links">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.5, ease: EASE.outExpo, delay: 0.16 + i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) => `navmenu__link${isActive ? ' navmenu__link--active' : ''}`}
                  >
                    <span className="navmenu__index">0{i + 1}</span>
                    {t(link.key)}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="navmenu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45 }}
            >
              <img src={dodoFrame} alt="" className="navmenu__dodo" aria-hidden="true" />
              <span>dorianjacolin@gmail.com</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
