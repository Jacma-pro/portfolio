import { useTranslation } from 'react-i18next'
import type { Category } from '../data/projects'
import './ProjectFilter.scss'

const ALL_CATEGORIES: Category[] = ['front', 'back', 'mockup']

interface Props {
  active: Category[]
  onChange: (cats: Category[]) => void
}

const ProjectFilter = ({ active, onChange }: Props) => {
  const { t } = useTranslation()

  const isAll = active.length === 0 || active.length === ALL_CATEGORIES.length

  const handleAll = () => onChange([])

  const handleToggle = (cat: Category) => {
    if (active.includes(cat)) {
      const next = active.filter(c => c !== cat)
      // Si on décoche le dernier → revenir à "Tous"
      onChange(next.length === 0 ? [] : next)
    } else {
      const next = [...active, cat]
      // Si toutes sélectionnées → équivalent "Tous"
      onChange(next.length === ALL_CATEGORIES.length ? [] : next)
    }
  }

  return (
    <div className="project-filter" role="group" aria-label={t('projects.filter.label')}>
      <button
        type="button"
        className={`project-filter__btn${isAll ? ' project-filter__btn--active' : ''}`}
        onClick={handleAll}
        aria-pressed={isAll}
      >
        {t('projects.filter.all')}
        <span className="project-filter__count">
          {/* total projects count passed via context — on affiche juste le label ici */}
        </span>
      </button>

      {ALL_CATEGORIES.map(cat => {
        const isActive = active.includes(cat)
        return (
          <button
            key={cat}
            type="button"
            className={`project-filter__btn project-filter__btn--${cat}${isActive && !isAll ? ' project-filter__btn--active' : ''}`}
            onClick={() => handleToggle(cat)}
            aria-pressed={isActive && !isAll}
          >
            {t(`projects.categories.${cat}`)}
          </button>
        )
      })}
    </div>
  )
}

export default ProjectFilter
