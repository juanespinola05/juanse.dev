import { Handlers, PageProps } from '$fresh/server.ts';
import { css } from 'twind/css';
import { tw } from 'twind';
import BaseBody from '../../components/BaseBody.tsx';
import BaseHead from '../../components/BaseHead.tsx';
import Container from '../../components/Container.tsx';
import { Post } from '../../types/posts.d.ts';
import { loadPost } from '../../utils/post.ts';
import PostNavigation from '../../islands/PostNavigations.tsx';
// TODO: make this dinamic?
import 'prismjs/components/prism-bash?no-check';
import 'prismjs/components/prism-yaml?no-check';

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
  const date = Intl.DateTimeFormat('es').format(new Date(post.date));
  const gridCss = tw(css({
    '@media (min-width: 640px)': {
      'grid-template-columns': '100px auto',
    },
  }));
  return (
    <>
      <BaseHead>
        <title>{post.title}</title>
        <link
          rel='stylesheet'
          type='text/css'
          href='/md.css'
        />
      </BaseHead>
      <BaseBody pathname='/blog'>
        <Container>
          <article class='max-w-3xl mx-auto override:list-none'>
            <div className='absolute right-[20px] top-52 hidden xl:block'>
              <PostNavigation />
            </div>
            <header
              class={`grid grid-cols-1 ${gridCss} grid-rows(2 sm:1) gap(5 sm:3) my-12`}
            >
              <div class='w(32 sm:24) h(32 sm:24) place-self-center'>
                <img
                  src={post.iconUrl}
                  alt={post.title}
                />
              </div>
              <div>
                <h1 class='text-3xl font-bold font-default'>{post.title}</h1>
                <p class='mt-2 text-sm text-yellow-300'>
                  {date} &bull; {post.readingTime}
                </p>
              </div>
            </header>
            <div
              data-color-mode='dark'
              data-dark-theme='dark'
              dangerouslySetInnerHTML={{ __html: post.body }}
              class='markdown-body'
            >
            </div>
          </article>
        </Container>
      </BaseBody>
    </>
  );
}
