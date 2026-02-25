import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  return (
    <main className="page page--home">
      <h1>{t('home.title')}</h1>
      <p className="text-muted">{t('home.subtitle')}</p>
    </main>
  )
}

export default Home
