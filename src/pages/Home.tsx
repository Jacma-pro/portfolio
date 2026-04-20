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

/* ── Skills ───────────────────────────────────────────────────────────────── */
const SOFT_SKILLS = [
  {
    key: 'curiosity',
    color: 'blue',
    path: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
  },
  {
    key: 'adaptability',
    color: 'teal',
    path: 'M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15',
  },
  {
    key: 'collaboration',
    color: 'pink',
    path: 'M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1zm0 0h6v-1a6 6 0 0 0-9-5.197M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
  },
  {
    key: 'proactivity',
    color: 'yellow',
    path: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
] as const

const HARD_SKILLS = [
  { category: 'Frontend', color: 'blue',   items: ['React', 'Vue 3', 'Angular', 'TypeScript', 'SCSS'] },
  { category: 'Backend',  color: 'teal',   items: ['Node.js', 'Express','NestJS','Java', 'Spring Boot'] },
  { category: 'Data',     color: 'yellow', items: ['MySQL', 'SQLite','PostgreSQL', 'Strapi'] },
  { category: 'Outils',   color: 'pink',   items: ['VS Code','IntelliJ', 'WebStorm' ,'Git', 'Github', 'Gitlab', 'Docker', 'Figma'] },
] as const

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

      {/* ── Skills ────────────────────────────────────────── */}
      <section className="home__skills">
        <div className="home__section-header">
          <h2>{t('home.skills_title')}</h2>
          <p className="text-muted">{t('home.skills_subtitle')}</p>
        </div>

        <div className="home__skills-grid">
          <div className="home__soft">
            {SOFT_SKILLS.map(skill => (
              <div key={skill.key} className={`home__soft-card home__soft-card--${skill.color}`}>
                <svg className="home__soft-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={skill.path} />
                </svg>
                <div>
                  <p className="home__soft-name">{t(`home.soft_${skill.key}_label`)}</p>
                  <p className="home__soft-desc">{t(`home.soft_${skill.key}_desc`)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="home__hard">
            {HARD_SKILLS.map(group => (
              <div key={group.category} className="home__hard-group">
                <span className={`home__hard-label home__hard-label--${group.color}`}>{group.category}</span>
                <div className="home__hard-chips">
                  {group.items.map(item => (
                    <span key={item} className={`home__chip home__chip--${group.color}`}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
