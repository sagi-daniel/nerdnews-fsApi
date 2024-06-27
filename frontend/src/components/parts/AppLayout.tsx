import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import Header from './header/Header';
import Main from './Main';
import Footer from './Footer';

function AppLayout() {
  return (
    <Layout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Layout>
  );
}

export default AppLayout;
