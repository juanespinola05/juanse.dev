import { FunctionalComponent } from 'preact';
import Title from './Title.tsx';
import IconClock from 'tabler-icon/clock.tsx';
import Text from './Text.tsx';
import { css } from 'twind/css';
import { tw } from 'twind';
import { Post } from '../types/posts.d.ts';
import DateText from './DateText.tsx';
import TagList from './TagList.tsx';

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
  const postStyles = tw`grid
    gap(y-2 x-2 sm:y-2 md:x-10 md:y-2)
    grid-cols(1 sm:2 md:1 md:first-child:2 md:last-child:2 lg:last-child:1)
    col-span(1 md:first-child:2 md:last-child:2 lg:first-child:3 lg:last-child:1)
    auto-rows-min
  `;
  return (
    <a
      href={`/blog/${id}`}
      class={postStyles}
    >
      <div
        class={`w-full rounded-xl bg-darkBlue ${
          tw(css({ 'aspect-ratio': '16/9' }))
        }`}
      >
        <img
          class='w-full h-full bg-cover bg-center rounded-xl shadow-xl transition-transform'
          src={imageUrl}
          alt=''
        />
      </div>
      <div class='flex flex-col justify-around gap-2 max-w-[415px]'>
        <Title size='lg'>
          {title}
        </Title>
        <DateText date={date} />
        <TagList tags={tags} />
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
