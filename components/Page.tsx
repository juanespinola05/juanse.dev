import { FunctionalComponent } from 'preact';

const Page: FunctionalComponent = ({ children }) => {
  return (
    <div class='min-h-screen bg-gradient-to-r from-black to-darkBlue text-white font-oswald'>
      {children}
    </div>
  );
};

export default Page;
