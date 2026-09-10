import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from './motion/Reveal'
import { scrollToTop } from '../motion/lenis'
import { ChevronUp, GitHub, LinkedIn, Mail, Code } from './icons'
import dodoSprite from '../assets/dodo-frame/walk_right_0.png'
import './Footer.scss'

const Footer = () => {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* ── Marque ───────────────────────────────────────────────── */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src={dodoSprite} alt="" aria-hidden="true" className="footer__dodo" />
            <span className="footer__logo-text">
              <span>Dorian</span>
              <span className="footer__logo-accent">Jacolin</span>
            </span>
          </Link>
          <p className="footer__tagline">{t('home.tagline')}</p>
          <p className="footer__konami" title="Konami">
            <Code size={14} />
            {t('footer.konami')}
          </p>
        </div>

        {/* ── Navigation ───────────────────────────────────────────── */}
        <nav className="footer__col" aria-label={t('footer.nav_title')}>
          <h2 className="footer__col-title">{t('footer.nav_title')}</h2>
          <ul className="footer__links">
            <li><Link to="/">{t('navbar.home')}</Link></li>
            <li><Link to="/about">{t('navbar.about')}</Link></li>
            <li><Link to="/projects">{t('navbar.projects')}</Link></li>
            <li><Link to="/contact">{t('navbar.contact')}</Link></li>
          </ul>
        </nav>

        {/* ── Liens externes ───────────────────────────────────────── */}
        <div className="footer__col">
          <h2 className="footer__col-title">{t('footer.connect_title')}</h2>
          <ul className="footer__links">
            <li>
              <a href="https://github.com/Jacma-pro" target="_blank" rel="noopener noreferrer">
                <GitHub size={14} /> GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/dorian-jacolin/" target="_blank" rel="noopener noreferrer">
                <LinkedIn size={14} /> LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:dorianjacolin@gmail.com">
                <Mail size={14} /> Email
              </a>
            </li>
            <li>
              <a href="https://github.com/Jacma-pro/portfolio" target="_blank" rel="noopener noreferrer">
                <Code size={14} /> {t('footer.source')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Signature géante ───────────────────────────────────────── */}
      <Reveal direction="in" amount={0.1}>
        <div className="footer__wordmark" aria-hidden="true">
          <span>DORIAN JACOLIN</span>
        </div>
      </Reveal>

      {/* ── Bas de page ────────────────────────────────────────────── */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          {t('footer.built_with')} <span className="footer__tech">React</span>,{' '}
          <span className="footer__tech">TypeScript</span> &{' '}
          <span className="footer__heart">♥</span> {t('footer.by')} — © {year}
        </p>

        <button
          type="button"
          className="footer__top-btn"
          onClick={() => scrollToTop()}
          aria-label={t('footer.top')}
        >
          {t('footer.top')}
          <ChevronUp size={14} />
        </button>
      </div>
    </footer>
  )
}

export default Footer
