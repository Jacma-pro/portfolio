import thermobreakCover from '../assets/projet-cover/thermobreak.png'

export type Category = 'front' | 'back' | 'divers'

export interface Project {
  id:       string
  category: Category
  cover?:   string
  techs:    string[]
  github?:  string
  demo?:    string
}

export const PROJECTS: Project[] = [
  // ── Front ──────────────────────────────────────────────────────────────────
  {
    id: "test",
    category: "front",
    cover: thermobreakCover,
    techs: ["tech1", "tech2", "tech3"],
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
