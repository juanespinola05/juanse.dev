import { extract } from 'https://deno.land/std@0.170.0/encoding/front_matter/any.ts';
import { Post, PostFrontMatter } from '../types/posts.d.ts';
import { render } from 'deno-gfm';

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

console.log(await loadPosts());
