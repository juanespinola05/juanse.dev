import { Handlers } from '$fresh/server.ts';
import { loadPosts } from '../../utils/post.ts';

export const handler: Handlers = {
  async GET(): Promise<Response> {
    const posts = await loadPosts();
    posts.sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const latest = posts.slice(0, 3);
    const response = new Response(JSON.stringify({ posts: latest }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  },
};
