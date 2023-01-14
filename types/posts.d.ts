export interface Post {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  date: Date;
  readingTime: string;
  tags: string[];
  imageUrl: string[];
}

export interface PostFrontMatter extends Omit<Post, 'body' | 'id'> {}
