import { FunctionalComponent } from 'preact';

const Container: FunctionalComponent = ({ children }) => {
  return (
    <div class='px-[15px] mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px]'>
      {children}
    </div>
  );
};

export default Container;
