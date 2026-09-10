const si = require('simple-icons')
const fs = require('fs')

// Libellé affiché (celui de Dorian) → slug Simple Icons, groupé par nature.
// L'ordre de ce tableau est l'ordre d'affichage.
// Simple Icons ne distribue pas le logo de Visual Studio Code (marque
// Microsoft). Faute de tracé officiel, on utilise des chevrons génériques :
// c'est un pictogramme, pas le logo de la marque, et c'est assumé comme tel.
const MANUAL = {
  vscode: {
    slug: 'vscode',
    title: 'VS Code',
    hex: '007ACC',
    generic: true,
    path: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6z',
  },
}

const GROUPS = {
  frontend: [
    ['React',       'siReact'],
    ['Vue 3',       'siVuedotjs'],
    ['Angular',     'siAngular'],
    ['TypeScript',  'siTypescript'],
    ['SCSS',        'siSass'],
    ['Vite',        'siVite'],
  ],
  backend: [
    ['Node.js',     'siNodedotjs'],
    ['Express',     'siExpress'],
    ['NestJS',      'siNestjs'],
    // Simple Icons ne porte pas Java (marque Oracle) : le logo OpenJDK en tient
    // lieu, c'est l'implémentation de référence.
    ['Java',        'siOpenjdk'],
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
    ['VS Code',     MANUAL.vscode],
    ['IntelliJ',    'siIntellijidea'],
    ['WebStorm',    'siWebstorm'],
    ['Git',         'siGit'],
    ['GitHub',      'siGithub'],
    ['GitLab',      'siGitlab'],
    ['Jenkins',     'siJenkins'],
    ['Docker',      'siDocker'],
    ['Jira',        'siJira'],
    ['Confluence',  'siConfluence'],
    ['Swagger',     'siSwagger'],
    ['Figma',       'siFigma'],
    ['Claude Code', 'siClaudecode'],
  ],
}

/** Couleur dodo portant chaque catégorie. */
const GROUP_COLORS = {
  frontend: 'blue',
  backend: 'teal',
  data: 'yellow',
  tools: 'pink',
}

const STACK = Object.entries(GROUPS).flatMap(([group, items]) =>
  items.map(([label, key]) => ({ label, key, group })))

// Site officiel de chaque techno, vérifié à la main : Simple Icons expose bien
// un champ `source`, mais il pointe vers l'origine du logo (page de presse,
// fichier GitHub…), pas vers la page d'accueil du projet.
const URLS = {
  react:        'https://react.dev',
  typescript:   'https://www.typescriptlang.org',
  vuedotjs:     'https://vuejs.org',
  angular:      'https://angular.dev',
  sass:         'https://sass-lang.com',
  vite:         'https://vite.dev',
  nodedotjs:    'https://nodejs.org',
  express:      'https://expressjs.com',
  nestjs:       'https://nestjs.com',
  openjdk:      'https://www.java.com',
  springboot:   'https://spring.io/projects/spring-boot',
  apachemaven:  'https://maven.apache.org',
  postgresql:   'https://www.postgresql.org',
  mysql:        'https://www.mysql.com',
  sqlite:       'https://www.sqlite.org',
  supabase:     'https://supabase.com',
  strapi:       'https://strapi.io',
  dbeaver:      'https://dbeaver.io',
  grafana:      'https://grafana.com',
  vscode:       'https://code.visualstudio.com',
  intellijidea: 'https://www.jetbrains.com/idea',
  webstorm:     'https://www.jetbrains.com/webstorm',
  git:          'https://git-scm.com',
  github:       'https://github.com',
  gitlab:       'https://about.gitlab.com',
  jenkins:      'https://www.jenkins.io',
  docker:       'https://www.docker.com',
  jira:         'https://www.atlassian.com/software/jira',
  confluence:   'https://www.atlassian.com/software/confluence',
  swagger:      'https://swagger.io',
  figma:        'https://www.figma.com',
  claudecode:   'https://claude.com/product/claude-code',
}

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
  const icon = typeof key === 'string' ? si[key] : key
  if (!icon) throw new Error('icône introuvable : ' + key)
  const lum = luminance(icon.hex)
  const tooDark = lum < 0.06
  // Angular, Express, SQLite… ont une teinte de marque quasi noire : illisible
  // sur fond sombre. On l'éclaircit au lieu de la remplacer.
  const brand = tooDark ? lighten(icon.hex) : `#${icon.hex}`
  const url = URLS[icon.slug]
  if (!url) throw new Error('URL manquante pour ' + icon.slug)
  return {
    label, group, slug: icon.slug, title: icon.title, brand, url,
    path: icon.path, dark: tooDark, source: icon.hex, generic: !!icon.generic,
  }
})

const body = entries.map(e =>
  `  {
    label: ${JSON.stringify(e.label)},
    slug: ${JSON.stringify(e.slug)},
    group: ${JSON.stringify(e.group)},
    url: ${JSON.stringify(e.url)},${e.generic ? '\n    // pictogramme générique : pas de logo de marque disponible\n    generic: true,' : ''}
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

/** Catégorie de compétence — reprend le découpage de la section Compétences. */
export type TechGroup = 'frontend' | 'backend' | 'data' | 'tools'

/** Couleur dodo portant chaque catégorie. */
export type GroupColor = 'blue' | 'teal' | 'yellow' | 'pink'

/** Ordre d'affichage. Les libellés visibles vivent dans les traductions. */
export const TECH_GROUPS: { id: TechGroup; color: GroupColor }[] = [
  { id: 'frontend', color: 'blue' },
  { id: 'backend', color: 'teal' },
  { id: 'data', color: 'yellow' },
  { id: 'tools', color: 'pink' },
]

export interface TechIcon {
  /** Libellé affiché — pas toujours le nom officiel de la marque (ex. « Vue 3 »). */
  label: string
  slug: string
  group: TechGroup
  /** Site officiel de la techno. */
  url: string
  /** Couleur officielle de la marque, ou couleur de repli si elle est illisible sur fond sombre. */
  brand: string
  /** Tracé SVG, sur une grille 24×24. */
  path: string
  /** Vrai quand aucun logo de marque n'existe et qu'on affiche un pictogramme. */
  generic?: boolean
}

export const TECH_ICONS: TechIcon[] = [
${body}
]
`

fs.mkdirSync('scripts', { recursive: true })
fs.writeFileSync('src/data/tech-icons.ts', out)
console.log('écrit : src/data/tech-icons.ts —', entries.length, 'icônes')
console.log('remplacées (trop sombres) :', entries.filter(e => e.dark).map(e => e.label).join(', ') || 'aucune')
console.log('pictogrammes génériques :', entries.filter(e => e.generic).map(e => e.label).join(', ') || 'aucun')
console.log('couleurs de catégorie :', JSON.stringify(GROUP_COLORS))
