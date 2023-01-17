import { FunctionalComponent } from 'preact';
import { tw } from 'twind';
import { css } from 'twind/css';

const Page: FunctionalComponent = ({ children }) => {
  const cssRules = tw(css({
    'grid-template-rows': '125px auto 140px',
    background: 'linear-gradient(45deg, #E7227E, #01011d, #010137)',
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite',
    '@keyframes gradient': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
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
