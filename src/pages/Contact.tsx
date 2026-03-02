import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContactCard from '../components/ContactCard'
import './Contact.scss'

// SVG incos (take on web)
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

type FormStatus = 'idle' | 'sent'

const Contact = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio : ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`)
    window.location.href = `mailto:dorianjacolin@gmail.com?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <main className="page page--contact">

      <div className="contact__header">
        <h1>{t('contact.title')}</h1>
        <p className="text-muted">{t('contact.subtitle')}</p>
        <span className="contact__badge">{t('contact.available')}</span>
      </div>

      <div className="contact__body">

        <section className="contact__cards" aria-label={t('contact.links_label')}>
          <h2 className="contact__section-title">{t('contact.links_title')}</h2>


          <ContactCard
            href="mailto:dorianjacolin@gmail.com"
            icon={<MailIcon />}
            label={t('contact.email')}
            value="dorianjacolin@gmail.com"
          />
          <ContactCard
            href="https://github.com/Jacma-pro"
            icon={<GitHubIcon />}
            label={t('contact.github')}
            value="Jacma-pro"
            variant="github"
            external
          />
          <ContactCard
            href="https://www.linkedin.com/in/dorian-jacolin/"
            icon={<LinkedInIcon />}
            label={t('contact.linkedin')}
            value="dorian-jacolin"
            variant="linkedin"
            external
          />
          <p className="text-muted">{t('contact.location')}</p>
        </section>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <h2 className="contact__section-title">{t('contact.form.title')}</h2>
          <div className="contact__field">
            <label htmlFor="contact-name">{t('contact.form.name')}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder={t('contact.form.name_placeholder')}
            />
          </div>

          <div className="contact__field">
            <label htmlFor="contact-email">{t('contact.form.email')}</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="contact-message">{t('contact.form.message')}</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder={t('contact.form.message_placeholder')}
            />
          </div>

          <button type="submit" className="contact__submit" disabled={status === 'sent'}>
            {status === 'sent' ? t('contact.form.sent') : t('contact.form.send')}
          </button>

          {status === 'sent' && (
            <p className="contact__feedback contact__feedback--success">
              {t('contact.form.success')}
            </p>
          )}
        </form>

      </div>
    </main>
  )
}

export default Contact
