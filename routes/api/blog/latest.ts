import { Handlers } from '$fresh/server.ts'
import { loadPosts } from '../../../utils/post.ts'

export const handler: Handlers = {
  async GET(req): Promise<Response> {
    const posts = await loadPosts()
    const reqURL = new URL(req.url)
    const { searchParams } = reqURL

    const details = Boolean(searchParams.get('details')) ?? false

    posts.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const latest = posts
      .slice(0, 3)
      .map((entry) => ({
        ...entry,
        body: details ? entry.body : null,
      }))
    const response = new Response(JSON.stringify({ posts: latest }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response
  },
}
