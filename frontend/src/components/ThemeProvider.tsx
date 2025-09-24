'use client';

import { useEffect } from 'react';
import { useThemeStore, getThemeClasses } from '@/store/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { color } = useThemeStore();
  const theme = getThemeClasses(color);

  useEffect(() => {
    // Apply theme classes to document body
    document.body.className = `${theme.background} ${theme.text} theme-${color} transition-colors duration-200`;
  }, [theme.background, theme.text, color]);

  return <>{children}</>;
};

export default ThemeProvider;
