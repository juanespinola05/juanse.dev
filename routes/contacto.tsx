import { FunctionalComponent } from 'preact'
import Head from '../layouts/Head.tsx'
import Document from '../layouts/Document.tsx'
import BaseOG from '../components/BaseOG.tsx'
import Container from '../layouts/Container.tsx'
import Title from '../components/Title.tsx'
import IconMail from 'tabler-icon/mail.tsx'
import IconLinkedIn from 'tabler-icon/brand-linkedin.tsx'
import IconGitHub from 'tabler-icon/brand-github.tsx'
import Text from '../components/Text.tsx'

const ContactPage: FunctionalComponent = () => {
  return (
    <>
      <Head>
        <title>Juanse | Contacto</title>
        <meta name='title' content='Juanse | Contacto' />
        <meta
          name='description'
          content='Juan Sebas. Desarrollador web. Contenido, artículos y videos sobre desarrollo web en español, desde Argentina 🇦🇷 ❤️'
        />
        <link rel='canonical' href='https://juanse.dev/contacto' />
        <BaseOG title='Juanse | Contacto' ogURL='https://juanse.dev/contacto' />
      </Head>
      <Document>
        <Container>
          <div className='mt-12 flex flex-col gap-12 text-center'>
            <Title size='5xl'>CONTACTO</Title>
            <div class='flex justify-center'>
              <ul class='max-w-md mx-auto'>
                <li class='max-w-md hover:text-yellow-300'>
                  <a
                    href='mailto:sebar5er@gmail.com'
                    class='flex items-center gap-2'
                  >
                    <IconMail />
                    <Text size='lg'>sebar5er@gmail.com</Text>
                  </a>
                </li>
                <li class='max-w-md hover:text-yellow-300'>
                  <a
                    href='https://linkedin.com/in/juanse05/'
                    class='flex items-center gap-2'
                  >
                    <IconLinkedIn />
                    <Text size='lg'>Perfil en LinkedIn</Text>
                  </a>
                </li>
                <li class='max-w-md hover:text-yellow-300'>
                  <a
                    href='https://github.com/juanespinola05'
                    class='flex items-center gap-2'
                  >
                    <IconGitHub />
                    <Text size='lg'>Perfil en GitHub</Text>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Document>
    </>
  )
}

export default ContactPage
