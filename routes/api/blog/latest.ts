import { Handlers } from '$fresh/server.ts'
import { Post } from '../../../types/posts.d.ts'
import { loadFiles } from '../../../utils/markdown.ts'

export const handler: Handlers = {
  async GET(req): Promise<Response> {
    const posts = await loadFiles<Post>('posts')
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
