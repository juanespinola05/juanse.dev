import { Handlers, PageProps } from '$fresh/server.ts'
import BaseBody from '../../components/BaseBody.tsx'
import BaseHead from '../../components/BaseHead.tsx'
import BaseOG from '../../components/BaseOG.tsx'
import Container from '../../components/Container.tsx'
import PageKeypad from '../../components/PageKeypad.tsx'
import PostComponent from '../../components/Post.tsx'
import { loadPostsByPage, PostsPagination } from '../../utils/post.ts'

export const handler: Handlers = {
  async GET(request, context) {
    const { posts, totalPages, currentPage } = await loadPostsByPage(
      request.url,
    )

    if (!posts.length) return context.renderNotFound()
    return context.render({ posts, currentPage, totalPages })
  },
}

export default function BlogPage(props: PageProps<PostsPagination>) {
  const { data } = props
  const { posts, totalPages, currentPage } = data

  return (
    <>
      <BaseHead>
        <title>Juanse | Blog</title>
        <meta name='title' content='Juanse | Blog' />
        <meta
          name='description'
          content='Artículos y tutoriales sobre desarrollo web en español, desde Argentina 🇦🇷 ❤️'
        />
        <link rel='canonical' href='https://juanse.dev/blog' />
        <BaseOG
          ogURL={`https://juanse.dev/blog`}
          title='Juanse | Blog'
        />
      </BaseHead>
      <BaseBody pathname='/blog'>
        <Container>
          <div class='my-12 grid grid-cols(1 md:2 lg:3) gap-6'>
            {posts.map((post) => <PostComponent {...post} />)}
          </div>
          <PageKeypad totalPages={totalPages} currentPage={currentPage} />
        </Container>
      </BaseBody>
    </>
  )
}
