import { FunctionalComponent } from 'https://esm.sh/v102/preact@10.11.0/src/index';
import BaseBody from '../components/BaseBody.tsx';
import BaseHead from '../components/BaseHead.tsx';
import BaseOG from '../components/BaseOG.tsx';
import Container from '../components/Container.tsx';

const NotFoundPage: FunctionalComponent = () => {
  return (
    <>
      <BaseHead>
        <title>Juanse | Recurso no encontrado</title>
        <BaseOG title='Juanse | Recurso no encontrado' />
      </BaseHead>
      <BaseBody>
        <Container>
          <div class='h-full grid place-content-center text-center'>
            <p class='text-9xl font-bold'>404</p>
            <p class='text-2xl'>Recurso no encontrado</p>
          </div>
        </Container>
      </BaseBody>
    </>
  );
};

export default NotFoundPage;
