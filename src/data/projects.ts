// ── Todo ──────────────────────────────────────────────────────────────────────
import superTodoCover from '../assets/projects/FRONT/super-todo/home-screen.png'
import todo1 from '../assets/projects/FRONT/super-todo/football.png'
import todo2 from '../assets/projects/FRONT/super-todo/basketball.png'
import todo3 from '../assets/projects/FRONT/super-todo/localhost.png'

// ── api auth ───────────────────────────────────────────────────────────────────
import apiAuthCover from '../assets/projects/BACK/api-auth/sing.png'
import apiAuth1 from '../assets/projects/BACK/api-auth/failed.png'
import apiAuth2 from '../assets/projects/BACK/api-auth/profil.png'
import apiAuth3 from '../assets/projects/BACK/api-auth/logout.png'
import apiAuth4 from '../assets/projects/BACK/api-auth/request.png'
import apiAuth5 from '../assets/projects/BACK/api-auth/success.png'

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
    id: "test",
    category: "front",
    techs: ["tech1", "tech2", "tech3"],
  },
  {
    id: "test",
    category: "front",
    techs: ["tech1", "tech2", "tech3"]
},

  // ── Back ───────────────────────────────────────────────────────────────────
  {
    id: "api-auth",
    category: "back",
    cover: apiAuthCover,
    techs: ["Node.js", "Express.js", "SQLite3", "bcryptjs", "JWT", "Helmet"],
    images: [apiAuthCover, apiAuth5, apiAuth1, apiAuth2, apiAuth3, apiAuth4]
  },
  {
    id: "test",
    category: "back",
    techs: ["tech1", "tech2", "tech3"],
  },
  {
    id: "test",
    category: "back",
    techs: ["tech1", "tech2", "tech3"],
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
