import { FunctionalComponent } from 'preact';
import { tw } from 'twind';
import { css } from 'twind/css';

const PostsGrid: FunctionalComponent = ({ children }) => {
  // Modify first post title size
  const cssGrid = tw(
    css({
      '& a:first-child h2': {
        '@apply': 'md:text-[32px]',
      },
    }),
  );
  return (
    <div class={`grid grid-cols(1 md:3) gap-10 ${cssGrid}`}>
      {children}
    </div>
  );
};

export default PostsGrid;
