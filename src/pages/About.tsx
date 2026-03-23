import { useTranslation } from 'react-i18next'
import photoMe from '../assets/aboutme/photo/me.jpeg'
import photoSalon from '../assets/aboutme/photo/myDigitalSchool.png'
import './About.scss'

const About = () => {
  const { t } = useTranslation()

  return (
    <main className="page page--about">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="about__hero">
        <div className="about__hero-photo">
          <img src={photoMe} alt="Dorian Jacolin" />
        </div>
        <div className="about__hero-text">
          <h1>{t('about.title')}</h1>
          <p className="text-muted">{t('about.subtitle')}</p>
          <p className="about__intro">{t('about.intro')}</p>
        </div>
      </section>

      {/* ── Le déclic ────────────────────────────────────────── */}
      <section className="about__section">
        <h2>{t('about.declic_title')}</h2>
        <p>{t('about.declic')}</p>
        <p>{t('about.declic_2')}</p>
      </section>

      {/* ── Trouver le bon endroit ────────────────────────────── */}
      <section className="about__section">
        <h2>{t('about.school_title')}</h2>
        <p>{t('about.school')}</p>
        <p>{t('about.school_2')}</p>
      </section>

      {/* ── Apprendre en faisant ──────────────────────────────── */}
      <section className="about__section">
        <h2>{t('about.learning_title')}</h2>
        <p>{t('about.learning')}</p>
        <p>{t('about.learning_2')}</p>
      </section>

      {/* ── Equans Digital ────────────────────────────────────── */}
      <section className="about__section">
        <h2>{t('about.equans_title')}</h2>
        <p>{t('about.equans')}</p>
        <blockquote className="about__quote">
          {t('about.equans_2')}
        </blockquote>
      </section>

      {/* ── L'alternance ──────────────────────────────────────── */}
      <section className="about__section">
        <h2>{t('about.alternance_title')}</h2>
        <p>{t('about.alternance')}</p>
      </section>

      {/* ── Comment je fonctionne ─────────────────────────────── */}
      <section className="about__section">
        <h2>{t('about.workflow_title')}</h2>
        <p>{t('about.workflow')}</p>
        <p>{t('about.workflow_2')}</p>
        <p>{t('about.workflow_3')}</p>
      </section>

      {/* ── En dehors du code ─────────────────────────────────── */}
      <section className="about__section about__section--outside">
        <h2>{t('about.outside_title')}</h2>
        <div className="about__outside-content">
          <div className="about__outside-text">
            <p>{t('about.outside')}</p>
            <p>{t('about.outside_2')}</p>
            <p>{t('about.outside_3')}</p>
          </div>
          <div className="about__outside-photo">
            <img src={photoSalon} alt="Salon de l'étudiant – MyDigitalSchool" />
            <span className="about__photo-caption">Salon de l'étudiant - Nov 2025 - Grenoble</span>
          </div>
        </div>
      </section>

      {/* ── Et maintenant ? ───────────────────────────────────── */}
      <section className="about__section about__section--future">
        <h2>{t('about.future_title')}</h2>
        <p>{t('about.future')}</p>
        <p className="about__cta">{t('about.future_cta')}</p>
      </section>

    </main>
  )
}

export default About
