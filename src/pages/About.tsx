import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import Reveal from '../components/motion/Reveal'
import SplitText from '../components/motion/SplitText'
import Parallax from '../components/motion/Parallax'
import Magnetic from '../components/motion/Magnetic'
import { ArrowRight } from '../components/icons'
import photoMe from '../assets/aboutme/photo/me.jpeg'
import photoSalon from '../assets/aboutme/photo/myDigitalSchool.png'
import './About.scss'

/** Les chapitres du récit, dans l'ordre. `quote` passe le 2e paragraphe en citation. */
const CHAPTERS = [
  { id: 'declic', paragraphs: ['declic', 'declic_2'] },
  { id: 'school', paragraphs: ['school', 'school_2'] },
  { id: 'learning', paragraphs: ['learning', 'learning_2'] },
  { id: 'equans', paragraphs: ['equans'], quote: 'equans_2' },
  { id: 'alternance', paragraphs: ['alternance'] },
  { id: 'workflow', paragraphs: ['workflow', 'workflow_2', 'workflow_3'] },
]

const About = () => {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)

  // Le rail se remplit au fil du défilement de la frise.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 60%', 'end 80%'],
  })
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })

  return (
    <main className="page page--about">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero__text">
          <span className="eyebrow">{t('about.eyebrow')}</span>
          <h1 className="about-hero__title">
            <SplitText text={t('about.title')} delay={0.15} />
          </h1>
          <p className="about-hero__subtitle">{t('about.subtitle')}</p>
          <p className="about-hero__intro">{t('about.intro')}</p>
        </div>

        <Parallax distance={-30} className="about-hero__media">
          <div className="about-hero__photo">
            <img src={photoMe} alt="Dorian Jacolin" />
          </div>
        </Parallax>
      </section>

      {/* ── Frise narrative ────────────────────────────────────────────── */}
      <div className="timeline" ref={timelineRef}>
        <div className="timeline__rail" aria-hidden="true">
          <motion.span
            className="timeline__rail-fill"
            style={reduced ? { scaleY: 1 } : { scaleY: railScale }}
          />
        </div>

        {CHAPTERS.map((chapter, i) => (
          <Reveal key={chapter.id} className="timeline__item" direction="up" amount={0.15}>
            <span className="timeline__marker" aria-hidden="true" />
            <span className="timeline__index">{String(i + 1).padStart(2, '0')}</span>

            <div className="timeline__content">
              <h2 className="timeline__title">{t(`about.${chapter.id}_title`)}</h2>
              {chapter.paragraphs.map(key => (
                <p key={key}>{t(`about.${key}`)}</p>
              ))}
              {chapter.quote && (
                <blockquote className="timeline__quote">
                  {t(`about.${chapter.quote}`)}
                </blockquote>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── En dehors du code ──────────────────────────────────────────── */}
      <section className="about-outside">
        <Reveal className="section-head">
          <span className="eyebrow">{t('about.outside_title')}</span>
        </Reveal>

        <div className="about-outside__grid">
          <Reveal className="about-outside__text" direction="right">
            <p>{t('about.outside')}</p>
            <p>{t('about.outside_2')}</p>
            <p>{t('about.outside_3')}</p>
          </Reveal>

          <Reveal direction="left" className="about-outside__media">
            <Parallax distance={-24}>
              <figure className="about-outside__figure">
                <img src={photoSalon} alt="Salon de l'étudiant – MyDigitalSchool" />
                <figcaption>Salon de l'étudiant — Nov. 2025 — Grenoble</figcaption>
              </figure>
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* ── Et maintenant ? ────────────────────────────────────────────── */}
      <section className="about-future">
        <Reveal direction="scale">
          <div className="about-future__box">
            <h2 className="about-future__title">
              <SplitText text={t('about.future_title')} onScroll />
            </h2>
            <p>{t('about.future')}</p>
            <p>{t('about.future_2')}</p>
            <p className="about-future__cta-text">{t('about.future_cta')}</p>
            <Magnetic>
              <Link to="/contact" className="btn btn--primary">
                {t('home.cta_contact')}
                <ArrowRight />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>

    </main>
  )
}

export default About
