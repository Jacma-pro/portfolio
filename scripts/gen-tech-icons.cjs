const si = require('simple-icons')
const fs = require('fs')

// Libellé affiché (celui de Dorian) → slug Simple Icons, groupé par nature.
// L'ordre de ce tableau est l'ordre d'affichage.
const GROUPS = {
  dev: [
    ['React',       'siReact'],
    ['TypeScript',  'siTypescript'],
    ['Vue 3',       'siVuedotjs'],
    ['Angular',     'siAngular'],
    ['SCSS',        'siSass'],
    ['Vite',        'siVite'],
    ['Node.js',     'siNodedotjs'],
    ['Express',     'siExpress'],
    ['Spring Boot', 'siSpringboot'],
    ['Maven',       'siApachemaven'],
  ],
  data: [
    ['PostgreSQL',  'siPostgresql'],
    ['MySQL',       'siMysql'],
    ['SQLite',      'siSqlite'],
    ['Supabase',    'siSupabase'],
    ['Strapi',      'siStrapi'],
    ['DBeaver',     'siDbeaver'],
    ['Grafana',     'siGrafana'],
  ],
  tools: [
    ['Git',         'siGit'],
    ['GitLab',      'siGitlab'],
    ['Jenkins',     'siJenkins'],
    ['Jira',        'siJira'],
    ['Confluence',  'siConfluence'],
    ['Swagger',     'siSwagger'],
    ['Figma',       'siFigma'],
    ['Claude Code', 'siClaudecode'],
  ],
}

const STACK = Object.entries(GROUPS).flatMap(([group, items]) =>
  items.map(([label, key]) => ({ label, key, group })))

// Luminance relative (WCAG) : sert à repérer les marques trop sombres pour
// être lisibles sur le fond sombre du site.
const luminance = (hex) => {
  const c = [0, 2, 4].map(i => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

// Éclaircit une couleur en conservant sa teinte et sa saturation : la marque
// reste reconnaissable, contrairement à un remplacement par du blanc.
const lighten = (hex, targetL = 0.62) => {
  const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  let h = 0
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  // Une marque quasi neutre (Angular, Express) n'a pas de teinte à préserver :
  // on la rend simplement claire.
  const sat = s < 0.08 ? 0 : Math.max(s, 0.45)
  const c2 = (1 - Math.abs(2 * targetL - 1)) * sat
  const x = c2 * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = targetL - c2 / 2
  const seg = Math.floor(h / 60) % 6
  const rgb = [[c2,x,0],[x,c2,0],[0,c2,x],[0,x,c2],[x,0,c2],[c2,0,x]][seg]
  return '#' + rgb.map(v => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('')
}

const entries = STACK.map(({ label, key, group }) => {
  const icon = si[key]
  if (!icon) throw new Error('icône introuvable : ' + key)
  const lum = luminance(icon.hex)
  const tooDark = lum < 0.06
  // Angular, Express, SQLite… ont une teinte de marque quasi noire : illisible
  // sur fond sombre. On l'éclaircit au lieu de la remplacer.
  const brand = tooDark ? lighten(icon.hex) : `#${icon.hex}`
  return { label, group, slug: icon.slug, title: icon.title, brand, path: icon.path, dark: tooDark, source: icon.hex }
})

const body = entries.map(e =>
  `  {
    label: ${JSON.stringify(e.label)},
    slug: ${JSON.stringify(e.slug)},
    group: ${JSON.stringify(e.group)},
    // ${e.title}${e.dark ? ` — teinte officielle #${e.source} trop sombre sur fond noir, éclaircie` : ''}
    brand: ${JSON.stringify(e.brand)},
    path: ${JSON.stringify(e.path)},
  },`).join('\n')

const out = `/**
 * Logos des technologies de la section « Ma stack ».
 *
 * Tracés et couleurs de marque repris tels quels de Simple Icons
 * (https://simpleicons.org, icônes sous licence CC0-1.0). Ils sont figés ici
 * plutôt qu'importés, pour ne pas embarquer le paquet au runtime.
 *
 * Pour régénérer : npm i -D simple-icons puis node scripts/gen-tech-icons.cjs
 *
 * Les marques restent la propriété de leurs détenteurs ; elles ne servent ici
 * qu'à désigner la technologie.
 */

/** Nature de l'outil — sert à regrouper l'affichage. */
export type TechGroup = 'dev' | 'data' | 'tools'

/** Ordre d'affichage des groupes. Les libellés vivent dans les traductions. */
export const TECH_GROUPS: TechGroup[] = ['dev', 'data', 'tools']

export interface TechIcon {
  /** Libellé affiché — pas toujours le nom officiel de la marque (ex. « Vue 3 »). */
  label: string
  slug: string
  group: TechGroup
  /** Couleur officielle de la marque, ou couleur de repli si elle est illisible sur fond sombre. */
  brand: string
  /** Tracé SVG, sur une grille 24×24. */
  path: string
}

export const TECH_ICONS: TechIcon[] = [
${body}
]
`

fs.mkdirSync('scripts', { recursive: true })
fs.writeFileSync('src/data/tech-icons.ts', out)
console.log('écrit : src/data/tech-icons.ts —', entries.length, 'icônes')
console.log('remplacées (trop sombres) :', entries.filter(e => e.dark).map(e => e.label).join(', ') || 'aucune')
