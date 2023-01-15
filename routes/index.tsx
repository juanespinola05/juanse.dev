import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';
import Container from '../components/Container.tsx';
import Header from '../components/Header.tsx';
import Page from '../components/Page.tsx';
import PostComponent from '../components/Post.tsx';
import PostsGrid from '../components/PostsGrid.tsx';
import Title from '../components/Title.tsx';
import { Post } from '../types/posts.d.ts';
import { loadPosts } from '../utils/post.ts';

export const handler: Handlers = {
  async GET(request, context) {
    console.log('asd');

    const posts = await loadPosts();
    return context.render({ posts });
  },
};

export default function Home(props: PageProps<{ posts: Post[] }>) {
  const { data } = props;
  const { posts } = data;
  console.log(posts);

  return (
    <>
      <Head>
        <title>juanse</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Page>
        <Header />
        <div class='mt-12'>
          <Container>
            <div class='my-12'>
              <Title size='5xl'>LATEST</Title>
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
          </Container>
        </div>
      </Page>
    </>
  );
}
