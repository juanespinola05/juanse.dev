import { FunctionalComponent } from 'preact'
import { PathnameProps } from '../types.d.ts'
import Container from './Container.tsx'
import { Logo } from './Logo.tsx'
import Navbar from './Navbar.tsx'

const Header: FunctionalComponent<PathnameProps> = ({ pathname }) => {
  return (
    <header>
      <Container>
        <div class='grid place-content-center'>
          <Logo class='w-32 h-[76px]' />
        </div>
        <Navbar pathname={pathname} />
      </Container>
    </header>
  )
}

export default Header
