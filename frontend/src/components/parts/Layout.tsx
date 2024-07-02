import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className=" flex flex-col min-h-screen justify-between bg-bg-light dark:bg-bg-dark px-1 md:px-5 ">
      {children}
    </div>
  );
}

export default Layout;
