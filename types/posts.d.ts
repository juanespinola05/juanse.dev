export interface Post {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  date: Date;
  readingTime: string;
  tags: TagType[];
  imageUrl: string;
}

export type TagType =
  | 'javascript'
  | 'typescript'
  | 'CSS'
  | 'deno'
  | 'nodejs'
  | 'reactjs'
  | 'vite'
  | 'github';

export interface PostFrontMatter extends Omit<Post, 'body' | 'id'> {}
