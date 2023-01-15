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
  const hoverCss = tw(css({
    '&:hover img': {
      transform: 'scale(1.1)',
    },
  }));
  return (
    <a
      href={`/blog/${id}`}
      class={`grid gap(y-2 x-2 sm:y-2 md:x-10 md:y-2) place-content-start grid-cols(1 sm:2 md:1 md:first-child:2) col-span(1 md:first-child:3) ${hoverCss}`}
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
