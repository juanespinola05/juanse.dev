import { tw } from 'twind'
import { css } from 'twind/css'
import { FunctionalComponent, JSX } from 'preact'
import { Project } from '../types/projects.d.ts'
import Image from './Image.tsx'

interface IProps extends Project {}

const ProjectCard: FunctionalComponent<IProps> = ({
  image,
  name,
  excerpt,
  id,
}) => {
  const decorationTransparent = tw(
    css({ '&:hover h3': { 'text-decoration': 'underline' } }),
  )
  return (
    <a
      href={`/sobre-mi/${id}`}
      class={`font-default bg-blue-900 bg-opacity-30 rounded-md shadow-lg relative overflow-hidden grid transition-transform hover:scale-105 hover:cursor-pointer ${decorationTransparent}`}
    >
      <Image
        class='absolute top-0 left-0 w-full h-full object-cover object-center'
        src={image}
        alt={name}
      />
      <div class='bg-black bg-opacity-70 z-10 text-left p-4'>
        <h3 class='lg:text-base text-gray-300'>{name}</h3>
        <p class='text-3xl lg:text-2xl font-bold'>{excerpt}</p>
        <p className='absolute bottom-6 right-6 underline lg:hidden text-lg'>
          Ver más
        </p>
      </div>
    </a>
  )
}

interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {}

const Link: FunctionalComponent<LinkProps> = ({
  href = '',
  target = '_blank',
  children,
}) => {
  return (
    <a
      href={href}
      target={target}
      rel='noopener noreferrer'
      class='bg-blue-800 bg-opacity-50 py-1 px-2 rounded-md grid'
    >
      {children}
    </a>
  )
}

export default ProjectCard
