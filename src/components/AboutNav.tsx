import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getLenis } from '../motion/lenis'
import './AboutNav.scss'

const SECTIONS = [
  { id: 'declic',     labelKey: 'about.declic_title' },
  { id: 'school',     labelKey: 'about.school_title' },
  { id: 'learning',   labelKey: 'about.learning_title' },
  { id: 'equans',     labelKey: 'about.equans_title' },
  { id: 'alternance', labelKey: 'about.alternance_title' },
  { id: 'workflow',   labelKey: 'about.workflow_title' },
  { id: 'outside',    labelKey: 'about.outside_title' },
  { id: 'future',     labelKey: 'about.future_title' },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  // Lenis pilote le scroll : passer par window.scrollTo se battrait avec lui.
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(top, { duration: 1 })
  else window.scrollTo({ top, behavior: 'smooth' })
}

const AboutNav = () => {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="about-nav" aria-label={t('about.nav_label')}>
      <ul className="about-nav__list">
        {SECTIONS.map(({ id, labelKey }) => (
          <li key={id}>
            <button
              className={`about-nav__item${activeId === id ? ' about-nav__item--active' : ''}`}
              onClick={() => scrollTo(id)}
              title={t(labelKey)}
            >
              <span className="about-nav__dot" aria-hidden="true" />
              <span className="about-nav__label">{t(labelKey)}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default AboutNav
