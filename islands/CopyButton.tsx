import { FunctionalComponent, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { handleCopy } from '../utils/clipboard.ts';

interface CopyButtonProps {
  text?: string;
}

const CopyButton: FunctionalComponent<CopyButtonProps> = (
  { text = '' },
) => {
  const [copied, setCopied] = useState(false);

  const handleClick: JSX.MouseEventHandler<HTMLButtonElement> = () => {
    handleCopy(text).then(() => setCopied(true));
    document.querySelector<HTMLInputElement>('input[readonly]')?.select();
  };

  return (
    <button onClick={handleClick} class='focus:outline-none'>
      {!copied ? 'Copiar' : '✅'}
    </button>
  );
};

export default CopyButton;
