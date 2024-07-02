import { ReactNode } from 'react';

function Main({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col justify-center item-center text-content-light dark:text-content-dark">
      {children}
    </main>
  );
}

export default Main;
