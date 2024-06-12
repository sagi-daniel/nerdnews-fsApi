import { createContext, useContext, useEffect } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(true, 'isDarkMode');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

function useDarkMode(): DarkModeContextType {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}

export { DarkModeProvider, useDarkMode };
