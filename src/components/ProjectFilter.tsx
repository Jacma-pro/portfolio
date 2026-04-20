import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PROJECTS, type Category } from '../data/projects'
import './ProjectFilter.scss'

const ALL_CATEGORIES: Category[] = ['front', 'back', 'mockup']

const ALL_TECHS = Array.from(new Set(PROJECTS.flatMap(p => p.techs))).sort((a, b) => a.localeCompare(b))

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const TECH_ICONS: Record<string, { icon: string; invert?: boolean }> = {
  'Angular':      { icon: 'angular/angular-original' },
  'CSS3':         { icon: 'css3/css3-original' },
  'Docker':       { icon: 'docker/docker-original' },
  'Express.js':   { icon: 'express/express-original', invert: true },
  'Figma':        { icon: 'figma/figma-original' },
  'HTML5':        { icon: 'html5/html5-original' },
  'Java':         { icon: 'java/java-original' },
  'JavaScript':   { icon: 'javascript/javascript-original' },
  'MySQL':        { icon: 'mysql/mysql-original' },
  'NestJS':       { icon: 'nestjs/nestjs-original' },
  'Node.js':      { icon: 'nodejs/nodejs-original' },
  'PHP':          { icon: 'php/php-original' },
  'PostgreSQL':   { icon: 'postgresql/postgresql-original' },
  'React':        { icon: 'react/react-original' },
  'React 19':     { icon: 'react/react-original' },
  'SCSS':         { icon: 'sass/sass-original' },
  'Spring Boot':  { icon: 'spring/spring-original' },
  'SQLite':       { icon: 'sqlite/sqlite-original' },
  'SQLite3':      { icon: 'sqlite/sqlite-original' },
  'Strapi':       { icon: 'strapi/strapi-original' },
  'Strapi v5':    { icon: 'strapi/strapi-original' },
  'Supabase':     { icon: 'supabase/supabase-original' },
  'TypeScript':   { icon: 'typescript/typescript-original' },
  'Vite':         { icon: 'vitejs/vitejs-original' },
  'Vue 3':        { icon: 'vuejs/vuejs-original' },
}

const FallbackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="project-filter-tech__icon project-filter-tech__icon--fallback" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const TechIcon = ({ tech }: { tech: string }) => {
  const [failed, setFailed] = useState(false)
  const iconInfo = TECH_ICONS[tech]

  if (!iconInfo || failed) return <FallbackIcon />

  return (
    <img
      src={`${DI}/${iconInfo.icon}.svg`}
      alt=""
      width="16"
      height="16"
      aria-hidden="true"
      className={`project-filter-tech__icon${iconInfo.invert ? ' project-filter-tech__icon--invert' : ''}`}
      onError={() => setFailed(true)}
    />
  )
}

interface Props {
  active: Category[]
  onChange: (cats: Category[]) => void
  activeTechs: string[]
  onChangeTechs: (techs: string[]) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const ProjectFilter = ({ active, onChange, activeTechs, onChangeTechs, searchQuery, onSearchChange }: Props) => {
  const { t } = useTranslation()
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isAllCategories = active.length === 0 || active.length === ALL_CATEGORIES.length

  const handleAllCategories = () => onChange([])

  const handleToggleCategory = (cat: Category) => {
    if (active.includes(cat)) {
      const next = active.filter(c => c !== cat)
      onChange(next.length === 0 ? [] : next)
    } else {
      const next = [...active, cat]
      onChange(next.length === ALL_CATEGORIES.length ? [] : next)
    }
  }

  const handleToggleTech = (tech: string) => {
    if (activeTechs.includes(tech)) {
      onChangeTechs(activeTechs.filter(t => t !== tech))
    } else {
      onChangeTechs([...activeTechs, tech])
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTechDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="project-filter-container">
      <div className="project-filter-search">
        <input
          type="text"
          placeholder={t('projects.filter.search')}
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="project-filter-search__input"
        />
      </div>

      <div className="project-filter" role="group" aria-label={t('projects.filter.label')}>
        <button
          type="button"
          className={`project-filter__btn${isAllCategories ? ' project-filter__btn--active' : ''}`}
          onClick={handleAllCategories}
          aria-pressed={isAllCategories}
        >
          {t('projects.filter.all')}
        </button>

        {ALL_CATEGORIES.map(cat => {
          const isActive = active.includes(cat)
          return (
            <button
              key={cat}
              type="button"
              className={`project-filter__btn project-filter__btn--${cat}${isActive && !isAllCategories ? ' project-filter__btn--active' : ''}`}
              onClick={() => handleToggleCategory(cat)}
              aria-pressed={isActive && !isAllCategories}
            >
              {t(`projects.categories.${cat}`)}
            </button>
          )
        })}
      </div>

      <div className="project-filter-tech" ref={dropdownRef}>
        <button
          type="button"
          className={`project-filter__btn project-filter-tech__toggle${activeTechs.length > 0 ? ' project-filter__btn--active' : ''}`}
          onClick={() => setIsTechDropdownOpen(!isTechDropdownOpen)}
          aria-expanded={isTechDropdownOpen}
        >
          {t('projects.filter.techs')} {activeTechs.length > 0 && `(${activeTechs.length})`}
          <span className="project-filter-tech__arrow">{isTechDropdownOpen ? '▲' : '▼'}</span>
        </button>
        
        {isTechDropdownOpen && (
          <div className="project-filter-tech__dropdown">
            {ALL_TECHS.map(tech => (
              <label key={tech} className="project-filter-tech__option">
                <input
                  type="checkbox"
                  checked={activeTechs.includes(tech)}
                  onChange={() => handleToggleTech(tech)}
                />
                <TechIcon tech={tech} />
                <span className="project-filter-tech__label">{tech}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectFilter
