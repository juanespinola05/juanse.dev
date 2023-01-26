import { FunctionalComponent } from 'preact';

interface BaseOGProps {
  ogURL?: string;
  title?: string;
  description?: string;
  image?: string;
  type?: 'article' | 'website';
}

const BaseOG: FunctionalComponent<BaseOGProps> = (
  {
    ogURL = 'https://juanse.dev',
    title = 'Juanse | Programación y Desarrollo Web',
    description =
      'Juan Sebas. Desarrollador web. Contenido, artículos y videos sobre desarrollo web en español, desde Argentina 🇦🇷 ❤️',
    image = '/base-og.png',
    type = 'website',
  },
) => {
  return (
    <>
      <meta property='og:type' content={type} />
      <meta property='og:url' content={ogURL} />
      <meta
        property='og:title'
        content={title}
      />
      <meta property='og:site_name' content={title} />
      <meta
        property='og:description'
        content={description}
      />
      <meta property='og:image' itemProp='image' content={image} />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={ogURL} />
      <meta
        property='twitter:title'
        content={title}
      />
      <meta
        property='twitter:description'
        content={description}
      />
      <meta property='twitter:image' content={image} />
    </>
  );
};

export default BaseOG;
