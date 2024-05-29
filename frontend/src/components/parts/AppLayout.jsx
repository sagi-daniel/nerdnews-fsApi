import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  return (
    <div className=" flex flex-col justify-between h-screen bg-bg-light dark:bg-bg-dark px-5 ">
      <Header />
      <main className="mt-16 mb-auto py-5 text-content-light dark:text-content-dark">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
