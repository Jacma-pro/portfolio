import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ContactCard from '../components/ContactCard'
import Reveal from '../components/motion/Reveal'
import SplitText from '../components/motion/SplitText'
import { Mail, GitHub, LinkedIn, MapPin, ArrowRight } from '../components/icons'
import { EASE } from '../motion/variants'
import './Contact.scss'

type FormStatus = 'idle' | 'sent'

const Contact = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (status === 'sent') setStatus('idle')
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

      <div className="contact">

        {/* ── Colonne gauche ───────────────────────────────────────── */}
        <div className="contact__aside">
          <span className="eyebrow">{t('contact.eyebrow')}</span>

          <h1 className="contact__title">
            <SplitText text={t('contact.title')} by="char" delay={0.15} step={0.04} />
          </h1>

          <p className="contact__subtitle">{t('contact.subtitle')}</p>

          <span className="status-badge">
            <span className="status-badge__dot" />
            {t('contact.available')}
          </span>

          <nav className="contact__links" aria-label={t('contact.links_label')}>
            <h2 className="contact__links-title">{t('contact.links_title')}</h2>

            <ContactCard
              href="mailto:dorianjacolin@gmail.com"
              icon={<Mail size={18} />}
              label={t('contact.email')}
              value="dorianjacolin@gmail.com"
              variant="email"
            />
            <ContactCard
              href="https://github.com/Jacma-pro"
              icon={<GitHub size={18} />}
              label={t('contact.github')}
              value="Jacma-pro"
              variant="github"
              external
            />
            <ContactCard
              href="https://www.linkedin.com/in/dorian-jacolin/"
              icon={<LinkedIn size={18} />}
              label={t('contact.linkedin')}
              value="dorian-jacolin"
              variant="linkedin"
              external
            />
          </nav>

          <p className="contact__location">
            <MapPin size={15} />
            {t('contact.location')}
          </p>
        </div>

        {/* ── Formulaire ───────────────────────────────────────────── */}
        <Reveal direction="left" className="contact__form-wrap" amount={0.1}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="contact-form__title">{t('contact.form.title')}</h2>

            <div className="contact-form__field">
              <label htmlFor="contact-name">{t('contact.form.name')}</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('contact.form.name_placeholder')}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-email">{t('contact.form.email')}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="contact-form__field">
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

            <button type="submit" className="btn btn--primary contact-form__submit">
              {status === 'sent' ? t('contact.form.sent') : t('contact.form.send')}
              <ArrowRight />
            </button>

            {status === 'sent' && (
              <motion.p
                className="contact-form__feedback"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE.outExpo }}
                role="status"
              >
                {t('contact.form.success')}
              </motion.p>
            )}
          </form>
        </Reveal>

      </div>
    </main>
  )
}

export default Contact
