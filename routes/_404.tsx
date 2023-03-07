import { FunctionalComponent } from 'preact'
import Head from '../layouts/Head.tsx'
import Document from '../layouts/Document.tsx'
import BaseOG from '../components/BaseOG.tsx'
import Container from '../layouts/Container.tsx'

const NotFoundPage: FunctionalComponent = () => {
  return (
    <>
      <Head>
        <title>Juanse | Recurso no encontrado</title>
        <BaseOG title='Juanse | Recurso no encontrado' />
      </Head>
      <Document>
        <Container>
          <div class='h-full grid place-content-center text-center'>
            <p class='text-9xl font-bold'>404</p>
            <p class='text-2xl'>Recurso no encontrado</p>
          </div>
        </Container>
      </Document>
    </>
  )
}

export default NotFoundPage
