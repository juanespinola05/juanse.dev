import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index';

const textSizes = {
  'xs': 'xs',
  'sm': 'sm',
  'base': 'base',
  'lg': 'lg',
};

interface TextComponentProps {
  size?: keyof typeof textSizes;
  className?: string | undefined;
}

const Text: FunctionalComponent<TextComponentProps> = (
  { children, size = 'sm', className },
) => {
  const selectedSize = 'text-' + textSizes[size];
  const textClass = `${selectedSize} ${className}`;
  return (
    <p class={textClass}>
      {children}
    </p>
  );
};

export default Text;
