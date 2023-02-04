import { FunctionalComponent } from 'preact'
import Container from './Container.tsx'
import Navbar from './Navbar.tsx'
import Text from './Text.tsx'

const Footer: FunctionalComponent = () => {
  return (
    <footer class='bg-pink py-6'>
      <Container>
        <Navbar />
        <div className='mt-4 flex flex-wrap justify-between items-baseline'>
          <Text size='lg' className='font-bold'>Juan Sebastian Espínola</Text>
          <Text size='base'>DESARROLLO WEB</Text>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
