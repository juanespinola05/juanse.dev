import { Head } from '$fresh/runtime.ts';
import Container from '../components/Container.tsx';
import Header from '../components/Header.tsx';
import Page from '../components/Page.tsx';
import Post from '../components/Post.tsx';
import PostsGrid from '../components/PostsGrid.tsx';
import Title from '../components/Title.tsx';
export default function Home() {
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
            <Title size='5xl'>LATEST</Title>
            <br />
            <br />
            <PostsGrid>
              <Post></Post>
              <Post></Post>
              <Post></Post>
              <Post></Post>
            </PostsGrid>
          </Container>
        </div>
      </Page>
    </>
  );
}
