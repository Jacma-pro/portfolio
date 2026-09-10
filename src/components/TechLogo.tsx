import type { TechIcon } from '../data/tech-icons'

interface Props {
  tech: TechIcon
  size?: number
  className?: string
}

/**
 * Logo d'une techno, sur la grille 24×24 de Simple Icons.
 * Peint en `currentColor` : c'est le contexte (puce, bandeau) qui décide de
 * la teinte, et la couleur de marque ne s'applique qu'au survol.
 */
const TechLogo = ({ tech, size = 16, className }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-hidden="true"
    className={className}
  >
    <path d={tech.path} />
  </svg>
)

export default TechLogo
