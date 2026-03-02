import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import ProjectPresentation from '../components/ProjectPresentation'
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

      <ProjectPresentation project={project} />
    </main>
  )
}

export default ProjectDetail
