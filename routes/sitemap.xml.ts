import { Handlers } from '$fresh/server.ts';
import manifest from '../fresh.gen.ts';
import { SitemapContext } from 'fresh_seo/mod.ts';
import { loadPosts } from '../utils/post.ts';

export const handler: Handlers = {
  async GET(): Promise<Response> {
    const sitemap = new SitemapContext('https://juanse.dev', manifest);
    const posts = await loadPosts();
    posts.forEach(({ id }) => sitemap.add(`/blog/${id}`));

    const totalPages = (posts.length - (posts.length % 6)) / 6;

    for (let i = 1; i <= totalPages; i++) {
      sitemap.add(`/blog/page/${i}`);
    }
    sitemap.remove('/api/blog/latest');
    return sitemap.render();
  },
};
