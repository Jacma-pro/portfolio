import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PROJECTS, CATEGORIES, type Category } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import './Projects.scss'

const Projects = () => {
  const { t } = useTranslation()
  const [activeFilters, setActiveFilters] = useState<Category[]>([])
  const [activeTechs, setActiveTechs] = useState<string[]>([])

  const isFiltered = activeFilters.length > 0 || activeTechs.length > 0

  const filteredProjects = isFiltered
    ? PROJECTS.filter(p => {
        const matchesCategory = activeFilters.length === 0 || activeFilters.includes(p.category)
        const matchesTech = activeTechs.length === 0 || p.techs.some(tech => activeTechs.includes(tech))
        return matchesCategory && matchesTech
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
            return (
              <section key={cat} className="projects-category">
                <div className="projects-category__header">
                  <span className="projects-category__label">
                    {t(`projects.categories.${cat}`)}
                  </span>
                  <span className="projects-category__line" />
                </div>
                <div className="projects-category__grid">
                  {items.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default Projects
