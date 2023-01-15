import { FunctionalComponent } from 'preact';
import Container from './Container.tsx';
import Navbar from './Navbar.tsx';
import Text from './Text.tsx';

const Footer: FunctionalComponent = () => {
  return (
    <footer class='bg-pink py-6 mt-12'>
      <Container>
        <Navbar />
        <div className='mt-4'>
          <Text size='lg' className='font-bold'>Juan Sebastian Espínola</Text>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
