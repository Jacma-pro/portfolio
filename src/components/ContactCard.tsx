import type { ReactNode } from 'react'

interface ContactCardProps {
  href: string
  icon: ReactNode
  label: string
  value: string
  variant?: 'default' | 'email'| 'github' | 'linkedin'
  external?: boolean
}

const ContactCard = ({
  href,
  icon,
  label,
  value,
  variant = 'default',
  external = false,
}: ContactCardProps) => {
  const modifierClass = variant !== 'default' ? ` contact__card--${variant}` : ''

  return (
    <a
      href={href}
      className={`contact__card${modifierClass}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="contact__card-icon">{icon}</span>
      <div>
        <span className="contact__card-label">{label}</span>
        <span className="contact__card-value">{value}</span>
      </div>
    </a>
  )
}

export default ContactCard
