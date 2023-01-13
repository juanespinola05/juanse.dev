import { FunctionalComponent } from 'preact';
import Container from './Container.tsx';
import { Logo } from './Logo.tsx';
import Navbar from './Navbar.tsx';

const Header: FunctionalComponent = () => {
  return (
    <header>
      <Container>
        <div class='grid place-content-center'>
          <Logo class='w-32' />
        </div>
        <Navbar></Navbar>
      </Container>
    </header>
  );
};

export default Header;
