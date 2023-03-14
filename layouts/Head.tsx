import { FunctionalComponent } from 'preact'
import { Head as RuntimeHead } from '$fresh/runtime.ts'

const Head: FunctionalComponent = ({ children }) => {
  return (
    <RuntimeHead>
      {children}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
      <link
        href='https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Source+Sans+Pro:wght@400;700&display=swap'
        rel='stylesheet'
      />
      <meta name='author' content='Juan Sebastian Espinola' />
      <meta name='theme-color' content='#010137' />
    </RuntimeHead>
  )
}

export default Head
