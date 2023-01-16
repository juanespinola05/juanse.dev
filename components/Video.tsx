import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index';
import { css } from 'twind/css';
import { tw } from 'twind';
import { VideoDetails } from '../types/videos.d.ts';
import DateText from './DateText.tsx';
import Image from '../islands/Image.tsx';

const Video: FunctionalComponent<VideoDetails> = (
  { thumbnail, title, date, id },
) => {
  const videoUrl = 'https://youtube.com/watch?v=' + id;
  const aspectRatio = tw(css({ 'aspect-ratio': '16/9' }));
  return (
    <a
      href={videoUrl}
      title={title}
      target='_blank'
      rel='noopener noreferrer'
      class={`${
        tw(css({
          '&:hover span': {
            top: '0',
          },
        }))
      } w-full max-w-[480px] relative rounded-2xl bg-[rgba(255,255,255,0.1)] overflow-hidden transition-transform hover:scale-105`}
    >
      <span class='transition-all absolute py-1 px-2 rounded-bl-2xl bg-pink text-white right-0 top-[-60px]'>
        <DateText date={date} />
      </span>
      <div>
        <Image
          className={`${aspectRatio} w-full max-w-[480px] object-cover object-center`}
          src={thumbnail}
          alt={title}
        />
      </div>
      <div class='p-2'>
        <h3>{title}</h3>
      </div>
    </a>
  );
};

export default Video;
