import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { PROJECTS } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/motion/Reveal'
import SplitText from '../components/motion/SplitText'
import Counter from '../components/motion/Counter'
import Parallax from '../components/motion/Parallax'
import Magnetic from '../components/motion/Magnetic'
import { ArrowRight } from '../components/icons'
import TechLogo from '../components/TechLogo'
import { TECH_ICONS, type TechIcon } from '../data/tech-icons'
import { EASE } from '../motion/variants'
import photoMe from '../assets/aboutme/photo/me.jpeg'
import dodoSprite from '../assets/dodo-frame/walk_right_0.png'
import './Home.scss'

declare const __BUILD_DATE__: string

const getDaysSinceUpdate = (dateString: string) => {
  try {
    const buildDate = new Date(dateString)
    const diffTime = Math.abs(Date.now() - buildDate.getTime())
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  } catch {
    return 0
  }
}

/* ── Projets mis en avant (choisis à la main, dans l'ordre) ─────────────── */
const FEATURED_IDS = ['stegano', 'bdd-streaming', 'rl-wp']
const FEATURED = FEATURED_IDS
  .map(id => PROJECTS.find(p => p.id === id))
  .filter(Boolean) as typeof PROJECTS

/* ── Bandeau technos ───────────────────────────────────────────────────── */
// Front d'un côté, back et outillage de l'autre : les deux lignes défilent en
// sens opposés.
const STACK_ROW_A = TECH_ICONS.slice(0, 7)
const STACK_ROW_B = TECH_ICONS.slice(7)

const TECH_COUNT = Array.from(new Set(PROJECTS.flatMap(p => p.techs))).length

const Marquee = ({ items, reverse = false }: { items: TechIcon[]; reverse?: boolean }) => (
  <div className="marquee" aria-hidden="true">
    <div className={`marquee__track${reverse ? ' marquee__track--reverse' : ''}`}>
      {/* Le contenu est doublé : la boucle se referme sans saut visible. */}
      {[...items, ...items].map((tech, i) => (
        <span className="marquee__item" key={`${tech.slug}-${i}`}>
          <TechLogo tech={tech} size={28} className="marquee__logo" />
          {tech.label}
          <span className="marquee__sep">◆</span>
        </span>
      ))}
    </div>
  </div>
)

