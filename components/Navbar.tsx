import { FunctionalComponent } from 'preact';

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

const Navbar: FunctionalComponent = () => {
  return (
    <nav class='border(b-2 [rgba(255,255,255,0.5)]) py-2'>
      <ul class='flex gap-4'>
        {routes.map(({ name, path }) => (
          <li key={path}>
            <a href={path} class='text-xl'>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
