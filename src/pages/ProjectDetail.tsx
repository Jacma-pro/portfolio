import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import './ProjectDetail.scss'

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { t }  = useTranslation()

  const project = PROJECTS.find(p => p.id === id)

  if (!project) {
    return (
      <main className="page page--project-detail">
        <p className="text-muted">{t('projects.not_found')}</p>
        <Link to="/projects" className="project-detail__back">
          ← {t('projects.back')}
        </Link>
      </main>
    )
  }

  return (
    <main className="page page--project-detail project-detail">
      <Link to="/projects" className="project-detail__back">
        ← {t('projects.back')}
      </Link>

      {project.cover && (
        <div className="project-detail__cover-wrap">
          <img
            src={project.cover}
            alt={t(`projects.items.${project.id}.title`)}
            className="project-detail__cover"
          />
        </div>
      )}

      <div className="project-detail__header">
        <span className="project-detail__category">
          {t(`projects.categories.${project.category}`)}
        </span>
        <h1 className="project-detail__title">
          {t(`projects.items.${project.id}.title`)}
        </h1>
        <p className="project-detail__desc">
          {t(`projects.items.${project.id}.desc`)}
        </p>
      </div>

      <section className="project-detail__section">
        <h2>{t('projects.detail.techs')}</h2>
        <ul className="project-detail__techs">
          {project.techs.map(tech => (
            <li key={tech} className="project-detail__tech">{tech}</li>
          ))}
        </ul>
      </section>

      {(project.github || project.demo) && (
        <section className="project-detail__section project-detail__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail__link project-detail__link--github"
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail__link project-detail__link--demo"
            >
              {t('projects.detail.demo')} ↗
            </a>
          )}
        </section>
      )}
    </main>
  )
}

export default ProjectDetail
