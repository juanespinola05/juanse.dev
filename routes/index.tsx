import { Handlers, PageProps } from '$fresh/server.ts'
import Document from '../layouts/Document.tsx'
import Head from '../layouts/Head.tsx'
import BaseOG from '../components/BaseOG.tsx'
import Container from '../layouts/Container.tsx'
import PostComponent from '../components/Post.tsx'
import PostsGrid from '../layouts/PostsGrid.tsx'
import VideosGrid from '../layouts/VideosGrid.tsx'
import { getLatestVideos } from '../services/youtubev3.ts'
import { Post } from '../types/posts.d.ts'
import { VideoDetails } from '../types/videos.d.ts'
import { loadFiles } from '../utils/markdown.ts'
import ProjectCard from '../components/Project.tsx'
import { Project } from '../types/projects.d.ts'
import Notifications from '../components/Notifications.tsx'

export const handler: Handlers = {
  async GET(__, context) {
    const videos = await getLatestVideos(10)
    const posts = await loadFiles<Post>('posts')
    const projects = await loadFiles<Project>('projects')
    posts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const featuredProjects = projects.filter((p) => p.featured)
    return context.render({
      posts,
      videos,
      projects,
      featuredProjects,
    })
  },
}

interface HomeProps {
  posts: Post[]
  videos: VideoDetails[]
  projects: Project[]
  featuredProjects: Project[]
}

export default function Home(props: PageProps<HomeProps>) {
  const { data } = props
  const { posts, videos, projects, featuredProjects } = data

  return (
    <>
      <Head>
        <title>Juanse | Programación y Desarrollo Web</title>
        <meta name='title' content='Juanse | Programación y Desarrollo Web' />
        <meta
          name='description'
          content='Juan Sebas. Desarrollador web. Contenido, artículos y videos sobre desarrollo web en español, desde Argentina 🇦🇷 ❤️'
        />
        <link rel='canonical' href='https://juanse.dev' />
        <BaseOG />
      </Head>
      <Document pathname='/'>
        <Notifications projects={projects} posts={posts} />
        <Container>
          <div class='my-4'>
            <h2 class='text-4xl text-uppercase font-oswald mb-4'>
              Últimos artículos
            </h2>
            <PostsGrid>
              {posts.filter((_, i) => i < 3).map((post) => (
                <PostComponent {...post} />
              ))}
            </PostsGrid>
          </div>
          <hr class='border-b-2 border-gray-600 mt-12' />
          <div className='my-4'>
            <h2 class='text-4xl text-uppercase font-oswald mb-4'>
              Proyectos destacados
            </h2>
            <PostsGrid>
              {featuredProjects.slice(0, 3).map((data) => (
                <ProjectCard className='min-h-[300px]' {...data} />
              ))}
            </PostsGrid>
            <div className='flex justify-end mt-5'>
              <a href='/sobre-mi' class='text-right text-blue-500'>
                Ver más
              </a>
            </div>
          </div>
          <hr class='border-b-2 border-gray-600 mt-12' />
          <div className='my-4'>
            <h2 class='text-4xl text-uppercase font-oswald mb-4'>
              Últimos videos
            </h2>
            <div className='my-4'>
              <VideosGrid videos={videos} displayNumber={4} />
            </div>
          </div>
        </Container>
      </Document>
    </>
  )
}
