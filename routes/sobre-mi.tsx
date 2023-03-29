import { Handlers, PageProps } from '$fresh/server.ts'
import { FunctionalComponent } from 'preact'
import Head from '../layouts/Head.tsx'
import Document from '../layouts/Document.tsx'
import Container from '../layouts/Container.tsx'
import Title from '../components/Title.tsx'
import Text from '../components/Text.tsx'
import ListOfProjects from '../components/ListOfProjects.tsx'
import BaseOG from '../components/BaseOG.tsx'
import { Project } from '../types/projects.d.ts'
import { loadFiles } from '../utils/markdown.ts'

const list = {
  'JavaScript': '#9BB848',
  'Typescript': '#48B8AA',
  'Next.JS': '#B84848',
  'Node.js': '#bffcfb',
  'Deno': '#f5f52e',
  'Crear contenido': '#e7378a',
  'Desarrollo Web': '#a44366',
  'Tomar mate': '#00beff',
  'Educación': '#ff9900',
}

export const handler: Handlers = {
  async GET(__, context) {
    const projects = await loadFiles<Project>('projects')
    return context.render({ projects })
  },
}

interface AboutMeProps {
  projects: Project[]
}

const AboutMePage: FunctionalComponent<PageProps<AboutMeProps>> = (
  { data: { projects } },
) => {
  return (
    <>
      <Head>
        <title>Sobre Juanse</title>
        <meta name='title' content='Sobre Juanse' />
        <meta
          name='description'
          content='¡Hola! Mi nombre es Juan Sebas y soy un apasionado del desarrollo web. Desde Argentina 🇦🇷 ❤️'
        />
        <link rel='canonical' href='https://juanse.dev/sobre-mi' />
        <BaseOG
          ogURL='https://juanse.dev/sobre-mi'
          title='Sobre Juanse'
        />
      </Head>
      <Document pathname='/sobre-mi'>
        <Container>
          <div class='my-12 flex flex-col gap-12 font-default max-w-xl mx-auto'>
            <div className='font-oswald text-center'>
              <Title size='5xl'>SOBRE MI</Title>
            </div>
            <Text size='lg'>
              ¡Hola! Mi nombre es{' '}
              <span class='font-bold text-yellow-300'>Juan Sebas</span>{' '}
              y soy un apasionado del desarrollo web. Mi blog y portafolio están
              diseñados para compartir mi conocimiento y experiencia en este
              mundo, así como para ayudar a otros a aprender y crecer en su
              carrera. Me encanta{' '}
              <span class='font-bold text-pink-600'>
                crear y compartir contenido educativo
              </span>. Siempre estoy buscando nuevas formas ayudar a otros a
              alcanzar sus metas en programación. Soy una persona con mucho
              potencial, siempre estoy buscando aprender y desarrollarme, busco
              dar lo mejor de mi en cada proyecto.
              <br />
              <br />
              Me encanta investigar y experimentar con nuevas tecnologías. En
              este blog vas a encontrar diversos artículos: la mayoría hechos
              después de que yo mismo haya dado mil vueltas para entender o
              programar algo 😅
              <br />
              <br />
              ¡Gracias por visitar! 💖
            </Text>
            <video
              class='w-full rounded-md shadow-2xl'
              src='presentation.webm'
              poster='presentation.webp'
              loop
              autoPlay
              muted
              loading='lazy'
              alt='Juan Sebas codeando'
            >
            </video>
            <div className='font-oswald text-center'>
              <Title size='3xl'>QUÉ ME GUSTA</Title>
            </div>
            <ul class='flex flex-wrap gap(3 sm:6) justify-center'>
              {Object.entries(list).map(([name, color]) => (
                <li
                  key={name}
                  class='px-3 py-1 bg-opacity-[0.1] bg-white rounded-md'
                >
                  <Text
                    size='lg'
                    className={`text-[${color}] font-bold`}
                  >
                    {name}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
          <div className='font-oswald text-center'>
            <Title size='3xl'>PROYECTOS</Title>
            <div class=''>
              <ListOfProjects projects={projects} />
            </div>
          </div>
        </Container>
      </Document>
    </>
  )
}

export default AboutMePage
