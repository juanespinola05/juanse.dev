import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index';
import { tw } from 'twind';
import { css } from 'twind/css';

const PostsGrid: FunctionalComponent = ({ children }) => {
  // Modify first post title size
  const cssGrid = tw(
    css({
      '& article:first-child h2': {
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
