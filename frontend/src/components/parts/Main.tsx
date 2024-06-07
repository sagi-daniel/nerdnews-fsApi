import React, { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="flex flex-col mb-auto text-content-light dark:text-content-dark">{children}</main>;
}

export default Main;
