import { FunctionalComponent } from 'preact';

const routes = [
  {
    name: 'Home',
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
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];

const Navbar: FunctionalComponent = () => {
  return (
    <nav class='border(b-2 [rgba(255,255,255,0.5)]) py-2'>
      <ul class='flex gap-4'>
        {routes.map(({ name, path }) => (
          <li key={path}>
            <a href={path}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
