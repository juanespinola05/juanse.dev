import { FunctionalComponent } from 'preact';
import { tw } from 'twind';
import { css } from 'twind/css';

const Page: FunctionalComponent = ({ children }) => {
  const cssRules = tw(css({
    gridTemplateRows: '125px auto 140px',
  }));
  return (
    <div
      class={`min-h-screen ${cssRules} text-white font-oswald grid`}
    >
      {children}
    </div>
  );
};

export default Page;
