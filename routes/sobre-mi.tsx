import { FunctionalComponent } from 'preact';
import BaseHead from '../components/BaseHead.tsx';
import BaseBody from '../components/BaseBody.tsx';
import Container from '../components/Container.tsx';
import Title from '../components/Title.tsx';
import Text from '../components/Text.tsx';
import ListOfProjects from '../components/ListOfProjects.tsx';

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
};

const AboutMePage: FunctionalComponent = () => {
  return (
    <>
      <BaseHead>
        <title>Sobre Juanse</title>
      </BaseHead>
      <BaseBody>
        <Container>
          <div class='my-12 flex flex-col gap-12 font-default max-w-lg mx-auto'>
            <div className='font-oswald text-center'>
              <Title size='5xl'>SOBRE MI</Title>
            </div>
            <Text size='base'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Molestias nisi ipsum assumenda asperiores earum! Veritatis, cumque
              iure. Nam, maiores? Rerum cumque repellendus recusandae accusamus,
              sint mollitia rem blanditiis animi. Qui. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ad nostrum minus mollitia
              fugiat nisi molestiae iste! Quo consectetur, temporibus ipsum odit
              obcaecati explicabo dolores quaerat, non tenetur optio beatae
              architecto.
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              sapiente rem atque quasi. Asperiores minima eum fugiat voluptate
              quam quis, necessitatibus quibusdam. Sed quibusdam est sit fugiat
              reiciendis vero repudiandae.
            </Text>
            <video
              class='w-full rounded-md shadow-2xl'
              src='presentation.webm'
              loop
              autoPlay
              muted
              loading='lazy'
            >
            </video>
            <div className='font-oswald text-center'>
              <Title size='3xl'>MIS GUSTOS</Title>
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
            <Title size='3xl'>PROYECTOS ACTIVOS</Title>
            <div class='flex flex-wrap justify-center my-12 gap-3'>
              <ListOfProjects />
            </div>
          </div>
        </Container>
      </BaseBody>
    </>
  );
};

export default AboutMePage;
