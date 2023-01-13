import {
  FunctionalComponent,
  JSX,
} from 'https://esm.sh/v102/preact@10.11.0/src/index';

export const Logo: FunctionalComponent<JSX.HTMLAttributes<HTMLImageElement>> = (
  props,
) => {
  return (
    <img
      {...props}
      src='/logo.png'
      alt='Juanse Logo'
    />
  );
};
