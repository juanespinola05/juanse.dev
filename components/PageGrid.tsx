import { FunctionalComponent } from 'preact';

const PageGrid: FunctionalComponent = ({ children }) => {
  return (
    <div class='min-h-screen bg-gradient-to-r from-black to-darkBlue text-white'>
      <div class='px-[15px] mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px]'>
        {children}
      </div>
    </div>
  );
};

export default PageGrid;
