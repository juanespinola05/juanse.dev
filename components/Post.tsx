import { FunctionalComponent } from 'preact';
import Title from './Title.tsx';
import IconClock from 'tabler-icon/clock.tsx';
import Text from './Text.tsx';
import { css } from 'twind/css';
import { tw } from 'twind';
import { Post } from '../types/posts.d.ts';

interface PostComponentProps extends Omit<Post, 'body'> {}

const Post: FunctionalComponent<PostComponentProps> = ({
  date,
  excerpt,
  id,
  imageUrl,
  readingTime,
  tags,
  title,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('es', {
    dateStyle: 'long',
  });
  return (
    <a
      href={`/blog/${id}`}
      class='grid gap-4 place-content-start grid-cols(1 sm:2 md:1 md:first-child:2) col-span(1 md:first-child:3)'
    >
      <div
        class={`w-full rounded-xl bg-darkBlue ${
          tw(css({ 'aspect-ratio': '16/9' }))
        }`}
      >
        <img
          class='w-full h-full bg-cover bg-center rounded-xl'
          src={imageUrl}
          alt=''
        />
      </div>
      <div class='flex flex-col justify-around gap-2'>
        <Title size='lg'>
          {title}
        </Title>
        <Text size='xs' className='font-bold'>
          <time>{formattedDate}</time>
        </Text>
        <ul class='flex gap-2'>
          {tags.map((tag) => (
            <li key={tag}>
              <Text size='xs'>#{tag}</Text>
            </li>
          ))}
        </ul>
        <Text className='font-light'>
          {excerpt}
        </Text>
        <div class='flex items-center gap-1'>
          <IconClock size={20} />
          <Text size='xs'>{readingTime}</Text>
        </div>
      </div>
    </a>
  );
};

export default Post;
