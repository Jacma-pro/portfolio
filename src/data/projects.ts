// ── Todo ──────────────────────────────────────────────────────────────────────
import superTodoCover from '../assets/projects/FRONT/super-todo/home-screen.png'
import todo1 from '../assets/projects/FRONT/super-todo/football.png'
import todo2 from '../assets/projects/FRONT/super-todo/basketball.png'
import todo3 from '../assets/projects/FRONT/super-todo/localhost.png'

// ── 50 ans ────────────────────────────────────────────────────────────────────
import cinquanteAnsCover from '../assets/projects/FRONT/50ans/screen/home.png'
import cinquanteAns1 from '../assets/projects/FRONT/50ans/screen/information.png'
import cinquanteAns2 from '../assets/projects/FRONT/50ans/screen/inscription.png'

// ── Stegano ─────────────────────────────────────────────────────────────────
import steganoHome from '../assets/projects/FRONT/stegano/screen/home.png'
import stegano1 from '../assets/projects/FRONT/stegano/screen/learnTp.png'
import stegano2 from '../assets/projects/FRONT/stegano/screen/praticeTp.png'
import stegano3 from '../assets/projects/FRONT/stegano/screen/codeMessage.png'
import stegano4 from '../assets/projects/FRONT/stegano/screen/QCM.png'

// ── api auth ───────────────────────────────────────────────────────────────────
import apiAuthCover from '../assets/projects/BACK/api-auth/sing.png'
import apiAuth1 from '../assets/projects/BACK/api-auth/failed.png'
import apiAuth2 from '../assets/projects/BACK/api-auth/profil.png'
import apiAuth3 from '../assets/projects/BACK/api-auth/logout.png'
import apiAuth4 from '../assets/projects/BACK/api-auth/request.png'
import apiAuth5 from '../assets/projects/BACK/api-auth/success.png'

// ── poke api ───────────────────────────────────────────────────────────────────
import pokeApiCover from '../assets/projects/BACK/poke-api/screen/home.png'
import pokeApi1 from '../assets/projects/BACK/poke-api/screen/Preview.png'
import pokeApi2 from '../assets/projects/BACK/poke-api/screen/request.png'

// ── BDD Streaming ──────────────────────────────────────────────────────────────
import bddCover from '../assets/projects/BACK/BDD/screen/MCD.png'
import bdd1 from '../assets/projects/BACK/BDD/screen/MLD.png'
import bdd2 from '../assets/projects/BACK/BDD/screen/MPD.png'
import bdd3 from '../assets/projects/BACK/BDD/screen/requetes.png'

// ── Mockup: BIKE ───────────────────────────────────────────────────────────────
import bikeHome from '../assets/projects/MOCKUP/BIKE/screen/home.png'
import bikeFull from '../assets/projects/MOCKUP/BIKE/screen/full_view.png'
import bikeAvis from '../assets/projects/MOCKUP/BIKE/screen/avis.png'

// ── Mockup: LKK ────────────────────────────────────────────────────────────────
import lkkTwo from '../assets/projects/MOCKUP/LKK/screen/two_section.png'
import lkkFull from '../assets/projects/MOCKUP/LKK/screen/full_view.png'
import lkkHover from '../assets/projects/MOCKUP/LKK/screen/animation_hover.png'
import lkkFooter from '../assets/projects/MOCKUP/LKK/screen/footer.png'
import lkkPdf from '../assets/projects/MOCKUP/LKK/Lee Kum Kee - B2.pdf'

// ── Mockup: RL-WP ──────────────────────────────────────────────────────────────
import rlHome from '../assets/projects/MOCKUP/RL-WP/screen/home.png'
import rlFull from '../assets/projects/MOCKUP/RL-WP/screen/full_view.png'
import rlStory from '../assets/projects/MOCKUP/RL-WP/screen/story.png'
import rlArticle from '../assets/projects/MOCKUP/RL-WP/screen/pre_acticle.png'
import rlForm from '../assets/projects/MOCKUP/RL-WP/screen/form.png'
import rlMobile from '../assets/projects/MOCKUP/RL-WP/screen/mobile.png'
import rlPdf from '../assets/projects/MOCKUP/RL-WP/Dorian_Jacolin_b2_2025_maquettes_WP.pdf'

