import { extract } from 'https://deno.land/std@0.170.0/encoding/front_matter/any.ts'
import { Post } from '../types/posts.d.ts'
import { render } from 'deno-gfm'

const POSTS_PER_PAGE = 6

export async function loadFile<T>(
  id: string,
  content: string,
): Promise<T | null> {
  let raw: string
  try {
    raw = await Deno.readTextFile(`./content/${content}/${id}.md`)
  } catch {
    return null
  }
  const { attrs, body } = extract<T>(raw)
  return {
    ...attrs,
    body: render(body),
    id,
  }
}

export async function loadFiles<T>(
  content: string,
): Promise<T[]> {
  const promises = []
  for await (const entry of Deno.readDir(`./content/${content}`)) {
    const { name } = entry
    const [id] = name.split('.')
    const fileData = await loadFile<T>(id, content)
    if (fileData) promises.push(fileData)
  }

  const files = await Promise.all(promises)

  return files
}

export interface PostsPagination {
  posts: Post[]
  totalPages: number
  currentPage: number
}

export const loadPostsByPage = async (
  requestUrl: string,
): Promise<PostsPagination> => {
  const url = new URL(requestUrl)
  const page = url.searchParams.get('page') || 1
  const posts = await loadFiles<Post>('posts')
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // calculate amount of pages from posts.length
  const foo = posts.length / POSTS_PER_PAGE
  const totalPages = foo % 1 === 0 ? foo : Math.ceil(foo)

  return {
    currentPage: +page,
    posts: [...posts].splice(
      +page * POSTS_PER_PAGE - POSTS_PER_PAGE,
      POSTS_PER_PAGE,
    ),
    totalPages,
  }
}
