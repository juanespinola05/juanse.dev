import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index';
import { css } from 'twind/css';
import { tw } from 'twind';
import { VideoDetails } from '../types/videos.d.ts';
import DateText from './DateText.tsx';

const Video: FunctionalComponent<VideoDetails> = (
  { thumbnail, title, date, id, tags },
) => {
  const videoUrl = 'https://youtube.com/watch?v=' + id;
  return (
    <a
      href={videoUrl}
      title={title}
      target='_blank'
      rel='noopener noreferrer'
      class={`${
        tw(css({
          '&:hover span': {
            bottom: '0',
          },
        }))
      } w-full h-28 relative shadow-md rounded-xl bg-[rgba(255,255,255,0.1)] overflow-hidden transition-transform hover:scale-105`}
    >
      <span class='transition-all absolute py-1 px-2 rounded-tl-2xl bg-pink text-white right-0 bottom-[-60px]'>
        <DateText date={date} />
      </span>
      <div class='flex gap-3'>
        <div>
          <img
            class='h-28 object-center'
            src={thumbnail}
            alt={`Minatura del video: ${title}`}
            loading='lazy'
          />
        </div>
        <div class='flex flex-col gap-3 justify-center'>
          <h4>{title}</h4>
          <ul class='flex gap-2'>
            {tags.map((tag) => (
              <li class='w-6 h-6'>
                <img src={`/${tag}.svg`} alt={tag} loading='lazy' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </a>
  );
};

export default Video;
