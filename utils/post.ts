import { extract } from 'https://deno.land/std@0.170.0/encoding/front_matter/any.ts';
import { Post, PostFrontMatter } from '../types/posts.d.ts';
import { render } from 'deno-gfm';

const POSTS_PER_PAGE = 6;

export const loadPost = async (id: Post['id']): Promise<Post | null> => {
  let raw: string;
  try {
    raw = await Deno.readTextFile(`./content/posts/${id}.md`);
  } catch {
    return null;
  }

  const { attrs, body } = extract<PostFrontMatter>(raw);
  return {
    ...attrs,
    body: render(body),
    id,
  };
};

export const loadPosts = async (): Promise<Post[]> => {
  const promises = [];
  for await (const entry of Deno.readDir('./content/posts')) {
    const { name } = entry;
    const [id] = name.split('.');
    const post = await loadPost(id);
    if (post) promises.push(post);
  }

  const posts = await Promise.all(promises);

  return posts;
};

export interface PostsPagination {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

export const loadPostsByPage = async (
  requestUrl: string,
): Promise<PostsPagination> => {
  const url = new URL(requestUrl);
  const page = url.pathname.split('/').at(-1) || 1;
  const posts = await loadPosts();

  // calculate amount of pages from posts.length
  const totalPages = (posts.length - (posts.length % POSTS_PER_PAGE)) /
    POSTS_PER_PAGE;

  return {
    currentPage: +page,
    posts: [...posts].splice(
      +page * POSTS_PER_PAGE - POSTS_PER_PAGE,
      POSTS_PER_PAGE,
    ),
    totalPages,
  };
};