const Home = () => {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const days = typeof __BUILD_DATE__ !== 'undefined' ? getDaysSinceUpdate(__BUILD_DATE__) : 0

  return (
    <main className="page page--home">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__text">
          <motion.span
            className="hero__label"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.outExpo, delay: 0.1 }}
          >
            <span className="hero__label-line" />
            {t('home.hero_label')}
          </motion.span>

          <p className="hero__greeting">
            <SplitText text={t('home.greeting')} delay={0.2} step={0.03} />
          </p>

          <h1 className="hero__title">
            <span className="hero__title-line">
              <SplitText text="Dorian" by="char" delay={0.32} step={0.035} />
            </span>
            {/* Un seul fragment animé : le dégradé doit se déployer sur le mot
                entier, pas se répéter lettre par lettre. */}
            <span className="hero__title-line hero__title-line--accent">
              <SplitText text="Jacolin" delay={0.5} />
            </span>
          </h1>

          <motion.div
            className="hero__meta"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE.outExpo, delay: 0.8 }}
          >
            <p className="hero__role">{t('home.role')}</p>
            <p className="hero__tagline">{t('home.tagline')}</p>

            <span className="status-badge hero__status">
              <span className="status-badge__dot" />
              {t('home.badge')}
            </span>

            <div className="hero__ctas">
              <Magnetic>
                <Link to="/projects" className="btn btn--primary">
                  {t('home.cta_projects')}
                  <ArrowRight />
                </Link>
              </Magnetic>
              <Magnetic strength={0.18}>
                <Link to="/about" className="btn btn--ghost">
                  {t('home.cta_about')}
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Portrait, décalé au scroll */}
        <motion.div
          className="hero__visual"
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE.outExpo, delay: 0.45 }}
        >
          <Parallax distance={-38} className="hero__portrait-wrap">
            <div className="hero__portrait">
              <img src={photoMe} alt="Dorian Jacolin" />
              <span className="hero__portrait-glow" aria-hidden="true" />
            </div>
          </Parallax>

          <span className="hero__frame" aria-hidden="true" />

          <span className="hero__sticker" aria-hidden="true">
            <img src={dodoSprite} alt="" />
          </span>
        </motion.div>

        {/* Indice de défilement */}
        <motion.div
          className="hero__scroll"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          aria-hidden="true"
        >
          <span className="hero__scroll-label">{t('home.scroll')}</span>
          <span className="hero__scroll-rail"><span className="hero__scroll-dot" /></span>
        </motion.div>
      </section>

      {/* ── Chiffres ───────────────────────────────────────────────────── */}
      <section className="stats" aria-label={t('home.stats_eyebrow')}>
        <Reveal className="stats__grid" direction="up">
          <div className="stats__item">
            <span className="stats__number"><Counter to={PROJECTS.length} /></span>
            <span className="stats__label">{t('home.stats_projects')}</span>
          </div>
          <div className="stats__item">
            <span className="stats__number"><Counter to={TECH_COUNT} suffix="+" /></span>
            <span className="stats__label">{t('home.stats_techs')}</span>
          </div>
          <div className="stats__item">
            <span className="stats__number"><Counter to={days} /></span>
            <span className="stats__label">{t('home.stats_update')}</span>
          </div>
        </Reveal>
      </section>

      {/* ── Projets en avant ───────────────────────────────────────────── */}
      <section className="home-section">
        <Reveal className="section-head">
          <span className="eyebrow">{t('home.featured_eyebrow')}</span>
          <h2><SplitText text={t('home.featured_title')} onScroll delay={0.05} /></h2>
          <p>{t('home.featured_subtitle')}</p>
        </Reveal>

        <div className="home-section__grid">
          {FEATURED.map((project, i) => (
            <Reveal key={project.id} direction="up" delay={i * 0.1} amount={0.15}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal direction="in" delay={0.1}>
          <Link to="/projects" className="arrow-link home-section__more">
            {t('home.featured_all')}
            <ArrowRight size={14} />
          </Link>
        </Reveal>
      </section>

      {/* ── Stack ──────────────────────────────────────────────────────── */}
      <section className="home-section home-section--stack">
        <Reveal className="section-head">
          <span className="eyebrow">{t('home.stack_eyebrow')}</span>
          <h2>{t('home.stack_title')}</h2>
          <p>{t('home.stack_subtitle')}</p>
        </Reveal>

        <div className="stack-band">
          <Marquee items={STACK_ROW_A} />
          <Marquee items={STACK_ROW_B} reverse />
        </div>

        <ul className="stack-list" aria-label={t('home.stack_title')}>
          {TECH_ICONS.map((tech, i) => (
            <Reveal
              key={tech.slug}
              as="li"
              direction="up"
              amount={0.4}
              delay={Math.min(i, 10) * 0.04}
            >
              {/* La couleur de marque n'est révélée qu'au survol : au repos la
                  ligne reste dans la palette du site. */}
              <span
                className="stack-chip"
                style={{ '--brand': tech.brand } as React.CSSProperties}
              >
                <TechLogo tech={tech} size={18} />
                {tech.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Appel à l'action ───────────────────────────────────────────── */}
      <section className="home-cta">
        <Reveal direction="scale">
          <div className="home-cta__box">
            <span className="eyebrow">{t('home.cta_eyebrow')}</span>
            <h2 className="home-cta__title">
              <SplitText text={t('home.cta_title')} onScroll />
            </h2>
            <p className="home-cta__text">{t('home.cta_text')}</p>
            <Magnetic>
              <Link to="/contact" className="btn btn--primary">
                {t('home.cta_contact')}
                <ArrowRight />
              </Link>
            </Magnetic>
            <img src={dodoSprite} alt="" className="home-cta__dodo" aria-hidden="true" />
          </div>
        </Reveal>
      </section>

    </main>
  )
}

export default Home
