import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { useThemeStore } from '../store/themeStorage';
import React from 'react';

export default function ThemeToggle() {
  const { theme, isDark, toggleTheme } = useThemeStore();
  const applyTheme = (isDark) => {
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  };

  React.useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <SunIcon className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}