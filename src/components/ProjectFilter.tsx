import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PROJECTS, type Category } from '../data/projects'
import './ProjectFilter.scss'

const ALL_CATEGORIES: Category[] = ['front', 'back', 'mockup']

// Extrait toutes les technos uniques triées par ordre alphabétique
const ALL_TECHS = Array.from(new Set(PROJECTS.flatMap(p => p.techs))).sort((a, b) => a.localeCompare(b))

interface Props {
  active: Category[]
  onChange: (cats: Category[]) => void
  activeTechs: string[]
  onChangeTechs: (techs: string[]) => void
}

const ProjectFilter = ({ active, onChange, activeTechs, onChangeTechs }: Props) => {
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
