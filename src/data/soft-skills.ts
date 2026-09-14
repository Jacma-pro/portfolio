/**
 * Savoir-être mis en avant sur la page d'accueil.
 * Chaque entrée est un fait vécu plutôt qu'une qualité abstraite : la qualité
 * n'apparaît qu'en étiquette. `proof` pointe vers ce qui en témoigne : un projet,
 * ou le passage de la page À propos où c'est raconté.
 * Les textes vivent dans les traductions.
 */

export type SoftColor = 'blue' | 'teal' | 'pink' | 'yellow'

export interface SoftSkill {
  key: string
  color: SoftColor
  proof?: { to: string; kind: 'project' | 'about' }
}

export const SOFT_SKILLS: SoftSkill[] = [
  { key: 'curiosity',     color: 'blue',   proof: { to: '/projects/api-auth', kind: 'project' } },
  { key: 'adaptability',  color: 'teal',   proof: { to: '/about#workflow',    kind: 'about' } },
  { key: 'collaboration', color: 'pink',   proof: { to: '/projects/lkk',      kind: 'project' } },
  { key: 'perseverance',  color: 'yellow', proof: { to: '/about#workflow',    kind: 'about' } },
]
