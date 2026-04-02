import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import photoMe from '../assets/aboutme/photo/me.jpeg'
import './Home.scss'

declare const __BUILD_DATE__: string;

const getDaysSinceUpdate = (dateString: string) => {
  try {
    const buildDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - buildDate.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 0;
  }
};

/* ── Featured project IDs (hand-picked, in order) ─────────────────────────── */
const FEATURED_IDS = ['stegano', 'bdd-streaming', 'rl-wp']
const FEATURED = FEATURED_IDS
  .map(id => PROJECTS.find(p => p.id === id))
  .filter(Boolean) as typeof PROJECTS

/* ── Stack chips ──────────────────────────────────────────────────────────── */
const STACK = [
  'React', 'Vue 3', 'TypeScript', 'Angular',
  'Node.js', 'Express', 'Spring Boot',
  'MySQL', 'SQLite', 'Strapi',
  'SCSS', 'Figma', 'Git'
]

const Home = () => {
  const { t } = useTranslation()
  const daysSinceUpdate = typeof __BUILD_DATE__ !== 'undefined' ? getDaysSinceUpdate(__BUILD_DATE__) : 0;

  return (
    <main className="page page--home">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="home__hero">
        <div className="home__hero-content">
          <span className="home__badge">
            <span className="home__badge-dot" />
            {t('home.badge')}
          </span>

          <h1 className="home__title">
            {t('home.greeting')}{' '}
            <span className="home__name">{t('home.name')}</span>
          </h1>

          <p className="home__role">{t('home.role')}</p>
          <p className="home__tagline">{t('home.tagline')}</p>

          <div className="home__ctas">
            <Link to="/projects" className="home__btn home__btn--primary">
              {t('home.cta_projects')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link to="/about" className="home__btn home__btn--ghost">
              {t('home.cta_about')}
            </Link>
          </div>
        </div>

        <div className="home__hero-visual">
          <div className="home__avatar-ring">
            <img src={photoMe} alt="Dorian Jacolin" className="home__avatar" />
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="home__stats" aria-label="Stats">
        <div className="home__stat">
          <span className="home__stat-number">{PROJECTS.length}</span>
          <span className="home__stat-label">{t('home.stats_projects')}</span>
        </div>
        <div className="home__stat">
          <span className="home__stat-number">
            {Array.from(new Set(PROJECTS.flatMap(p => p.techs))).length}+
          </span>
          <span className="home__stat-label">{t('home.stats_techs')}</span>
        </div>
        <div className="home__stat">
          <span className="home__stat-number">{daysSinceUpdate}</span>
          <span className="home__stat-label">{t('home.stats_update')}</span>
        </div>
      </section>

      {/* ── Featured projects ─────────────────────────────── */}
      <section className="home__featured">
        <div className="home__section-header">
          <h2>{t('home.featured_title')}</h2>
          <p className="text-muted">{t('home.featured_subtitle')}</p>
        </div>

        <div className="home__projects-grid">
          {FEATURED.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <Link to="/projects" className="home__link">
          {t('home.featured_all')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </section>

      {/* ── Stack ─────────────────────────────────────────── */}
      <section className="home__stack">
        <h2>{t('home.stack_title')}</h2>
        <div className="home__stack-chips">
          {STACK.map(tech => (
            <span key={tech} className="home__chip">{tech}</span>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="home__cta-section">
        <h2>{t('home.cta_title')}</h2>
        <p>{t('home.cta_text')}</p>
        <Link to="/contact" className="home__btn home__btn--primary">
          {t('home.cta_contact')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </section>

    </main>
  )
}

export default Home
