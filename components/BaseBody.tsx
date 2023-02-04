import { FunctionalComponent } from 'preact'
import { PathnameProps } from '../types.d.ts'
import Footer from './Footer.tsx'
import Header from './Header.tsx'
import Page from './Page.tsx'

const BaseBody: FunctionalComponent<PathnameProps> = (
  { children, pathname },
) => {
  return (
    <Page>
      <Header pathname={pathname} />
      {children}
      <Footer />
    </Page>
  )
}

export default BaseBody
