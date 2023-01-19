import { Handlers, PageProps } from '$fresh/server.ts';
import { CSS } from 'deno-gfm';
import BaseBody from '../../components/BaseBody.tsx';
import BaseHead from '../../components/BaseHead.tsx';
import Container from '../../components/Container.tsx';
import { Post } from '../../types/posts.d.ts';
import { loadPost } from '../../utils/post.ts';

export const handler: Handlers = {
  async GET(request, context): Promise<Response> {
    const { slug } = context.params;
    const post = await loadPost(slug);

    if (!post) return context.renderNotFound();
    return context.render({ post });
  },
};

export default function PagePost(props: PageProps<{ post: Post }>) {
  const { post } = props.data;
  return (
    <>
      <BaseHead>
        <title>{post.title}</title>
      </BaseHead>
      <BaseBody>
        <Container>
          <article>
            <time>
              {Intl.DateTimeFormat('es').format(new Date(post.date))}
            </time>
            {/* <style dangerouslySetInnerHTML={{ __html: CSS }}></style> */}
            <link
              rel='stylesheet'
              type='text/css'
              href='/markdown2.css'
            />
            <div
              data-color-mode='dark'
              data-dark-theme='dark'
              dangerouslySetInnerHTML={{ __html: post.body }}
              class='markdown-body'
            >
              {post.body}
            </div>
          </article>
        </Container>
      </BaseBody>
    </>
  );
}
