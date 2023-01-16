import { tw } from 'twind';
import { css } from 'twind/css';
import { FunctionalComponent } from 'preact';
import { PathnameProps } from '../types.d.ts';

const routes = [
  {
    name: 'Inicio',
    path: '/',
  },
  {
    name: 'Blog',
    path: '/blog',
  },
  {
    name: 'Videos',
    path: '/videos',
  },
  {
    name: 'Sobre mi',
    path: '/sobre-mi',
  },
  {
    name: 'Contacto',
    path: '/contacto',
  },
];

const Navbar: FunctionalComponent<PathnameProps> = ({ pathname }) => {
  const active = tw(css({
    '&::after': {
      '@apply': 'absolute w-full h-1 bg-pink top-9 left-0',
      content: '""',
    },
  }));
  return (
    <nav class='border(b-2 [rgba(255,255,255,0.5)]) py-2'>
      <ul class='flex gap-4'>
        {routes.map(({ name, path }) => (
          <li key={path}>
            <a
              href={path}
              class={`${
                pathname === path ? active : ''
              } relative text-xl hover:text-gray-300`}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
