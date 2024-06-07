import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className=" flex flex-col justify-between h-screen bg-bg-light dark:bg-bg-dark px-1 md:px-5 ">{children}</div>
  );
}

export default Layout;
