import { FunctionalComponent } from 'preact';
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import Page from './Page.tsx';

const BaseBody: FunctionalComponent = ({ children }) => {
  return (
    <Page>
      <Header />
      {children}
      <Footer />
    </Page>
  );
};

export default BaseBody;
