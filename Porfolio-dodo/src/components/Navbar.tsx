import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DodoWalker from './DodoWalker'
import frFlag from '../assets/flags/fr.webp'
import gbFlag from '../assets/flags/gb.webp'
import './Navbar.scss'

const Navbar = () => {
  const { t, i18n } = useTranslation()

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language.startsWith('fr') ? 'en' : 'fr')
  }

  return (
    <nav className="navbar">
      <DodoWalker />

      <span className="navbar__logo">Dorian Jacolin</span>
      <ul className="navbar__links">
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
      <button type="button" className="navbar__lang" onClick={toggleLang} aria-label="Switch language">
        <img
          src={i18n.language.startsWith('fr') ? frFlag : gbFlag}
          className="navbar__lang-flag"
        />
        <span className="navbar__lang-code">
          {i18n.language.startsWith('fr') ? 'FR' : 'EN'}
        </span>
      </button>
    </nav>
  )
}

export default Navbar
