import { useState, useEffect, useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DodoWalker from './DodoWalker'
import frFlag from '../assets/flags/fr.webp'
import gbFlag from '../assets/flags/gb.webp'
import dodoFrame from '../assets/dodo-frame/walk_right_0.png'
import './Navbar.scss'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language.startsWith('fr') ? 'en' : 'fr')
  }

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className={`navbar${menuOpen ? ' navbar--open' : ''}`}>
      <DodoWalker />

      <NavLink to="/" className="navbar__logo" aria-label="Accueil">
        <img src={dodoFrame} alt="" className="navbar__logo-sprite" aria-hidden="true" />
        <span className="navbar__logo-name">
          <span>DORIAN</span>
          <span>JACOLIN</span>
        </span>
      </NavLink>

      <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.home')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.about')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.projects')}
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            {t('navbar.contact')}
          </NavLink>
        </li>
      </ul>

      <div className="navbar__right-group">
        <button type="button" className="navbar__lang" onClick={toggleLang} aria-label="Switch language">
          <img
            src={i18n.language.startsWith('fr') ? frFlag : gbFlag}
            alt=''
            className="navbar__lang-flag"
          />
          <span className="navbar__lang-code">
            {i18n.language.startsWith('fr') ? 'FR' : 'EN'}
          </span>
        </button>

        <button
          type="button"
          className={`navbar__burger${menuOpen ? ' navbar__burger--active' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="navbar__burger-line" />
          <span className="navbar__burger-line" />
          <span className="navbar__burger-line" />
        </button>
      </div>

      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  )
}

export default Navbar
