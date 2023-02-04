import { FunctionalComponent } from 'preact'
import { tw } from 'twind'
import { css } from 'twind/css'

const gridVariants = {
  default: 1,
  reverse: -1,
}

interface PostGridProps {
  variant?: keyof typeof gridVariants
}

const PostsGrid: FunctionalComponent<PostGridProps> = (
  { children, variant = 'default' },
) => {
  const cssGrid = tw(
    css({
      '& a:first-child h2, & a:last-child h2': {
        '@apply': 'md:text-[25px]',
      },
      '& a:first-child h2': {
        '@apply': 'lg:text-[32px]',
      },
      '& a:last-child h2': {
        '@apply': 'lg:text-lg',
      },
      '& a:first-child [data-type="excerpt"] p, &a:last-child [data-type="excerpt"] p':
        {
          '@apply': 'lg:text-base',
        },
      '& a:first-child div:nth-child(2)': {
        '@apply': `md:order-[${gridVariants[variant]}]`,
      },
    }),
  )
  return (
    <div class={`grid grid-cols(1 md:2 lg:3) gap(4 md:x-10 md:y-8) ${cssGrid}`}>
      {children}
    </div>
  )
}

export default PostsGrid
