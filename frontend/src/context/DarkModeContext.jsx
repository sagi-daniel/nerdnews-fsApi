import { createContext, useContext, useEffect } from 'react';
import { useLocaleStorageState } from '../hooks/useLocaleStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocaleStorageState(true, 'isDarkMode');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined) throw new Error('DarkModeContext was used outsiede of DarkModeProvider');

  return context;
}

export { DarkModeProvider, useDarkMode };
