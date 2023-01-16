import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index';

const VideosGrid: FunctionalComponent = ({ children }) => {
  return (
    <div className='grid grid-cols(1 md:2) gap-5 justify-items-center'>
      {children}
    </div>
  );
};

export default VideosGrid;
