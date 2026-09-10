/**
 * Savoir-être mis en avant sur la page d'accueil.
 * Les tracés sont des pictogrammes génériques (grille 24×24, trait 2), pas des
 * logos : ils illustrent une qualité, pas une marque.
 * Les libellés et descriptions vivent dans les traductions.
 */

export type SoftColor = 'blue' | 'teal' | 'pink' | 'yellow'

export interface SoftSkill {
  key: string
  color: SoftColor
  path: string
}

export const SOFT_SKILLS: SoftSkill[] = [
  { key: 'curiosity',     color: 'blue',   path: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z' },
  { key: 'adaptability',  color: 'teal',   path: 'M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15' },
  { key: 'collaboration', color: 'pink',   path: 'M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1zm0 0h6v-1a6 6 0 0 0-9-5.197M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z' },
  { key: 'proactivity',   color: 'yellow', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
]
