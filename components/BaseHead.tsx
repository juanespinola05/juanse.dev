import { FunctionalComponent } from 'preact';
import { Head } from '$fresh/runtime.ts';

const BaseHead: FunctionalComponent = ({ children }) => {
  return (
    <Head>
      {children}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='true'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&display=swap'
        rel='stylesheet'
      />
      <meta name='author' content='Juan Sebastian Espinola' />
    </Head>
  );
};

export default BaseHead;
