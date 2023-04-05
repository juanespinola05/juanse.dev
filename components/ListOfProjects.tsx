import { FunctionalComponent, JSX } from 'preact'
import { Project } from '../types/projects.d.ts'
import ProjectsGrid from './ProjectsGrid.tsx'

const PROJECTS_PER_GRID = 6

interface IProps {
  projects: Project[]
}

const ListOfProjects: FunctionalComponent<IProps> = (
  { projects },
) => {
  const foo = projects.length / PROJECTS_PER_GRID
  const gridCount = Array.from({
    length: foo === 0 ? foo : Math.ceil(foo),
  })
  return (
    <div class='grid gap-6 my-12'>
      {gridCount.map((_, i) => {
        const start = i * PROJECTS_PER_GRID
        const end = start + PROJECTS_PER_GRID
        const items = projects.slice(start, end)
        return <ProjectsGrid projects={items} />
      })}
    </div>
  )
}

export default ListOfProjects
