import { Handlers, PageProps } from '$fresh/server.ts'
import Document from '../layouts/Document.tsx'
import Head from '../layouts/Head.tsx'
import BaseOG from '../components/BaseOG.tsx'
import Container from '../layouts/Container.tsx'
import PostComponent from '../components/HomePost.tsx'
import PostsGrid from '../layouts/PostsGrid.tsx'
import Title from '../components/Title.tsx'
import VideosGrid from '../layouts/VideosGrid.tsx'
import { getLatestVideos } from '../services/youtubev3.ts'
import { Post } from '../types/posts.d.ts'
import { VideoDetails } from '../types/videos.d.ts'
import { loadFiles } from '../utils/markdown.ts'

export const handler: Handlers = {
  async GET(__, context) {
    const videos = await getLatestVideos(10)
    const posts = await loadFiles<Post>('posts')
    posts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    return context.render({ posts, videos })
  },
}

interface HomeProps {
  posts: Post[]
  videos: VideoDetails[]
}

export default function Home(props: PageProps<HomeProps>) {
  const { data } = props
  const { posts, videos } = data

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
        <Container>
          <div class='my-12'>
            <PostsGrid>
              {posts.filter((_, i) => i < 4).map((post) => (
                <PostComponent {...post} />
              ))}
            </PostsGrid>
          </div>
          <hr class='border-b-2 border-gray-600 mt-12' />
          <div className='my-12'>
            <Title size='5xl'>VIDEOS</Title>
            <div className='mt-12'></div>
            <VideosGrid videos={videos} displayNumber={4} />
          </div>
        </Container>
      </Document>
    </>
  )
}
