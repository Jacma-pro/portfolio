import { useTranslation } from 'react-i18next'

const Projects = () => {
  const { t } = useTranslation()

  return (
    <main className="page page--projects">
      <h1>{t('projects.title')}</h1>
      <p className="text-muted">{t('projects.subtitle')}</p>
    </main>
  )
}

export default Projects
