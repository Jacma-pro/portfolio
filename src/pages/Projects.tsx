import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PROJECTS, CATEGORIES, type Category } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import './Projects.scss'

const GRID_COLS = 3

const Projects = () => {
  const { t } = useTranslation()
  const [activeFilters, setActiveFilters] = useState<Category[]>([])
  const [activeTechs, setActiveTechs] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [expanded, setExpanded] = useState<Set<Category>>(new Set())

  const toggleExpand = (cat: Category) =>
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })

  const isFiltered = activeFilters.length > 0 || activeTechs.length > 0 || searchQuery.trim().length > 0

  const filteredProjects = isFiltered
    ? PROJECTS.filter(p => {
        const matchesCategory = activeFilters.length === 0 || activeFilters.includes(p.category)
        const matchesTech = activeTechs.length === 0 || p.techs.some(tech => activeTechs.includes(tech))
        
        const searchLower = searchQuery.toLowerCase().trim()
        let matchesSearch = true
        
        if (searchLower) {
          const title = t(`projects.items.${p.id}.title`).toLowerCase()
          const desc = t(`projects.items.${p.id}.short`).toLowerCase()
          const catName = t(`projects.categories.${p.category}`).toLowerCase()
          const techNames = p.techs.join(' ').toLowerCase()
          
          const combinedString = `${title} ${desc} ${catName} ${techNames}`
          matchesSearch = combinedString.includes(searchLower)
        }

        return matchesCategory && matchesTech && matchesSearch
      })
    : null

  return (
    <main className="page page--projects">
      <h1>{t('projects.title')}</h1>
      <p className="text-muted">{t('projects.subtitle')}</p>

      <ProjectFilter 
        active={activeFilters} 
        onChange={setActiveFilters} 
        activeTechs={activeTechs}
        onChangeTechs={setActiveTechs}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {isFiltered ? (
        <div className={`projects-flat-grid${isFiltered ? ' projects-flat-grid--visible' : ''}`}>
          {filteredProjects!.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="projects-library">
          {CATEGORIES.map(cat => {
            const items = PROJECTS.filter(p => p.category === cat)
            const isExpanded = expanded.has(cat)
            const visible = isExpanded ? items : items.slice(0, GRID_COLS)
            const hiddenCount = items.length - GRID_COLS
            return (
              <section key={cat} className="projects-category">
                <div className="projects-category__header">
                  <span className="projects-category__label">
                    {t(`projects.categories.${cat}`)}
                  </span>
                  <span className="projects-category__line" />
                </div>
                <div className="projects-category__grid">
                  {visible.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                {hiddenCount > 0 && (
                  <button
                    className="projects-category__toggle"
                    onClick={() => toggleExpand(cat)}
                  >
                    {isExpanded
                      ? t('projects.show_less')
                      : t('projects.show_more', { count: hiddenCount })}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={isExpanded ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                    </svg>
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
