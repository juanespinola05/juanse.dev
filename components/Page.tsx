import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index';

const Page: FunctionalComponent = ({ children }) => {
  return (
    <div class='min-h-screen bg-gradient-to-r from-black to-darkBlue text-white font-oswald'>
      {children}
    </div>
  );
};

export default Page;
