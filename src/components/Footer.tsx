import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dodoSprite from '../assets/dodo-frame/walk_right_0.png'
import './Footer.scss'

const Footer = () => {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* ── Brand ────────────────────────────────────────── */}
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={dodoSprite} alt="" aria-hidden="true" className="footer__dodo" />
            <span className="footer__logo-text">
              <span className="footer__logo-first">Dorian</span>
              <span className="footer__logo-last">Jacolin</span>
            </span>
          </div>
          <p className="footer__tagline">{t('home.tagline')}</p>
        </div>

        {/* ── Nav links ────────────────────────────────────── */}
        <div className="footer__col">
          <h4 className="footer__col-title">{t('footer.nav_title')}</h4>
          <ul className="footer__links">
            <li><Link to="/">{t('navbar.home')}</Link></li>
            <li><Link to="/about">{t('navbar.about')}</Link></li>
            <li><Link to="/projects">{t('navbar.projects')}</Link></li>
            <li><Link to="/contact">{t('navbar.contact')}</Link></li>
          </ul>
        </div>

        {/* ── Social / contact ─────────────────────────────── */}
        <div className="footer__col">
          <h4 className="footer__col-title">{t('footer.connect_title')}</h4>
          <ul className="footer__links">
            <li>
              <a href="https://github.com/Jacma-pro" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/dorian-jacolin/" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:dorianjacolin@gmail.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                Email
              </a>
            </li>
            <li>
              <a href="https://github.com/Jacma-pro/portfolio" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C7 2 6 2 6 2c-.28 1.15-.28 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                {t('footer.source')}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          {t('footer.built_with')}{' '}
          <span className="footer__tech">React</span>,{' '}
          <span className="footer__tech">TypeScript</span> &{' '}
          <span className="footer__heart">♥</span>{' '}
          {t('footer.by')} - © {year}
        </p>

        <button className="footer__top-btn" onClick={scrollToTop} aria-label={t('footer.top')}>
          {t('footer.top')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      </div>
    </footer>
  )
}

export default Footer
