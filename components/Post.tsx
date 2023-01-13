import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index';
import Title from './Title.tsx';
import IconClock from 'https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/clock.tsx';
import Text from './Text.tsx';

const randomNumber = () => {
  return Math.floor(Math.random() * 200);
};

const Post: FunctionalComponent = () => {
  return (
    <article class='grid grid-cols-1 gap-4 first-child:col-span-3 first-child:grid-cols-2'>
      <div class=''>
        <img
          class='w-full rounded-xl'
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
          <li>#javascript</li>
          <li>#vite</li>
          <li>#vercel</li>
        </ul>
        <Text className='font-light'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, quos
          aliquam aperiam dolores ratione numquam nemo unde non. Pariatur
          recusandae aliquam, omnis deserunt mollitia ipsum ullam iure.
          Dignissimos, minima explicabo!
        </Text>
        <div class='flex gap-1'>
          <IconClock />
          <p>5-7 minutes read</p>
        </div>
      </div>
    </article>
  );
};

export default Post;
