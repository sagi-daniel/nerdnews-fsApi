import { ReactNode } from 'react';

function Main({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen mb-auto text-content-light dark:text-content-dark">{children}</main>
  );
}

export default Main;