export type Category = 'front' | 'back' | 'mockup'

export interface Project {
  id:       string
  category: Category
  cover?:   string
  techs:    string[]
  github?:  string
  demo?:    string
  figma?:   string
  pdf?:     string
  images?:  string[]
}

export const PROJECTS: Project[] = [
  // ── Front ──────────────────────────────────────────────────────────────────
  {
    id: "super-todo",
    category: "front",
    cover: superTodoCover,
    techs: ["Vue 3", "Vite", "CSS3", "LocalStorage"],
    github: "https://github.com/Jacma-pro/FRONT_Superb-To-Do",
    demo: "https://super-to-do-five.vercel.app/",
    images: [todo1, todo2, todo3]
  },
  {
    id: "stegano",
    category: "front",
    cover: steganoHome,
    techs: ["React", "TypeScript", "Vite", "LSB", "LocalStorage"],
    github: "https://github.com/Jacma-pro/stegano-lab",
    demo: "https://stegano-lab.vercel.app/",
    images: [stegano2, stegano1, stegano3, steganoHome, stegano4]
  },
  {
    id: "50ans",
    category: "front",
    cover: cinquanteAnsCover,
    techs: ["HTML5", "CSS3", "JavaScript", "PHP"],
    github: "https://github.com/Jacma-pro/FRONT_50ans",
    images: [cinquanteAnsCover, cinquanteAns1, cinquanteAns2]
  },

  // ── Back ───────────────────────────────────────────────────────────────────
  {
    id: "api-auth",
    category: "back",
    cover: apiAuthCover,
    techs: ["Node.js", "Express.js", "SQLite3", "bcryptjs", "JWT", "Helmet"],
    github: "https://github.com/Jacma-pro/BACK_api-auth",
    images: [apiAuthCover, apiAuth5, apiAuth1, apiAuth2, apiAuth3, apiAuth4]
  },
  {
    id: "poke-api",
    category: "back",
    cover: pokeApiCover,
    techs: ["Strapi v5", "Node.js", "SQLite", "React 19", "Vite", "PokéAPI"],
    github: "https://github.com/Jacma-pro/BACK_pokemon-project",
    images: [pokeApiCover, pokeApi1, pokeApi2]
  },
  {
    id: "bdd-streaming",
    category: "back",
    cover: bddCover,
    techs: ["MySQL", "SQL", "phpMyAdmin", "MCD/MLD/MPD"],
    figma: "https://www.figma.com/board/xzWrSJyFflQarWZLpC6eqz/BDD?node-id=0-1&t=5TnF1ZKUwft95FsV-1",
    images: [bddCover, bdd1, bdd2, bdd3]
  },

  // ── mockup ─────────────────────────────────────────────────────────────────
  {
    id: "bike",
    category: "mockup",
    cover: bikeHome,
    techs: ["Figma"],
    figma: "https://www.figma.com/design/8MTYxftwIpQqcGXfwadMEl/DORIAN---B2---J1?node-id=0-1&t=i8I2E2wYXY0u6q1N-1",
    images: [bikeHome, bikeFull, bikeAvis]
  },
  {
    id: "rl-wp",
    category: "mockup",
    cover: rlHome,
    techs: ["Figma"],
    figma: "https://www.figma.com/design/v2e97AVQGbCCl8YKxzN6p9/Dorian_Jacolin_b2_2025_maquettes_WP?node-id=0-1&t=U0Iw5B68B38Judkf-1",
    pdf: rlPdf,
    images: [rlHome, rlFull, rlStory, rlArticle, rlForm, rlMobile]
  },
  {
    id: "lkk",
    category: "mockup",
    cover: lkkTwo,
    techs: ["Figma"],
    figma: "https://www.figma.com/design/8vPmm4l10yyhTX9EldJeOy/Lee-Kum-Kee---B2?node-id=0-1&t=diRcpW2yODxLWGjK-1",
    pdf: lkkPdf,
    images: [lkkTwo, lkkFull, lkkHover, lkkFooter]
  }
]

export const CATEGORIES: Category[] = ['front', 'back', 'mockup']
