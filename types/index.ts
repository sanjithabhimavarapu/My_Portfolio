export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  live: string
}

export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  skills: string[]
}
