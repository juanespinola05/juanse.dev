import { FunctionalComponent } from 'preact'
import { PathnameProps } from '../types.d.ts'
import Footer from '../components/Footer.tsx'
import Header from '../components/Header.tsx'
import { tw } from 'twind'
import { css } from 'twind/css'

const Document: FunctionalComponent<PathnameProps> = (
  { children, pathname },
) => {
  const gridLayout = tw(css({
    gridTemplateRows: '125px auto 140px',
  }))
  return (
    <div class={`min-h-screen ${gridLayout} text-white font-oswald grid`}>
      <Header pathname={pathname} />
      {children}
      <Footer />
    </div>
  )
}

export default Document
