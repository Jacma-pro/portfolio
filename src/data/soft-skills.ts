/**
 * Savoir-être mis en avant sur la page d'accueil.
 * Chaque entrée est un fait vécu plutôt qu'une qualité abstraite : la qualité
 * n'apparaît qu'en étiquette. `project` pointe vers le projet qui en témoigne.
 * Les textes vivent dans les traductions.
 */

export type SoftColor = 'blue' | 'teal' | 'pink' | 'yellow'

export interface SoftSkill {
  key: string
  color: SoftColor
  project?: string
}

export const SOFT_SKILLS: SoftSkill[] = [
  { key: 'curiosity',     color: 'blue',   project: 'api-auth' },
  { key: 'adaptability',  color: 'teal' },
  { key: 'collaboration', color: 'pink',   project: 'lkk' },
  { key: 'perseverance',  color: 'yellow' },
]
