import { FunctionalComponent } from 'preact';
import { tw } from 'twind';
import { css } from 'twind/css';

const Page: FunctionalComponent = ({ children }) => {
  const backgroundCSS = tw(css({
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
    <div class={`min-h-screen ${backgroundCSS} text-white font-oswald`}>
      {children}
    </div>
  );
};

export default Page;
