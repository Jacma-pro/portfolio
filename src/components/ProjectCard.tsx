import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/projects'
import './ProjectCard.scss'

interface Props {
  project: Project
}

const ProjectCard = ({ project }: Props) => {
  const { t } = useTranslation()

  return (
    <Link
      className="project-card"
      to={`/projects/${project.id}`}
      aria-label={t(`projects.items.${project.id}.title`)}
    >
      <div className="project-card__cover">
        {project.cover ? (
          <img
            src={project.cover}
            alt={t(`projects.items.${project.id}.title`)}
            className="project-card__img"
          />
        ) : (
          <div className="project-card__placeholder" aria-hidden="true" />
        )}
        <span className="project-card__category">
          {t(`projects.categories.${project.category}`)}
        </span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">
          {t(`projects.items.${project.id}.title`)}
        </h3>
        <p className="project-card__desc">
          {t(`projects.items.${project.id}.short`)}
        </p>

        <ul className="project-card__techs" aria-label="Technologies">
          {project.techs.map(tech => (
            <li key={tech} className="project-card__tech">{tech}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default ProjectCard
