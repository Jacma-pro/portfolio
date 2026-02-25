import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

  return (
    <main className="page page--about">
      <h1>{t('about.title')}</h1>
      <p className="text-muted">{t('about.subtitle')}</p>
    </main>
  )
}

export default About
