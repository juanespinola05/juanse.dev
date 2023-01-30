import { Handlers, PageProps } from '$fresh/server.ts';
import BaseBody from '../components/BaseBody.tsx';
import BaseHead from '../components/BaseHead.tsx';
import BaseOG from '../components/BaseOG.tsx';
import Container from '../components/Container.tsx';
import PostComponent from '../components/HomePost.tsx';
import PostsGrid from '../components/PostsGrid.tsx';
import Title from '../components/Title.tsx';
import Video from '../components/Video.tsx';
import VideosGrid from '../components/VideosGrid.tsx';
import { getLatestVideos } from '../services/youtubev3.ts';
import { Post } from '../types/posts.d.ts';
import { VideoDetails } from '../types/videos.d.ts';
import { loadPosts } from '../utils/post.ts';

export const handler: Handlers = {
  async GET(__, context) {
    const videos = await getLatestVideos(10);
    const posts = await loadPosts();
    posts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return context.render({ posts, videos });
  },
};

interface HomeProps {
  posts: Post[];
  videos: VideoDetails[];
}

export default function Home(props: PageProps<HomeProps>) {
  const { data } = props;
  const { posts, videos } = data;

  return (
    <>
      <BaseHead>
        <title>Juanse | Programación y Desarrollo Web</title>
        <meta name='title' content='Juanse | Programación y Desarrollo Web' />
        <meta
          name='description'
          content='Juan Sebas. Desarrollador web. Contenido, artículos y videos sobre desarrollo web en español, desde Argentina 🇦🇷 ❤️'
        />
        <link rel='canonical' href='https://juanse.dev' />
        <BaseOG />
      </BaseHead>
      <BaseBody pathname='/'>
        <Container>
          <div class='my-12'>
            <Title size='5xl'>BLOG</Title>
          </div>
          <PostsGrid>
            {posts.filter((_, i) => i < 4).map((post) => (
              <PostComponent {...post} />
            ))}
          </PostsGrid>
          <hr class='border-b-2 border-gray-600 mt-12' />
          <div class='my-12'>
            <Title size='5xl'>JAVASCRIPT</Title>
          </div>
          <PostsGrid variant='reverse'>
            {posts.filter((post, i) =>
              post.tags.includes('javascript') && i < 4
            ).map((post) => <PostComponent {...post} />)}
          </PostsGrid>
          <hr class='border-b-2 border-gray-600 mt-12' />
          <div className='my-12'>
            <Title size='5xl'>VIDEOS</Title>
            <div className='mt-12'></div>
            <VideosGrid>
              {videos.filter((_, i) => i < 4).map((video) => (
                <Video {...video} />
              ))}
            </VideosGrid>
          </div>
        </Container>
      </BaseBody>
    </>
  );
}
