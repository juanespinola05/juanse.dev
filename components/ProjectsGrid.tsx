import { FunctionalComponent } from 'preact'
import { tw } from 'twind'
import { css } from 'twind/css'
import { projectsGrid } from '../utils/styles.ts'
import ProjectCard from './Project.tsx'
import { ProjectFrontMatter } from '../types/projects.d.ts'

interface IProps {
  projects: ProjectFrontMatter[]
}

const ProjectsGrid: FunctionalComponent<IProps> = ({ projects }) => {
  const gridLayout = tw(css(projectsGrid))
  return (
    <div
      class={`${gridLayout} grid gap-6 place-items-stretch`}
    >
      {projects.map((data, i) => <ProjectCard {...data} />)}
    </div>
  )
}

export default ProjectsGrid
