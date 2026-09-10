import type { ReactNode } from 'react'
import { ArrowUpRight } from './icons'

interface ContactCardProps {
  href: string
  icon: ReactNode
  label: string
  value: string
  variant?: 'default' | 'email' | 'github' | 'linkedin'
  external?: boolean
}

const ContactCard = ({
  href,
  icon,
  label,
  value,
  variant = 'default',
  external = false,
}: ContactCardProps) => (
  <a
    href={href}
    className="contact-card"
    data-variant={variant}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
  >
    <span className="contact-card__icon">{icon}</span>

    <span className="contact-card__body">
      <span className="contact-card__label">{label}</span>
      <span className="contact-card__value">{value}</span>
    </span>

    <ArrowUpRight size={16} className="contact-card__arrow" />
  </a>
)

export default ContactCard
