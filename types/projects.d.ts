export interface Project {
  active: boolean
  name: string
  description: string
  deploy: string
  sourceCode: string
  image: string
  excerpt: string
  body: string
  id: string
}

export interface ProjectFrontMatter extends Omit<Project, 'body' | 'id'> {}
