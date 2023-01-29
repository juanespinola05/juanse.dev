import { Handlers } from '$fresh/server.ts';
import manifest from './fresh.gen.ts';
import { SitemapContext } from 'fresh_seo/mod.ts';
import { loadPosts } from './utils/post.ts';

export const handler: Handlers = {
  async GET(): Promise<Response> {
    const sitemap = new SitemapContext('https://juanse.dev', manifest);
    const posts = await loadPosts();
    posts.forEach(({ id }) => sitemap.add(`/blog/${id}`));

    sitemap.remove('/api/blog/latest');
    return sitemap.render();
  },
};