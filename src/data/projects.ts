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

export type Category = 'front' | 'back' | 'mockup'

export interface Project {
  id:       string
  category: Category
  cover?:   string
  techs:    string[]
  github?:  string
  demo?:    string
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
    id: "test",
    category: "mockup",
    techs: ["tech1", "tech2", "tech3"],
  },
  {
    id: "test",
    category: "mockup",
    techs: ["tech1", "tech2", "tech3"],
  },
  {
    id: "test",
    category: "mockup",
    techs: ["tech1", "tech2", "tech3"],
  }
]

export const CATEGORIES: Category[] = ['front', 'back', 'mockup']
