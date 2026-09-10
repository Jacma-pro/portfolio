import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import { ArrowUpRight } from './icons'
import './ProjectCard.scss'

interface Props {
  project: Project
  /** Position dans la grille — affichée en petit numéro d'archive. */
  index?: number
}

const ProjectCard = ({ project, index }: Props) => {
  const { t } = useTranslation()
  const title = t(`projects.items.${project.id}.title`)

  return (
    <Link
      className="project-card"
      to={`/projects/${project.id}`}
      data-category={project.category}
      aria-label={title}
    >
      <div className="project-card__cover">
        {project.cover ? (
          <img src={project.cover} alt="" className="project-card__img" loading="lazy" />
        ) : (
          <div className="project-card__placeholder" aria-hidden="true" />
        )}

        <span className="project-card__scrim" aria-hidden="true" />

        <span className="project-card__category">
          {t(`projects.categories.${project.category}`)}
        </span>

        {index !== undefined && (
          <span className="project-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        <span className="project-card__cta" aria-hidden="true">
          {t('home.view_project')}
          <ArrowUpRight size={14} />
        </span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{t(`projects.items.${project.id}.short`)}</p>

        <ul className="project-card__techs" aria-label="Technologies">
          {project.techs.slice(0, 4).map(tech => (
            <li key={tech} className="project-card__tech">{tech}</li>
          ))}
          {project.techs.length > 4 && (
            <li className="project-card__tech project-card__tech--more">
              +{project.techs.length - 4}
            </li>
          )}
        </ul>
      </div>
    </Link>
  )
}

export default ProjectCard
