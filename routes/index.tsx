import { Head } from '$fresh/runtime.ts';
import PageGrid from '../components/PageGrid.tsx';

export default function Home() {
  return (
    <>
      <Head>
        <title>juanse</title>
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
      </Head>
      <PageGrid>
        <p>que onda xd</p>
      </PageGrid>
    </>
  );
}
