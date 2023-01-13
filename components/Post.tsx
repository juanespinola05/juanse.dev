import { FunctionalComponent } from 'preact';
import Title from './Title.tsx';
import IconClock from 'tabler-icon/clock.tsx';
import Text from './Text.tsx';
import { css } from 'twind/css';
import { tw } from 'twind';

const randomNumber = () => {
  return Math.floor(Math.random() * 200);
};

const Post: FunctionalComponent = () => {
  return (
    <article class='grid gap-4 grid-cols(1 sm:2 md:1 md:first-child:2) col-span(1 md:first-child:3)'>
      <div
        class={`w-full rounded-xl bg-darkBlue ${
          tw(css({ 'aspect-ratio': '16/9' }))
        }`}
      >
        <img
          class='w-full h-full bg-cover bg-center rounded-xl'
          src={`https://unsplash.it/id/${randomNumber()}/500/300`}
          alt=''
        />
      </div>
      <div class='flex flex-col justify-between gap-2'>
        <Title size='lg'>
          How I created a chess subscription application.
        </Title>
        <Text size='xs' className='font-bold'>
          <time>12 July 2022</time>
        </Text>
        <ul class='flex gap-2'>
          <li>
            <Text size='xs'>#javascript</Text>
          </li>
          <li>
            <Text size='xs'>#javascript</Text>
          </li>
          <li>
            <Text size='xs'>#javascript</Text>
          </li>
        </ul>
        <Text className='font-light'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, quos
          aliquam aperiam dolores ratione numquam nemo unde non. Pariatur
          recusandae aliquam, omnis deserunt mollitia ipsum ullam iure.
          Dignissimos, minima explicabo!
        </Text>
        <div class='flex items-center gap-1'>
          <IconClock size={20} />
          <Text size='xs'>5-7 minutes read</Text>
        </div>
      </div>
    </article>
  );
};

export default Post;
