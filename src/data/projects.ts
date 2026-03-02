import thermobreakCover from '../assets/projet-cover/thermobreak.png'
import superTodoCover from '../assets/projects/super-todo/home-screen.png'
import img1 from '../assets/projects/super-todo/football.png'
import img2 from '../assets/projects/super-todo/basketball.png'
import img3 from '../assets/projects/super-todo/localhost.png'

export type Category = 'front' | 'back' | 'divers'

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
    images: [img1, img2, img3]
  },
  {
    id: "test",
    category: "front",
    cover: thermobreakCover,
    techs: ["tech1", "tech2", "tech3"],
  },
  {
    id: "test",
     category: "front",
      techs: ["tech1", "tech2", "tech3"]
},

  // ── Back ───────────────────────────────────────────────────────────────────
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
  {
    id: "test",
    category: "back",
    techs: ["tech1", "tech2", "tech3"],
  },

  // ── Divers ─────────────────────────────────────────────────────────────────
  {
    id: "test",
    category: "divers",
    techs: ["tech1", "tech2", "tech3"],
  },
  {
    id: "test",
    category: "divers",
    techs: ["tech1", "tech2", "tech3"],
  },
  {
    id: "test",
    category: "divers",
    techs: ["tech1", "tech2", "tech3"],
  }
]

export const CATEGORIES: Category[] = ['front', 'back', 'divers']
