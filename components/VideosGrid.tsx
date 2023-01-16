import { FunctionalComponent } from 'preact';

const VideosGrid: FunctionalComponent = ({ children }) => {
  return (
    <div className='grid grid-cols(1 md:2) gap-5 justify-items-center'>
      {children}
    </div>
  );
};

export default VideosGrid;
