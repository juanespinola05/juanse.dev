import { FunctionalComponent } from 'preact'
import Title from './Title.tsx'
import IconClock from 'tabler-icon/clock.tsx'
import Text from './Text.tsx'
import { css } from 'twind/css'
import { tw } from 'twind'
import { Post } from '../types/posts.d.ts'
import DateText from './DateText.tsx'
import TagList from './TagList.tsx'

interface PostComponentProps extends Omit<Post, 'body'> {}

const HomePost: FunctionalComponent<PostComponentProps> = ({
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
  `
  const aspectRatio = tw(css({ 'aspect-ratio': '16/9' }))
  return (
    <a
      href={`/blog/${id}`}
      class={postStyles}
    >
      <div
        class={`w-full rounded-md bg-darkBlue ${aspectRatio}`}
      >
        <img
          src={imageUrl}
          alt={title}
          loading='lazy'
          className={`${aspectRatio} w-full h-full bg-cover bg-center rounded-md shadow-xl transition-transform`}
        />
      </div>
      <div class='flex flex-col justify-around gap-2 max-w-[415px]'>
        <Title size='lg'>
          {title}
        </Title>
        <TagList tags={tags} />
        <div data-type='excerpt'>
          <Text className='font-default'>
            {excerpt}
          </Text>
        </div>
        <div className='flex justify-between'>
          <div class='flex items-center gap-1'>
            <IconClock size={20} />
            <Text size='xs'>{readingTime}</Text>
          </div>
          <DateText date={date} className='font-bold' />
        </div>
      </div>
    </a>
  )
}

export default HomePost
