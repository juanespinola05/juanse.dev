import { Handlers } from '$fresh/server.ts'
import manifest from '../fresh.gen.ts'
import { SitemapContext } from 'fresh_seo/mod.ts'
import { loadFiles } from '../utils/markdown.ts'
import { Post } from '../types/posts.d.ts'

export const handler: Handlers = {
  async GET(): Promise<Response> {
    const sitemap = new SitemapContext('https://juanse.dev', manifest)
    const posts = await loadFiles<Post>('posts')
    posts.forEach(({ id }) => sitemap.add(`/blog/${id}`))

    sitemap.remove('/blog/first-post')
    sitemap.remove('/blog/second-post')
    sitemap.remove('/blog/third-post')
    sitemap.remove('/blog/fourth-post')
    sitemap.remove('/api/blog/latest')
    return sitemap.render()
  },
}
