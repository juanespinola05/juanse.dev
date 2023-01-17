import { Handlers, PageProps } from '$fresh/server.ts';
import BaseBody from '../../../components/BaseBody.tsx';
import BaseHead from '../../../components/BaseHead.tsx';
import Container from '../../../components/Container.tsx';
import PostComponent from '../../../components/Post.tsx';
import PostsGrid from '../../../components/PostsGrid.tsx';
import Title from '../../../components/Title.tsx';
import { Post } from '../../../types/posts.d.ts';
import { loadPostsByPage, PostsPagination } from '../../../utils/post.ts';

export const handler: Handlers = {
  async GET(request, context) {
    const { posts, totalPages, currentPage } = await loadPostsByPage(
      request.url,
    );

    if (!posts.length) return context.renderNotFound();
    return context.render({ posts, currentPage, totalPages });
  },
};

export default function BlogPage(props: PageProps<PostsPagination>) {
  const { data } = props;
  const { posts, totalPages, currentPage } = data;

  return (
    <>
      <BaseHead>
        <title>Juanse | Blog</title>
      </BaseHead>
      <BaseBody pathname='/blog'>
        <div class='mt-12'>
          <Container>
            <div class='my-12'>
              <Title size='5xl'>BLOG</Title>
            </div>
            <PostsGrid>
              {posts.map((post) => <PostComponent {...post} />)}
            </PostsGrid>
            <div class='h-12 flex justify-center items-center gap-4'>
              <div id='previous'>
                {currentPage > 1 && (
                  <a href={`/blog/page/${currentPage - 1}`}>Anterior</a>
                )}
              </div>
              <div id='next'>
                {currentPage < totalPages && (
                  <a href={`/blog/page/${currentPage + 1}`}>Siguiente</a>
                )}
              </div>
            </div>
          </Container>
        </div>
      </BaseBody>
    </>
  );
}
