import { Handlers, PageProps } from '$fresh/server.ts'
import Head from '../../layouts/Head.tsx'
import Document from '../../layouts/Document.tsx'
import Container from '../../layouts/Container.tsx'
import { Project } from '../../types/projects.d.ts'
import { loadFile } from '../../utils/markdown.ts'
import BaseOG from '../../components/BaseOG.tsx'
import Image from '../../components/Image.tsx'
import 'prismjs/components/prism-bash?no-check'
import 'prismjs/components/prism-yaml?no-check'

export const handler: Handlers = {
  async GET(request, context): Promise<Response> {
    const { id } = context.params
    const project = await loadFile<Project>(id, 'projects')

    if (!project) return context.renderNotFound()
    return context.render({ project })
  },
}

export default function PageProject(props: PageProps<{ project: Project }>) {
  const { project } = props.data
  return (
    <>
      <Head>
        <title>{project.name}</title>
        <link
          rel='stylesheet'
          type='text/css'
          href='/md.css'
        />
        <meta name='title' content={project.name} />
        <meta
          name='description'
          content={project.description}
        />
        <link
          rel='canonical'
          href={`https://juanse.dev/projects/${project.id}`}
        />

        <BaseOG
          ogURL={`https://juanse.dev/blog/${project.id}`}
          title={project.name}
          description={project.excerpt}
          image={project.image}
          type={'article'}
        />
      </Head>
      <Document pathname='/sobre-mi'>
        <Container>
          <article class='max-w-3xl mx-auto override:list-none relative'>
            <div class='my-6 h-52 w-full rounded-md overflow-hidden'>
              <Image
                src={project.image}
                class='h-full w-full object-cover object-center'
              />
            </div>
            <div
              data-color-mode='dark'
              data-dark-theme='dark'
              dangerouslySetInnerHTML={{ __html: project.body }}
              class='markdown-body'
            >
            </div>
          </article>
        </Container>
      </Document>
    </>
  )
}
