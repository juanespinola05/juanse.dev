import { FunctionalComponent } from 'preact';
import IconGitHub from 'tabler-icon/brand-github.tsx';
import IconExternalLink from 'tabler-icon/external-link.tsx';

interface ProjectWrapperProps {
  image: string;
  name: string;
}

const ProjectWrapper: FunctionalComponent<ProjectWrapperProps> = (
  { children, image, name },
) => {
  return (
    <article class='max-w-md rounded-xl shadow-2xl overflow-hidden'>
      <img src={image} alt={name} loading='lazy' />
      <div class='h-8 px-2 py-1 bg-gray-800'>
        <ul class='flex gap-2 font-default items-center justify-center'>
          {children}
        </ul>
      </div>
    </article>
  );
};

const ListOfProjects: FunctionalComponent = () => {
  return (
    <>
      <ProjectWrapper image='t-finance.webp' name='T-Finance'>
        <li>
          <a
            href='https://github.com/juanespinola05/t-finance-front'
            target='_blank'
            title='Ver en GitHub'
          >
            <IconGitHub />
          </a>
        </li>
        <li>
          <a
            href='https://t-finance.juanse.dev'
            target='_blank'
            title='Ver Proyecto'
          >
            <IconExternalLink />
          </a>
        </li>
        <li>
          <img
            src='https://api.netlify.com/api/v1/badges/f67ac04f-fd7d-4b18-a01d-242c5658a9ab/deploy-status'
            alt='T-Finance Netlify deploy status'
          />
        </li>
      </ProjectWrapper>
      <ProjectWrapper image='t-finance-api.webp' name='T-Finance'>
        <li>
          <a
            href='https://github.com/juanespinola05/t-finance-api'
            target='_blank'
            title='Ver en GitHub'
          >
            <IconGitHub />
          </a>
        </li>
        <li>
          <a
            href='https://finance-api.juanse.dev'
            target='_blank'
            title='Ver API'
          >
            <IconExternalLink />
          </a>
        </li>
        <li>
          <img
            src='https://api.netlify.com/api/v1/badges/f67ac04f-fd7d-4b18-a01d-242c5658a9ab/deploy-status'
            alt='T-Finance Netlify deploy status'
          />
        </li>
      </ProjectWrapper>
    </>
  );
};

export default ListOfProjects;
