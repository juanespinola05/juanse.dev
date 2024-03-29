import { Handlers, PageProps } from '$fresh/server.ts'
import { css } from 'twind/css'
import { tw } from 'twind'
import Head from '../../layouts/Head.tsx'
import Document from '../../layouts/Document.tsx'
import Container from '../../layouts/Container.tsx'
import { Post } from '../../types/posts.d.ts'
import { loadFile } from '../../utils/markdown.ts'
import PostNavigation from '../../islands/PostNavigations.tsx'
import TagList from '../../components/TagList.tsx'
// TODO: make this dinamic?
import 'prismjs/components/prism-bash?no-check'
import 'prismjs/components/prism-yaml?no-check'
import ScrollToTop from '../../islands/ScrollToTop.tsx'
import BaseOG from '../../components/BaseOG.tsx'
import ShareModal from '../../islands/ShareModal.tsx'

export const handler: Handlers = {
  async GET(request, context): Promise<Response> {
    const { slug } = context.params
    const post = await loadFile<Post>(slug, 'posts')

    if (!post) return context.renderNotFound()
    return context.render({ post })
  },
}

export default function PagePost(props: PageProps<{ post: Post }>) {
  const { post } = props.data
  const date = Intl.DateTimeFormat('es').format(new Date(post.date))
  const gridCss = tw(css({
    '@media (min-width: 640px)': {
      'grid-template-columns': '100px auto',
    },
  }))
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link
          rel='stylesheet'
          type='text/css'
          href='/md.css'
        />
        <meta name='title' content={post.title} />
        <meta
          name='description'
          content={post.excerpt}
        />
        <link rel='canonical' href={`https://juanse.dev/blog/${post.id}`} />

        <BaseOG
          ogURL={`https://juanse.dev/blog/${post.id}`}
          title={post.title}
          description={post.excerpt}
          image={post.ogUrl}
          type={'article'}
        />
      </Head>
      <Document pathname='/blog'>
        <Container>
          <ShareModal
            text={post.title}
            url={`https://juanse.dev/blog/${post.id}`}
          />
          <ScrollToTop />
          <article class='max-w-3xl mx-auto override:list-none relative'>
            <PostNavigation />
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
            <div className='my-12'>
              <TagList tags={post.tags} />
            </div>
          </article>
        </Container>
      </Document>
    </>
  )
}
