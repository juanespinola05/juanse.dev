import { FunctionalComponent } from 'preact';

const BaseOG: FunctionalComponent = () => {
  return (
    <>
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://juanse.dev/' />
      <meta
        property='og:title'
        content='Juanse | Programación y Desarrollo Web'
      />
      <meta
        property='og:description'
        content='Juan Sebas. Desarrollador web. Contenido, artículos y videos sobre desarrollo web en español, desde Argentina 🇦🇷 ❤️'
      />
      <meta property='og:image' content='/base-og.png' />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://juanse.dev/' />
      <meta
        property='twitter:title'
        content='Juanse | Programación y Desarrollo Web'
      />
      <meta
        property='twitter:description'
        content='Juan Sebas. Desarrollador web. Contenido, artículos y videos sobre desarrollo web en español, desde Argentina 🇦🇷 ❤️'
      />
      <meta property='twitter:image' content='/base-og.png' />
    </>
  );
};

export default BaseOG;
