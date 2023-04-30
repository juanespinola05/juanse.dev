import { FunctionalComponent } from 'preact'
import { Project } from '../types/projects.d.ts'
import { Post } from '../types/posts.d.ts'
import NotificactionModal from '../islands/NotificactionModal.tsx'
interface IProps {
  projects: Project[]
  posts: Post[]
}

const TWO_WEEKS_MS = 1_209_600_000

const Notifications: FunctionalComponent<IProps> = ({ posts, projects }) => {
  const twoWeeksAgoDate = new Date(new Date().getTime() - TWO_WEEKS_MS)
  const latestProjects = projects.filter((p) =>
    p.publish_date && new Date(p.publish_date) >= twoWeeksAgoDate
  )
  const latestPosts = posts.filter((p) => p.date >= twoWeeksAgoDate)
  if (!latestPosts.length && !latestProjects.length) return null

  return <NotificactionModal posts={latestPosts} projects={latestProjects} />
}

export default Notifications
