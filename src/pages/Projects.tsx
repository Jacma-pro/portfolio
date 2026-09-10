import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PROJECTS, CATEGORIES, type Category } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import Reveal from '../components/motion/Reveal'
import SplitText from '../components/motion/SplitText'
import { ChevronDown } from '../components/icons'
import { EASE } from '../motion/variants'
import './Projects.scss'

/** Nombre de cartes visibles avant dépliage, calé sur une ligne de grille. */
const GRID_COLS = 3

const Projects = () => {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

  const [activeCats, setActiveCats] = useState<Category[]>([])
  const [activeTechs, setActiveTechs] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<Set<Category>>(new Set())

  const toggleExpand = (cat: Category) =>
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })

  const isFiltered = activeCats.length > 0 || activeTechs.length > 0 || query.trim().length > 0

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim()

    return PROJECTS.filter(p => {
      const matchesCategory = activeCats.length === 0 || activeCats.includes(p.category)
      const matchesTech = activeTechs.length === 0 || p.techs.some(tech => activeTechs.includes(tech))

      if (!needle) return matchesCategory && matchesTech

      const haystack = [
        t(`projects.items.${p.id}.title`),
        t(`projects.items.${p.id}.short`),
        t(`projects.categories.${p.category}`),
        ...p.techs,
      ].join(' ').toLowerCase()

      return matchesCategory && matchesTech && haystack.includes(needle)
    })
  }, [activeCats, activeTechs, query, t])

  const clearAll = () => {
    setActiveCats([])
    setActiveTechs([])
    setQuery('')
  }

  return (
    <main className="page page--projects">

      <header className="projects__head">
        <span className="eyebrow">{t('projects.eyebrow')}</span>
        <h1 className="projects__title">
          <SplitText text={t('projects.title')} by="char" delay={0.15} step={0.04} />
        </h1>
        <p className="projects__subtitle">{t('projects.subtitle')}</p>
      </header>

      <ProjectFilter
        activeCats={activeCats}
        onChangeCats={setActiveCats}
        activeTechs={activeTechs}
        onChangeTechs={setActiveTechs}
        query={query}
        onQueryChange={setQuery}
        resultCount={filtered.length}
        isFiltered={isFiltered}
        onClear={clearAll}
      />

      {isFiltered ? (
        /* ── Résultats filtrés : la grille se réordonne en douceur ─────── */
        filtered.length > 0 ? (
          <motion.div className="projects__grid" layout={!reduced}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout={!reduced}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.16 } }}
                  transition={{ duration: 0.42, ease: EASE.outExpo, delay: Math.min(i, 8) * 0.03 }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="projects__empty">
            <p className="projects__empty-title">{t('projects.empty')}</p>
            <p className="projects__empty-hint">{t('projects.empty_hint')}</p>
            <button type="button" className="btn btn--outline" onClick={clearAll}>
              {t('projects.filter.clear')}
            </button>
          </div>
        )
      ) : (
        /* ── Bibliothèque : les projets rangés par catégorie ───────────── */
        <div className="projects__library">
          {CATEGORIES.map(cat => {
            const items = PROJECTS.filter(p => p.category === cat)
            const isExpanded = expanded.has(cat)
            const visible = isExpanded ? items : items.slice(0, GRID_COLS)
            const hiddenCount = items.length - GRID_COLS
            return (
              <section key={cat} className="projects__category" data-category={cat}>
                <Reveal className="projects__category-head" direction="in">
                  <span className="projects__category-label">
                    {t(`projects.categories.${cat}`)}
                  </span>
                  <span className="projects__category-count">
                    {String(items.length).padStart(2, '0')}
                  </span>
                  <span className="projects__category-line" />
                </Reveal>

                <div className="projects__grid">
                  {visible.map((project, i) => (
                    <Reveal key={project.id} delay={Math.min(i, 5) * 0.07} amount={0.15}>
                      <ProjectCard project={project} index={i} />
                    </Reveal>
                  ))}
                </div>

                {hiddenCount > 0 && (
                  <button
                    type="button"
                    className="projects__toggle"
                    onClick={() => toggleExpand(cat)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded
                      ? t('projects.show_less')
                      : t('projects.show_more', { count: hiddenCount })}
                    <ChevronDown
                      size={14}
                      className={`projects__toggle-arrow${isExpanded ? ' projects__toggle-arrow--up' : ''}`}
                    />
                  </button>
                )}
              </section>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Projects
