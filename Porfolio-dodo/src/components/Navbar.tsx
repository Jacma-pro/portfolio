import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Navbar.scss'

const Navbar = () => {
  const { t, i18n } = useTranslation()

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language.startsWith('fr') ? 'en' : 'fr')
  }

  return (
    <nav className="navbar">
      <span className="navbar__logo">🦤 dodo</span>
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
      <button className="navbar__lang" onClick={toggleLang} aria-label="Switch language">
        {i18n.language.startsWith('fr') ? '🇫🇷 FR' : '🇬🇧 EN'  }
      </button>
    </nav>
  )
}

export default Navbar
