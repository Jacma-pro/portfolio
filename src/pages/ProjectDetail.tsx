import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import ProjectPresentation from '../components/ProjectPresentation'
import Reveal from '../components/motion/Reveal'
import { ArrowLeft, ArrowRight } from '../components/icons'
import './ProjectDetail.scss'

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()

  const index = PROJECTS.findIndex(p => p.id === id)
  const project = index >= 0 ? PROJECTS[index] : undefined

  if (!project) {
    return (
      <main className="page page--detail">
        <div className="detail__missing">
          <p className="text-muted">{t('projects.not_found')}</p>
          <Link to="/projects" className="btn btn--outline">
            <ArrowLeft size={14} />
            {t('projects.back')}
          </Link>
        </div>
      </main>
    )
  }

  // Boucle sur la liste : le dernier projet renvoie vers le premier.
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  return (
    <main className="page page--detail">
      <Link to="/projects" className="detail__back">
        <ArrowLeft size={14} />
        {t('projects.back')}
      </Link>

      <ProjectPresentation project={project} />

      <Reveal direction="in" amount={0.2}>
        <Link to={`/projects/${next.id}`} className="detail__next">
          <span className="detail__next-label">{t('projects.detail.next')}</span>
          <span className="detail__next-title">
            {t(`projects.items.${next.id}.title`)}
          </span>
          <ArrowRight size={20} className="detail__next-arrow" />
        </Link>
      </Reveal>
    </main>
  )
}

export default ProjectDetail
