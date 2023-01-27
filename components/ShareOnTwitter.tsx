import IconTwitter from 'tabler-icon/brand-twitter.tsx';
import { FunctionalComponent } from 'preact';

interface ShareOnTwitterProps {
  url: string;
  text: string;
}

const ShareOnTwitter: FunctionalComponent<ShareOnTwitterProps> = (
  { url, text },
) => {
  const shareUrl = new URL(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
  );
  return (
    <a
      rel='noopener noreferrer'
      target='_blank'
      href={shareUrl.toString()}
      class='cursor-pointer bg-white text-[#1D9BF0] rounded-xl bottom(5 sm:10) right(3 sm:10) p-3 fixed flex gap-2 z-10'
      title='Compartir publicación en Twitter'
    >
      <IconTwitter />
    </a>
  );
};

export default ShareOnTwitter;
