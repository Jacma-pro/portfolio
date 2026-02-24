import { NavLink } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar__logo">🦤 dodo</span>
      <ul className="navbar__links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            À propos
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
            Projets
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
