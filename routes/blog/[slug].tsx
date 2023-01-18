import { Handlers, PageProps } from '$fresh/server.ts';
import { CSS } from 'deno-gfm';
import BaseBody from '../../components/BaseBody.tsx';
import BaseHead from '../../components/BaseHead.tsx';
import Container from '../../components/Container.tsx';
import { loadPost } from '../../utils/post.ts';

export const handler: Handlers = {
  async GET(request, context): Promise<Response> {
    const { slug } = context.params;
    const post = await loadPost(slug);
    console.log(post);
    if (!post) return context.renderNotFound();

    return context.render({ post });
  },
};

export default function PagePost(props: PageProps) {
  const { post } = props.data;
  return (
    <>
      <BaseHead>
        <title>Juanse | 404</title>
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
              href='/markdown-theme.css'
            />
            <div
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
