import { useTranslation } from 'react-i18next'

const Contact = () => {
  const { t } = useTranslation()

  return (
    <main className="page page--contact">
      <h1>{t('contact.title')}</h1>
      <p className="text-muted">{t('contact.subtitle')}</p>

      <ul className="contact__links">
        <li>
          <span className="contact__label">{t('contact.email')}</span>
          <a href="mailto:dorianjacolin@gmail.com" className="contact__value">
            dorianjacolin@gmail.com
          </a>
        </li>
        <li>
          <span className="contact__label">{t('contact.github')}</span>
          <a
            href="https://github.com/Jacma-pro"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__value"
          >
            github.com/Jacma-pro
          </a>
        </li>
        <li>
          <span className="contact__label">{t('contact.linkedin')}</span>
          <a
            href="https://www.linkedin.com/in/dorian-jacolin/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__value"
          >
            linkedin.com/in/dorian-jacolin
          </a>
        </li>
      </ul>
    </main>
  )
}

export default Contact
